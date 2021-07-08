"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const Date_1 = require("@polkadot/types/codec/Date");
const UInt_1 = require("@polkadot/types/codec/UInt");
const BN = require("bn.js");
const constants_1 = require("../test-helpers/constants");
const registries_1 = require("../test-helpers/registries");
const mockData_1 = require("./mockData");
const sanitizeNumbers_1 = require("./sanitizeNumbers");
describe('sanitizeNumbers', () => {
    it('does not affect non-numbers', () => {
        expect(sanitizeNumbers_1.sanitizeNumbers('Hello world')).toBe('Hello world');
    });
    it('does not convert plain hexadecimal', () => {
        expect(sanitizeNumbers_1.sanitizeNumbers('40C0A7')).toBe('40C0A7');
        expect(sanitizeNumbers_1.sanitizeNumbers('0x40C0A7')).toBe('0x40C0A7');
    });
    describe('javscript native', () => {
        describe('javascript types it cannot handle properly', () => {
            it('does not handle WeakMap', () => {
                const compact = new (types_1.Compact.with(types_1.u128))(registries_1.kusamaRegistry, constants_1.MAX_U128);
                const map = new WeakMap()
                    .set({ x: 'x' }, compact)
                    .set({ y: 'y' }, registries_1.kusamaRegistry.createType('u128', constants_1.MAX_U128));
                expect(sanitizeNumbers_1.sanitizeNumbers(map)).toStrictEqual({});
            });
            it('does not handle WeakSet', () => {
                const negInt = new types_1.Int(registries_1.kusamaRegistry, constants_1.MIN_I32, 32);
                const maxInt = new types_1.Int(registries_1.kusamaRegistry, constants_1.MAX_I64, 64);
                const set = new WeakSet([maxInt, negInt]);
                expect(sanitizeNumbers_1.sanitizeNumbers(set)).toStrictEqual({});
            });
            it('does not handle Number', () => {
                expect(sanitizeNumbers_1.sanitizeNumbers(new Number(constants_1.MAX_U128))).toStrictEqual({});
            });
            it('handles BigInt but outputs to console.errors because not convert to AnyJson', () => {
                var _a;
                const temp = console.error;
                console.error = jest.fn();
                expect((_a = sanitizeNumbers_1.sanitizeNumbers(BigInt(constants_1.MAX_U128))) === null || _a === void 0 ? void 0 : _a.toString()).toBe('340282366920938463463374607431768211455');
                expect(console.error).toHaveBeenCalled();
                console.error = temp;
            });
            it('handles Symbol but outputs to console.error because does not convert to AnyJson', () => {
                var _a;
                const temp = console.error;
                console.error = jest.fn();
                const s = Symbol('sym');
                expect((_a = sanitizeNumbers_1.sanitizeNumbers(s)) === null || _a === void 0 ? void 0 : _a.toString()).toEqual('Symbol(sym)');
                expect(console.error).toHaveBeenCalled();
                console.error = temp;
            });
            it('does not handle String', () => {
                expect(sanitizeNumbers_1.sanitizeNumbers(new String('abc'))).toStrictEqual({
                    0: 'a',
                    1: 'b',
                    2: 'c',
                });
            });
        });
        it('handles Date', () => {
            const date = new Date();
            expect(sanitizeNumbers_1.sanitizeNumbers(date)).toBe(date.toJSON());
        });
        it('converts Array', () => {
            expect(sanitizeNumbers_1.sanitizeNumbers([
                registries_1.kusamaRegistry.createType('u128', constants_1.MAX_U128),
                registries_1.kusamaRegistry.createType('u64', constants_1.MAX_U64),
            ])).toStrictEqual([constants_1.MAX_U128, constants_1.MAX_U64]);
            expect(sanitizeNumbers_1.sanitizeNumbers(new Array(2))).toStrictEqual(new Array(2));
        });
        it('converts nested POJO', () => {
            const pojo = {
                three: registries_1.kusamaRegistry.createType('u32', constants_1.MAX_U32),
                x: {
                    six: registries_1.kusamaRegistry.createType('u64', constants_1.MAX_U64),
                    x: {
                        one: registries_1.kusamaRegistry.createType('u128', constants_1.MAX_U128),
                        b: registries_1.kusamaRegistry.createType('Balance', constants_1.MAX_U128),
                    },
                },
            };
            expect(sanitizeNumbers_1.sanitizeNumbers(pojo)).toStrictEqual({
                three: constants_1.MAX_U32,
                x: {
                    six: constants_1.MAX_U64,
                    x: {
                        one: constants_1.MAX_U128,
                        b: constants_1.MAX_U128,
                    },
                },
            });
        });
        it('handles undefined', () => {
            const arr = [undefined, undefined, undefined];
            expect(sanitizeNumbers_1.sanitizeNumbers(arr)).toStrictEqual(arr);
            const obj = {
                x: undefined,
                y: undefined,
                a: arr,
            };
            expect(sanitizeNumbers_1.sanitizeNumbers(obj)).toStrictEqual(obj);
        });
        it('converts javascript Set', () => {
            const negInt = registries_1.kusamaRegistry.createType('i32', constants_1.MIN_I32);
            const maxInt = registries_1.kusamaRegistry.createType('i64', constants_1.MAX_I64);
            const struct = new types_1.Struct(registries_1.kusamaRegistry, {
                foo: types_1.Text,
                bar: 'u32',
            }, { foo: 'hi :)', bar: constants_1.MAX_U32 });
            const set = new Set([struct, maxInt, negInt]);
            expect(sanitizeNumbers_1.sanitizeNumbers(set)).toStrictEqual([
                {
                    foo: 'hi :)',
                    bar: constants_1.MAX_U32,
                },
                constants_1.MAX_I64,
                constants_1.MIN_I32,
            ]);
        });
        it('converts nested javascript Map', () => {
            const struct = new types_1.Struct(registries_1.kusamaRegistry, {
                foo: 'Text',
                bar: 'u32',
            }, { foo: 'hi :)', bar: constants_1.MAX_U32 });
            const compact = new (types_1.Compact.with(types_1.u128))(registries_1.kusamaRegistry, constants_1.MAX_U128);
            const nest = new Map().set('s', struct).set('b', new BN(constants_1.MAX_U128));
            const outer = new Map().set('c', compact).set('n', nest);
            expect(sanitizeNumbers_1.sanitizeNumbers(outer)).toStrictEqual({
                c: constants_1.MAX_U128,
                n: {
                    s: {
                        foo: 'hi :)',
                        bar: constants_1.MAX_U32,
                    },
                    b: constants_1.MAX_U128,
                },
            });
        });
    });
    describe('primitives and Codec base types', () => {
        // https://github.com/polkadot-js/api/tree/master/packages/types
        it('converts AnyStruct', () => {
            const struct = new types_1.Struct(registries_1.kusamaRegistry, {
                foo: 'Text',
                bar: 'u32',
            }, { foo: 'hi :)', bar: constants_1.MAX_U32 });
            expect(sanitizeNumbers_1.sanitizeNumbers(struct)).toStrictEqual({
                foo: 'hi :)',
                bar: constants_1.MAX_U32,
            });
            const json = new types_1.Json(registries_1.kusamaRegistry, {
                b: registries_1.kusamaRegistry.createType('Bool', true),
                i: registries_1.kusamaRegistry.createType('i128', constants_1.MAX_I128),
                o: registries_1.kusamaRegistry.createType('Option<i128>', constants_1.MAX_I128),
                s: struct,
            });
            expect(sanitizeNumbers_1.sanitizeNumbers(json)).toStrictEqual({
                b: true,
                i: constants_1.MAX_I128,
                o: constants_1.MAX_I128,
                s: {
                    foo: 'hi :)',
                    bar: constants_1.MAX_U32,
                },
            });
        });
        it('handles H512', () => {
            const h = registries_1.kusamaRegistry.createType('H512', constants_1.MAX_U64);
            expect(sanitizeNumbers_1.sanitizeNumbers(h)).toBe('0x31383434363734343037333730393535313631350000000000000000000000000000000000000000000000000000000000000000000000000000000000000000');
        });
        it('handles H256', () => {
            const h = registries_1.kusamaRegistry.createType('H256', constants_1.MAX_U32);
            expect(sanitizeNumbers_1.sanitizeNumbers(h)).toBe('0x3432393439363732393500000000000000000000000000000000000000000000');
        });
        it('handles H160', () => {
            const h = registries_1.kusamaRegistry.createType('H160', constants_1.MAX_U16);
            expect(sanitizeNumbers_1.sanitizeNumbers(h)).toBe('0x3635353335000000000000000000000000000000');
        });
        it('handles CodecDate', () => {
            const d = new Date_1.CodecDate(registries_1.kusamaRegistry, new Date(1594441868));
            expect(sanitizeNumbers_1.sanitizeNumbers(d)).toBe(1594442);
        });
        it('handles Codec Bool', () => {
            const t = registries_1.kusamaRegistry.createType('Bool', true);
            expect(sanitizeNumbers_1.sanitizeNumbers(t)).toBe(true);
            const f = registries_1.kusamaRegistry.createType('Bool', false);
            expect(sanitizeNumbers_1.sanitizeNumbers(f)).toBe(false);
        });
        it('handles Codec Bytes', () => {
            const code = new types_1.Bytes(registries_1.kusamaRegistry, ':code');
            expect(sanitizeNumbers_1.sanitizeNumbers(code)).toBe('0x3a636f6465');
        });
        it('handles Codec Data', () => {
            const data = new types_1.Data(registries_1.kusamaRegistry, {
                Keccak256: '0x0102030405060708091011121314151617181920212223242526272829303132',
            });
            expect(sanitizeNumbers_1.sanitizeNumbers(data)).toStrictEqual({
                keccak256: '0x0102030405060708091011121314151617181920212223242526272829303132',
            });
        });
        it('handles Codec Null', () => {
            expect(sanitizeNumbers_1.sanitizeNumbers(new types_1.Null(registries_1.kusamaRegistry))).toBe(null);
        });
        it('handles StorageKey', () => {
            const key = new types_1.StorageKey(registries_1.kusamaRegistry, '0x426e15054d267946093858132eb537f191ca57b0c4b20b29ae7e99d6201d680cc906f7710aa165d62c709012f807af8fc3f0d2abb0c51ca9a88d4ef24d1a092bf89dacf5ce63ea1d');
            expect(sanitizeNumbers_1.sanitizeNumbers(key)).toStrictEqual('0x426e15054d267946093858132eb537f191ca57b0c4b20b29ae7e99d6201d680cc906f7710aa165d62c709012f807af8fc3f0d2abb0c51ca9a88d4ef24d1a092bf89dacf5ce63ea1d');
        });
        it('handles Text', () => {
            const notEnglish = registries_1.kusamaRegistry.createType('Text', '中文');
            expect(sanitizeNumbers_1.sanitizeNumbers(notEnglish)).toBe('中文');
        });
        describe('number primitives', () => {
            it('converts u8', () => {
                const z = registries_1.kusamaRegistry.createType('u8', 0);
                expect(sanitizeNumbers_1.sanitizeNumbers(z)).toBe('0');
                const m = new types_1.u8(registries_1.kusamaRegistry, constants_1.MAX_U8);
                expect(sanitizeNumbers_1.sanitizeNumbers(m)).toBe(constants_1.MAX_U8);
            });
            it('converts i8', () => {
                const z = registries_1.kusamaRegistry.createType('i8', 0);
                expect(sanitizeNumbers_1.sanitizeNumbers(z)).toBe('0');
                const min = registries_1.kusamaRegistry.createType('i8', constants_1.MIN_I8);
                expect(sanitizeNumbers_1.sanitizeNumbers(min)).toBe(constants_1.MIN_I8);
                const max = registries_1.kusamaRegistry.createType('i8', constants_1.MAX_I8);
                expect(sanitizeNumbers_1.sanitizeNumbers(max)).toBe(constants_1.MAX_I8);
            });
            it('converts u16', () => {
                const z = registries_1.kusamaRegistry.createType('u16', 0);
                expect(sanitizeNumbers_1.sanitizeNumbers(z)).toBe('0');
                const max = registries_1.kusamaRegistry.createType('u16', constants_1.MAX_U16);
                expect(sanitizeNumbers_1.sanitizeNumbers(max)).toBe(constants_1.MAX_U16);
            });
            it('converts i16', () => {
                const z = registries_1.kusamaRegistry.createType('i16', 0);
                expect(sanitizeNumbers_1.sanitizeNumbers(z)).toBe('0');
                const min = registries_1.kusamaRegistry.createType('i16', constants_1.MIN_I16);
                expect(sanitizeNumbers_1.sanitizeNumbers(min)).toBe(constants_1.MIN_I16);
                const max = registries_1.kusamaRegistry.createType('i16', constants_1.MAX_I16);
                expect(sanitizeNumbers_1.sanitizeNumbers(max)).toBe(constants_1.MAX_I16);
            });
            it('converts Int', () => {
                const intTen = new types_1.Int(registries_1.kusamaRegistry, 10);
                expect(sanitizeNumbers_1.sanitizeNumbers(intTen)).toBe('10');
                const intPaddedHex = new types_1.Int(registries_1.kusamaRegistry, '0x000000000000000004fe9f24a6a9c00');
                expect(sanitizeNumbers_1.sanitizeNumbers(intPaddedHex)).toBe('22493750000000000');
                const maxInt = new types_1.Int(registries_1.kusamaRegistry, constants_1.MAX_I64, 64);
                expect(sanitizeNumbers_1.sanitizeNumbers(maxInt)).toBe(constants_1.MAX_I64);
                const negInt = new types_1.Int(registries_1.kusamaRegistry, constants_1.MIN_I32, 32);
                expect(sanitizeNumbers_1.sanitizeNumbers(negInt)).toBe(constants_1.MIN_I32);
            });
            it('converts UInt', () => {
                const uIntTen = new UInt_1.UInt(registries_1.kusamaRegistry, 10);
                expect(sanitizeNumbers_1.sanitizeNumbers(uIntTen)).toBe('10');
                const uIntPaddedHex = new UInt_1.UInt(registries_1.kusamaRegistry, '0x000000000000000004fe9f24a6a9c00');
                expect(sanitizeNumbers_1.sanitizeNumbers(uIntPaddedHex)).toBe('22493750000000000');
            });
            it('converts U32', () => {
                const u32Zero = registries_1.kusamaRegistry.createType('u32', '0x0');
                expect(sanitizeNumbers_1.sanitizeNumbers(u32Zero)).toBe('0');
                const u32Max = registries_1.kusamaRegistry.createType('u32', constants_1.MAX_U32);
                expect(sanitizeNumbers_1.sanitizeNumbers(u32Max)).toBe(constants_1.MAX_U32);
            });
            it('converts I32', () => {
                expect(sanitizeNumbers_1.sanitizeNumbers(registries_1.kusamaRegistry.createType('i32', constants_1.MIN_I32))).toBe(constants_1.MIN_I32);
                expect(sanitizeNumbers_1.sanitizeNumbers(registries_1.kusamaRegistry.createType('i32', constants_1.MAX_I32))).toBe(constants_1.MAX_I32);
            });
            it('converts U64', () => {
                const u64Zero = registries_1.kusamaRegistry.createType('u64', '0x0');
                expect(sanitizeNumbers_1.sanitizeNumbers(u64Zero)).toBe('0');
                const u64Max = registries_1.kusamaRegistry.createType('u64', constants_1.MAX_U64);
                expect(sanitizeNumbers_1.sanitizeNumbers(u64Max)).toBe(constants_1.MAX_U64);
            });
            it('converts I64', () => {
                expect(sanitizeNumbers_1.sanitizeNumbers(registries_1.kusamaRegistry.createType('i64', constants_1.MIN_I64))).toBe(constants_1.MIN_I64);
                expect(sanitizeNumbers_1.sanitizeNumbers(registries_1.kusamaRegistry.createType('i64', constants_1.MAX_I64))).toBe(constants_1.MAX_I64);
            });
            it('converts U128', () => {
                const u128Zero = registries_1.kusamaRegistry.createType('u128', '0x0');
                expect(sanitizeNumbers_1.sanitizeNumbers(u128Zero)).toBe('0');
                const u128Max = registries_1.kusamaRegistry.createType('u128', constants_1.MAX_U128);
                expect(sanitizeNumbers_1.sanitizeNumbers(u128Max)).toBe(constants_1.MAX_U128);
            });
            it('converts II28', () => {
                expect(sanitizeNumbers_1.sanitizeNumbers(registries_1.kusamaRegistry.createType('I128', constants_1.MAX_I128))).toBe(constants_1.MAX_I128);
                expect(sanitizeNumbers_1.sanitizeNumbers(registries_1.kusamaRegistry.createType('I128', constants_1.MIN_I128))).toBe(constants_1.MIN_I128);
            });
        });
        describe('BTreeMap', () => {
            const mockU32TextMap = new Map()
                .set(registries_1.kusamaRegistry.createType('Text', 'u32Max'), registries_1.kusamaRegistry.createType('u32', '0xffffffff'))
                .set(registries_1.kusamaRegistry.createType('Text', 'zero'), registries_1.kusamaRegistry.createType('u32', 0));
            const bTreeMapConstructor = types_1.BTreeMap.with('Text', 'u32');
            it('converts BTreeMap and nested BTreeMap', () => {
                const sanitizedBTreeMap = {
                    u32Max: constants_1.MAX_U32,
                    zero: '0',
                };
                expect(sanitizeNumbers_1.sanitizeNumbers(new bTreeMapConstructor(registries_1.kusamaRegistry, mockU32TextMap))).toStrictEqual(sanitizedBTreeMap);
            });
            it('converts a nested BTreeMap', () => {
                const structWithBTreeMap = new types_1.Struct(registries_1.kusamaRegistry, {
                    foo: types_1.u32,
                    value: 'BTreeMap<Text, u32>',
                })
                    .set('foo', registries_1.kusamaRegistry.createType('u32', 50))
                    .set('value', new bTreeMapConstructor(registries_1.kusamaRegistry, mockU32TextMap));
                expect(sanitizeNumbers_1.sanitizeNumbers(structWithBTreeMap)).toStrictEqual({
                    foo: '50',
                    value: {
                        u32Max: constants_1.MAX_U32,
                        zero: '0',
                    },
                });
            });
        });
        describe('BTreeSet', () => {
            const U64Set = new Set()
                .add(registries_1.kusamaRegistry.createType('u64', '0x0'))
                .add(registries_1.kusamaRegistry.createType('u64', '24'))
                .add(registries_1.kusamaRegistry.createType('u64', '30'))
                .add(registries_1.kusamaRegistry.createType('u64', constants_1.MAX_U64));
            const sanitizedBTreeSet = ['0', '24', '30', constants_1.MAX_U64];
            it('converts BTreeSet', () => {
                const bTreeSet = new types_1.BTreeSet(registries_1.kusamaRegistry, 'u64', U64Set);
                expect(sanitizeNumbers_1.sanitizeNumbers(bTreeSet)).toStrictEqual(sanitizedBTreeSet);
            });
            it('converts nested BTreeSet', () => {
                const structWithBTreeSet = new types_1.Struct(registries_1.kusamaRegistry, {
                    foo: 'u64',
                    value: types_1.BTreeSet.with('u64'),
                })
                    .set('foo', registries_1.kusamaRegistry.createType('u64', 50))
                    .set('value', new types_1.BTreeSet(registries_1.kusamaRegistry, 'u64', U64Set));
                expect(sanitizeNumbers_1.sanitizeNumbers(structWithBTreeSet)).toStrictEqual({
                    foo: '50',
                    value: sanitizedBTreeSet,
                });
            });
        });
        it('converts an assortment of Compact values', () => {
            const wednesday = registries_1.kusamaRegistry.createType('Moment', 1537968546);
            expect(sanitizeNumbers_1.sanitizeNumbers(new (types_1.Compact.with('Moment'))(registries_1.kusamaRegistry, wednesday))).toBe('1537968546');
            expect(sanitizeNumbers_1.sanitizeNumbers(new (types_1.Compact.with(types_1.u32))(registries_1.kusamaRegistry, constants_1.MAX_U32))).toBe(constants_1.MAX_U32);
            expect(sanitizeNumbers_1.sanitizeNumbers(new (types_1.Compact.with('u128'))(registries_1.kusamaRegistry, constants_1.MAX_U128))).toBe(constants_1.MAX_U128);
        });
        it('converts nested Enum', () => {
            const Nest = types_1.Enum.with({
                C: 'u64',
                D: 'u64',
            });
            const Test = types_1.Enum.with({
                A: 'u64',
                B: Nest,
            });
            const test = new Test(registries_1.kusamaRegistry, new Nest(registries_1.kusamaRegistry, '0xFFFFFFFFFFFFFFFF', 1), 1);
            expect(sanitizeNumbers_1.sanitizeNumbers(test)).toStrictEqual({
                b: {
                    d: constants_1.MAX_U64,
                },
            });
        });
        it('handles Linkage', () => {
            const linkage = registries_1.kusamaRegistry.createType('(ValidatorPrefs, Linkage<AccountId>)', '0x0284d7170001da30b68f54f686f586ddb29de12b682dd8bd1404566fb8a8db5dec20aa5b6b36');
            expect(sanitizeNumbers_1.sanitizeNumbers(linkage)).toStrictEqual([
                { commission: '100000000' },
                {
                    previous: null,
                    next: '5GznmRvdi5htUJKnMSWJgJUzSJJXSvWuHRSEdyUbHJZDNcwU',
                },
            ]);
        });
        describe('Option', () => {
            it('converts None to null', () => {
                const none = registries_1.kusamaRegistry.createType('Option<Text>', null);
                expect(sanitizeNumbers_1.sanitizeNumbers(none)).toBe(null);
            });
            it('handles wrapped Some(Text)', () => {
                const hi = registries_1.kusamaRegistry.createType('Text', 'hi');
                expect(sanitizeNumbers_1.sanitizeNumbers(hi)).toBe('hi');
            });
            it('converts Some(U128)', () => {
                const u128MaxOption = registries_1.kusamaRegistry.createType('Option<u128>', constants_1.MAX_U128);
                expect(sanitizeNumbers_1.sanitizeNumbers(u128MaxOption)).toBe(constants_1.MAX_U128);
            });
        });
        it('handles Raw', () => {
            const u8a = new types_1.Raw(registries_1.kusamaRegistry, [1, 2, 3, 4, 5]);
            expect(sanitizeNumbers_1.sanitizeNumbers(u8a)).toBe('0x0102030405');
        });
        it('converts nested HashMap', () => {
            const outer = types_1.HashMap.with('Text', types_1.HashMap);
            const inner = types_1.HashMap.with('Text', 'U128');
            const map = new outer(registries_1.kusamaRegistry, {
                nest: new inner(registries_1.kusamaRegistry, { n: constants_1.MAX_U128 }),
            });
            expect(sanitizeNumbers_1.sanitizeNumbers(map)).toStrictEqual({
                nest: { n: constants_1.MAX_U128 },
            });
        });
        describe('Result', () => {
            const ResultConstructor = types_1.Result.with({
                Err: 'Text',
                Ok: 'u128',
            });
            const message = registries_1.kusamaRegistry.createType('Text', 'message');
            const maxU128 = registries_1.kusamaRegistry.createType('u128', constants_1.MAX_U128);
            // it('handles Ok()', () => {
            // 	const ok = kusamaRegistry.createType('DispatchResult');
            // 	expect(sanitizeNumbers(ok)).toStrictEqual([]);
            // });
            it('handles Ok()', () => {
                const ok = registries_1.kusamaRegistry.createType('DispatchResult');
                expect(sanitizeNumbers_1.sanitizeNumbers(ok)).toStrictEqual({ ok: [] });
            });
            // it('converts Error(u128)', () => {
            // 	const error = new ResultConstructor(kusamaRegistry, {
            // 		Error: maxU128,
            // 	});
            // 	expect(sanitizeNumbers(error)).toBe(MAX_U128);
            // });
            it('converts Error(u128)', () => {
                const error = new ResultConstructor(registries_1.kusamaRegistry, {
                    Err: maxU128,
                });
                expect(sanitizeNumbers_1.sanitizeNumbers(error)).toStrictEqual({
                    err: constants_1.MAX_U128,
                });
            });
            // it('handles Error(Text)', () => {
            // 	const error = new ResultConstructor(kusamaRegistry, {
            // 		Error: message,
            // 	});
            // 	expect(sanitizeNumbers(error)).toBe(message.toString());
            // });
            it('handles Error(Text)', () => {
                const error = new ResultConstructor(registries_1.kusamaRegistry, {
                    err: message,
                });
                expect(sanitizeNumbers_1.sanitizeNumbers(error)).toStrictEqual({
                    err: message.toString(),
                });
            });
            // it('converts Ok(u128)', () => {
            // 	const ok = new ResultConstructor(kusamaRegistry, {
            // 		ok: maxU128,
            // 	});
            // 	expect(sanitizeNumbers(ok)).toBe(MAX_U128);
            // });
            it('converts Ok(u128)', () => {
                const ok = new ResultConstructor(registries_1.kusamaRegistry, {
                    ok: maxU128,
                });
                expect(sanitizeNumbers_1.sanitizeNumbers(ok)).toStrictEqual({ ok: constants_1.MAX_U128 });
            });
            // it('handles Ok(Text)', () => {
            // 	const R = Result.with({ Error: Text, Ok: Text });
            // 	const ok = new R(kusamaRegistry, {
            // 		Ok: message,
            // 	});
            // 	expect(sanitizeNumbers(ok)).toBe(message.toString());
            // });
            it('handles Ok(Text)', () => {
                const R = types_1.Result.with({ Err: 'Text', Ok: 'Text' });
                const ok = new R(registries_1.kusamaRegistry, {
                    ok: message,
                });
                expect(sanitizeNumbers_1.sanitizeNumbers(ok)).toStrictEqual({
                    ok: message.toString(),
                });
            });
        });
        it('converts CodecSet', () => {
            const setRoles = {
                full: 1,
                authority: 3,
            };
            const set = new types_1.Set(registries_1.kusamaRegistry, setRoles, [
                'full',
                'authority',
            ]);
            expect(sanitizeNumbers_1.sanitizeNumbers(set)).toStrictEqual(['full', 'authority']);
        });
        describe('Struct', () => {
            it('converts a simple Struct', () => {
                const struct = new types_1.Struct(registries_1.kusamaRegistry, {
                    foo: 'Text',
                    bar: 'u32',
                }, { foo: 'hi :)', bar: constants_1.MAX_U32 });
                expect(sanitizeNumbers_1.sanitizeNumbers(struct)).toStrictEqual({
                    foo: 'hi :)',
                    bar: constants_1.MAX_U32,
                });
            });
            it('converts a more complex Struct', () => {
                const struct = new types_1.Struct(registries_1.kusamaRegistry, {
                    foo: types_1.Vec.with(types_1.Struct.with({
                        w: 'Text',
                        bar: 'u32',
                    })),
                }, {
                    foo: [
                        { bar: constants_1.MAX_U32, w: 'x' },
                        { bar: '0', w: 'X' },
                    ],
                });
                expect(sanitizeNumbers_1.sanitizeNumbers(struct)).toStrictEqual({
                    foo: [
                        { bar: constants_1.MAX_U32, w: 'x' },
                        { bar: '0', w: 'X' },
                    ],
                });
            });
            it('converts a five deep nested struct', () => {
                const content = {
                    n: constants_1.MAX_U32,
                    x: {
                        n: constants_1.MAX_U32,
                        x: {
                            n: constants_1.MAX_U32,
                            x: {
                                n: constants_1.MAX_U32,
                                x: {
                                    n: constants_1.MAX_U128,
                                    w: 'sorry',
                                },
                            },
                        },
                    },
                };
                const struct = new types_1.Struct(registries_1.kusamaRegistry, {
                    n: 'u32',
                    x: types_1.Struct.with({
                        n: 'u32',
                        x: types_1.Struct.with({
                            n: 'u32',
                            x: types_1.Struct.with({
                                n: 'u32',
                                x: types_1.Struct.with({
                                    n: 'u128',
                                    w: 'Text',
                                }),
                            }),
                        }),
                    }),
                }, content);
                expect(sanitizeNumbers_1.sanitizeNumbers(struct)).toStrictEqual(content);
            });
        });
        describe('Tuple', () => {
            it('converts a simple Tuple', () => {
                const tuple = new types_1.Tuple(registries_1.kusamaRegistry, ['Text', 'u128'], ['xX', constants_1.MAX_U128]);
                expect(sanitizeNumbers_1.sanitizeNumbers(tuple)).toStrictEqual(['xX', constants_1.MAX_U128]);
            });
            it('converts a 3 deep nested Tuple', () => {
                const tuple = new types_1.Tuple(registries_1.kusamaRegistry, [types_1.Tuple.with([types_1.Tuple.with(['u32', 'u128']), 'u128']), 'u32'], [[0, 6074317682114550], 0]);
                expect(sanitizeNumbers_1.sanitizeNumbers(tuple)).toStrictEqual([
                    [['0', '0'], '6074317682114550'],
                    '0',
                ]);
            });
        });
        it('converts U8a fixed', () => {
            const u8a = new (types_1.U8aFixed.with(32))(registries_1.kusamaRegistry, [0x02, 0x03]);
            expect(sanitizeNumbers_1.sanitizeNumbers(u8a)).toStrictEqual('0x02030000');
        });
        it('converts Vec<U128>', () => {
            const vec = new (types_1.Vec.with('u128'))(registries_1.kusamaRegistry, [
                '0',
                '366920938463463374607431768211455',
                constants_1.MAX_U128,
            ]);
            expect(sanitizeNumbers_1.sanitizeNumbers(vec)).toStrictEqual([
                '0',
                '366920938463463374607431768211455',
                constants_1.MAX_U128,
            ]);
        });
        it('converts VecFixed<U128>', () => {
            const vec = new (types_1.VecFixed.with('u128', 3))(registries_1.kusamaRegistry, [
                '0',
                '366920938463463374607431768211455',
                constants_1.MAX_U128,
            ]);
            expect(sanitizeNumbers_1.sanitizeNumbers(vec)).toStrictEqual([
                '0',
                '366920938463463374607431768211455',
                constants_1.MAX_U128,
            ]);
        });
    });
    describe('substrate specific types', () => {
        it('handles AccountId', () => {
            const id = registries_1.kusamaRegistry.createType('AccountId', '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw');
            expect(sanitizeNumbers_1.sanitizeNumbers(id)).toBe('5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw');
        });
        it('handles AccountIndex', () => {
            const i = registries_1.kusamaRegistry.createType('AccountIndex', 256);
            expect(sanitizeNumbers_1.sanitizeNumbers(i)).toBe('25GUyv');
        });
        it('handles Call', () => {
            const c = new types_1.GenericCall(registries_1.kusamaRegistry, {
                args: [
                    '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
                    100000,
                ],
                callIndex: [6, 0], // balances.transfer
            });
            expect(sanitizeNumbers_1.sanitizeNumbers(c)).toStrictEqual({
                args: {
                    dest: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
                    value: '100000',
                },
                callIndex: '0x0600',
            });
        });
        it('handles Event', () => {
            const event = registries_1.kusamaRegistry.createType('Event', new Uint8Array([6, 1, 1, 1]));
            expect(sanitizeNumbers_1.sanitizeNumbers(event)).toStrictEqual({
                data: ['257', '0', []],
                index: '0x0601',
            });
        });
        it('handles EventRecord', () => {
            const eventRecord = registries_1.kusamaRegistry.createType('Vec<EventRecord>', '0x0800000000000000000001000000000000');
            expect(sanitizeNumbers_1.sanitizeNumbers(eventRecord)).toStrictEqual([
                {
                    event: {
                        data: [
                            {
                                class: 'Normal',
                                paysFee: 'Yes',
                                weight: '65536',
                            },
                        ],
                        index: '0x0000',
                    },
                    phase: { applyExtrinsic: '0' },
                    topics: [],
                },
                {
                    event: { data: null, index: '0x0000' },
                    phase: { applyExtrinsic: '0' },
                    topics: [],
                },
            ]);
        });
        it('handles Extrinsic', () => {
            const extrinsic = registries_1.kusamaRegistry.createType('Extrinsic', '0x250284d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d0182630bcec823e017e7ae576feda0dae3bf76f74049f3b8f72884dcb41169154bc7d179d47b50453f4f8865a5f3030c1e78ed8eff624765d0ff5eb0136a46538e1502000005008eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a4830');
            expect(sanitizeNumbers_1.sanitizeNumbers(extrinsic)).toBe('0xb10184d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d0182630bcec823e017e7ae576feda0dae3bf76f74049f3b8f72884dcb41169154bc7d179d47b50453f4f8865a5f3030c1e78ed8eff624765d0ff5eb0136a46538e1502000005008eaf0415');
        });
        it('handles ExtrinsicEra', () => {
            const extrinsicEra = registries_1.kusamaRegistry.createType('ExtrinsicEra', '0x6502');
            expect(sanitizeNumbers_1.sanitizeNumbers(extrinsicEra)).toStrictEqual({
                mortalEra: ['64', '38'],
            });
        });
        it('ExtrinsicPayload', () => {
            const load = {
                address: '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE',
                blockHash: '0xde8f69eeb5e065e18c6950ff708d7e551f68dc9bf59a07c52367c0280f805ec7',
                era: '0x0703',
                genesisHash: '0xdcd1346701ca8396496e52aa2785b1748deb6db09551b72159dcb3e08991025b',
                method: '0x0600ffd7568e5f0a7eda67a82691ff379ac4bba4f9c9b859fe779b5d46363b61ad2db9e56c',
                nonce: '0x00001234',
                specVersion: 123,
                tip: '0x00000000000000000000000000005678',
            };
            const extrinsicPayload = registries_1.kusamaRegistry.createType('ExtrinsicPayload', load, {
                version: 4,
            });
            expect(sanitizeNumbers_1.sanitizeNumbers(extrinsicPayload)).toBe('0x940600ffd7568e5f0a7eda67a82691ff379ac4bba4f9c9b859fe779b5d46363b61ad2db9e56c0703d148e25901007b00000000000000dcd1346701ca8396496e52aa2785b1748deb6db09551b72159dcb3e08991025bde8f69eeb5e065e18c6950ff708d7e551f68dc9bf59a07c52367c0280f805ec7');
        });
        it('handles Vote', () => {
            const aye = registries_1.kusamaRegistry.createType('Vote', {
                aye: true,
                conviction: 'Locked2x',
            });
            expect(sanitizeNumbers_1.sanitizeNumbers(aye)).toBe('0x82');
            const nay = registries_1.kusamaRegistry.createType('Vote', {
                aye: false,
                conviction: 'Locked2x',
            });
            expect(sanitizeNumbers_1.sanitizeNumbers(nay)).toBe('0x02');
        });
        it('converts Moment', () => {
            const m = registries_1.kusamaRegistry.createType('Moment', constants_1.MAX_U64);
            expect(sanitizeNumbers_1.sanitizeNumbers(m)).toBe(constants_1.MAX_U64);
            const z = registries_1.kusamaRegistry.createType('Moment', 0);
            expect(sanitizeNumbers_1.sanitizeNumbers(z)).toBe('0');
        });
        it('converts Signature', () => {
            const s = registries_1.kusamaRegistry.createType('Signature', constants_1.MAX_U64);
            expect(sanitizeNumbers_1.sanitizeNumbers(s)).toBe('0x31383434363734343037333730393535313631350000000000000000000000000000000000000000000000000000000000000000000000000000000000000000');
        });
        it('StorageData', () => {
            const d = registries_1.kusamaRegistry.createType('StorageData', '0x2082c39b31a2b79a90f8e66e7a77fdb85a4ed5517f2ae39f6a80565e8ecae85cf54de37a07567ebcbf8c64568428a835269a566723687058e017b6d69db00a77e758d67e0f9be62dce75adbb005e8097de5c45f32b1ba7264717df2db4ae9f276e8101764f45778d4980dadaceee6e8af2517d3ab91ac9bec9cd1714fa5994081ca070532405ebf20fba389cbabfe1885cc134ee18028d488714eae621b47baf9d227cee94fa4e88d8d25abe706f15aca03b1d753d433f5ef9aa9ad1bcf5e5b81e040c8dc048a6d129803caa851c4c9633610068e4ef9eaa0bfbf40dfbfd43d9222347812ef77d9fd3cca1673e1b2bde54da96fddcf79d92832b1e2a819724f140');
            expect(sanitizeNumbers_1.sanitizeNumbers(d)).toBe('0x2082c39b31a2b79a90f8e66e7a77fdb85a4ed5517f2ae39f6a80565e8ecae85cf54de37a07567ebcbf8c64568428a835269a566723687058e017b6d69db00a77e758d67e0f9be62dce75adbb005e8097de5c45f32b1ba7264717df2db4ae9f276e8101764f45778d4980dadaceee6e8af2517d3ab91ac9bec9cd1714fa5994081ca070532405ebf20fba389cbabfe1885cc134ee18028d488714eae621b47baf9d227cee94fa4e88d8d25abe706f15aca03b1d753d433f5ef9aa9ad1bcf5e5b81e040c8dc048a6d129803caa851c4c9633610068e4ef9eaa0bfbf40dfbfd43d9222347812ef77d9fd3cca1673e1b2bde54da96fddcf79d92832b1e2a819724f140');
        });
        it('converts Balance', () => {
            const balanceZero = registries_1.kusamaRegistry.createType('Balance', '0x0');
            expect(sanitizeNumbers_1.sanitizeNumbers(balanceZero)).toBe('0');
            const balanceTen = registries_1.kusamaRegistry.createType('Balance', 10);
            expect(sanitizeNumbers_1.sanitizeNumbers(balanceTen)).toBe('10');
            const balancePaddedHex = registries_1.kusamaRegistry.createType('Balance', '0x000000000000000004fe9f24a6a9c00');
            expect(sanitizeNumbers_1.sanitizeNumbers(balancePaddedHex)).toBe('22493750000000000');
            const balanceMax = registries_1.kusamaRegistry.createType('Balance', constants_1.MAX_U128);
            expect(sanitizeNumbers_1.sanitizeNumbers(balanceMax)).toBe(constants_1.MAX_U128);
        });
        it('converts Compact<Balance>', () => {
            const compactBalanceZero = registries_1.kusamaRegistry.createType('Compact<Balance>', '0x0');
            expect(sanitizeNumbers_1.sanitizeNumbers(compactBalanceZero)).toBe('0');
            const compactBalancePaddedHex = registries_1.kusamaRegistry.createType('Compact<Balance>', '0x0000000000000000004fe9f24a6a9c00');
            expect(sanitizeNumbers_1.sanitizeNumbers(compactBalancePaddedHex)).toBe('22493750000000000');
            const compactBalancePaddedHex2 = registries_1.kusamaRegistry.createType('Compact<Balance>', '0x000000000000000000ff49f24a6a9c00');
            expect(sanitizeNumbers_1.sanitizeNumbers(compactBalancePaddedHex2)).toBe('71857424040631296');
            const compactBalanceMax = registries_1.kusamaRegistry.createType('Compact<Balance>', constants_1.MAX_U128);
            expect(sanitizeNumbers_1.sanitizeNumbers(compactBalanceMax)).toBe(constants_1.MAX_U128);
        });
        it('converts Index and Compact<Index>', () => {
            const IndexPadded = registries_1.kusamaRegistry.createType('Index', '0x00000384');
            expect(sanitizeNumbers_1.sanitizeNumbers(IndexPadded)).toBe('900');
            const IndexMax = registries_1.kusamaRegistry.createType('Index', '0x7FFFFFFF');
            expect(sanitizeNumbers_1.sanitizeNumbers(IndexMax)).toBe('2147483647');
            const CompactIndexPadded = registries_1.kusamaRegistry.createType('Compact<Index>', '0x00000384');
            expect(sanitizeNumbers_1.sanitizeNumbers(CompactIndexPadded)).toBe('900');
            const CompactIndexMax = registries_1.kusamaRegistry.createType('Compact<Index>', '0x7FFFFFFF');
            expect(sanitizeNumbers_1.sanitizeNumbers(CompactIndexMax)).toBe('2147483647');
        });
        it('converts Compact<Balance> that are values in an object', () => {
            const totalBalance = registries_1.kusamaRegistry.createType('Compact<Balance>', constants_1.MAX_U128);
            const activeBalance = registries_1.kusamaRegistry.createType('Compact<Balance>', '0x0000000000000000ff49f24a6a9100');
            const arbitraryObject = {
                total: totalBalance,
                active: activeBalance,
            };
            const sanitizedArbitraryObject = {
                total: constants_1.MAX_U128,
                active: '71857424040628480',
            };
            expect(sanitizeNumbers_1.sanitizeNumbers(arbitraryObject)).toStrictEqual(sanitizedArbitraryObject);
        });
        it('converts a staking response', () => {
            expect(sanitizeNumbers_1.sanitizeNumbers(mockData_1.PRE_SANITIZED_STAKING_RESPONSE)).toStrictEqual({
                at: {
                    hash: '0x5f2a8b33c24368148982c37aefe77d5724f5aca0bcae1a599e2a4634c1f0fab2',
                    height: '2669784',
                },
                staking: {
                    active: '71857424040628480',
                    claimedRewards: [],
                    stash: '5DRihWfVSmhbk25D4VRSjacZTtrnv8w8qnGttLmfro5MCPgm',
                    total: '71857424040631296',
                    unlocking: [],
                },
            });
        });
        it('converts Vec<BalanceLock>', () => {
            expect(sanitizeNumbers_1.sanitizeNumbers(mockData_1.PRE_SANITIZED_BALANCE_LOCK)).toStrictEqual([
                {
                    id: '0x4c6f636b49640000',
                    amount: '71857424040631296',
                    reasons: 'Misc',
                },
            ]);
        });
        it('converts Option<VestingInfo>', () => {
            expect(sanitizeNumbers_1.sanitizeNumbers(mockData_1.PRE_SANITIZED_OPTION_VESTING_INFO)).toStrictEqual({
                locked: '71857424040631296',
                perBlock: '71857424040628480',
                startingBlock: '299694200',
            });
        });
        it('converts RuntimeDispatchInfo', () => {
            expect(sanitizeNumbers_1.sanitizeNumbers(mockData_1.PRE_SANITIZED_RUNTIME_DISPATCH_INFO)).toStrictEqual({
                weight: constants_1.MAX_U64,
                class: 'Operational',
                partialFee: constants_1.MAX_U128,
            });
        });
        it('handles enum ElectionStatus', () => {
            const open = registries_1.kusamaRegistry.createType('ElectionStatus', {
                open: 420420,
            });
            expect(sanitizeNumbers_1.sanitizeNumbers(open)).toStrictEqual({ open: '420420' });
            const close = registries_1.kusamaRegistry.createType('ElectionStatus', 'close');
            expect(sanitizeNumbers_1.sanitizeNumbers(close)).toStrictEqual({ close: null });
        });
    });
    it('handles Vec<AccountId>', () => {
        const vec = new types_1.Vec(registries_1.kusamaRegistry, 'AccountId', [
            '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
            '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
            '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        ]);
        expect(sanitizeNumbers_1.sanitizeNumbers(vec)).toStrictEqual([
            '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
            '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
            '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        ]);
    });
});
//# sourceMappingURL=sanitizeNumbers.spec.js.map