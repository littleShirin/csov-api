"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeNumbers = void 0;
const types_1 = require("@polkadot/types");
const AbstractArray_1 = require("@polkadot/types/codec/AbstractArray");
const AbstractInt_1 = require("@polkadot/types/codec/AbstractInt");
const Json_1 = require("@polkadot/types/codec/Json");
const Map_1 = require("@polkadot/types/codec/Map");
const util_1 = require("@polkadot/util");
const BN = require("bn.js");
const http_errors_1 = require("http-errors");
const polkadot_js_1 = require("../types/polkadot-js");
/**
 * Forcibly serialize all instances of AbstractInt to base 10. With Codec
 * based types we can provide a strong guarantee that the output will be of AnyJson
 *
 * @param value a type that implements polkadot-js Codec
 */
function sanitizeCodec(value) {
    // If objects have an overlapping prototype chain
    // we check lower down the chain first. More specific before less specific.
    if (value instanceof types_1.Option) {
        return value.isSome ? sanitizeNumbers(value.unwrap()) : null;
    }
    if (value instanceof types_1.Compact) {
        return sanitizeNumbers(value.unwrap());
    }
    if (value instanceof types_1.Struct) {
        return value.defKeys.reduce((jsonStruct, key) => {
            const property = value.get(key);
            if (!property) {
                return jsonStruct;
            }
            jsonStruct[key] = sanitizeNumbers(property);
            return jsonStruct;
        }, {});
    }
    if (value instanceof Json_1.Json) {
        // This is essentially a Map with [keys: strings]: any
        const json = {};
        value.forEach((element, prop) => {
            json[prop] = sanitizeNumbers(element);
        });
        return json;
    }
    if (value instanceof types_1.Enum) {
        if (value.isBasic) {
            return value.toJSON();
        }
        return {
            // Replicating camelCaseing introduced in https://github.com/polkadot-js/api/pull/3024
            // Specifically see: https://github.com/polkadot-js/api/blob/516fbd4a90652841d4e81636e74ca472e2dc5621/packages/types/src/codec/Enum.ts#L346
            [util_1.stringCamelCase(value.type)]: sanitizeNumbers(value.value),
        };
    }
    if (value instanceof types_1.BTreeSet) {
        const jsonSet = [];
        value.forEach((element) => {
            jsonSet.push(sanitizeNumbers(element));
        });
        return jsonSet;
    }
    if (value instanceof types_1.Set) {
        // CodecSet is essentially just a JS Set<string>
        return value.strings;
    }
    // Should cover BTreeMap and HashMap
    if (value instanceof Map_1.CodecMap) {
        return mapTypeSanitizeKeyValue(value);
    }
    // Should cover Vec, VecAny, VecFixed, Tuple
    if (value instanceof AbstractArray_1.AbstractArray) {
        return value.map(sanitizeNumbers);
    }
    // Should cover Uint, Int etc...
    if (value instanceof AbstractInt_1.AbstractInt) {
        return value.toString(10);
    }
    // All other codecs are not nested
    return value.toJSON();
}
/**
 * Forcibly serialize all instances of AbstractInt to base 10 and otherwise
 * normalize data presentation. We try to guarantee that data is
 * of type AnyJson, but it is not a strong guarantee.
 *
 * Under the hood AbstractInt is
 * a BN.js, which has a .toString(radix) that lets us convert to base 10.
 * The likely reason for the inconsistency in polkadot-js natives .toJSON
 * is that over a certain value some Int like types have a flag that tells
 * them to serialize to Hex.
 *
 * @param data - any arbitrary data that Sidecar might send
 */
function sanitizeNumbers(data) {
    if (data !== 0 && !data) {
        // All falsy values are valid AnyJson, but we want to force numbers to strings
        return data;
    }
    if (polkadot_js_1.isCodec(data)) {
        return sanitizeCodec(data);
    }
    if (data instanceof Set) {
        const jsonSet = [];
        for (const element of data) {
            jsonSet.push(sanitizeNumbers(element));
        }
        return jsonSet;
    }
    if (data instanceof Map) {
        return mapTypeSanitizeKeyValue(data);
    }
    if (data instanceof BN || typeof data === 'number') {
        return data.toString(10);
    }
    if (Array.isArray(data)) {
        return data.map(sanitizeNumbers);
    }
    if (polkadot_js_1.isToJSONable(data)) {
        // Handle non-codec types that have their own toJSON
        return sanitizeNumbers(data.toJSON());
    }
    // Pretty much everything non-primitive is an object, so we need to check this last
    if (util_1.isObject(data)) {
        return Object.entries(data).reduce((sanitizedObject, [key, value]) => {
            sanitizedObject[key] = sanitizeNumbers(value);
            return sanitizedObject;
        }, {});
    }
    if (!polkadot_js_1.isAnyJson(data)) {
        // TODO this may be removed in the future
        console.error('data could not be forced to `AnyJson` `sanitizeNumber`');
        console.error(data);
    }
    return data;
}
exports.sanitizeNumbers = sanitizeNumbers;
/**
 * Sanitize both the key and values of a map based type, ensuring that the key
 * is either a number or string.
 *
 * @param map Map | CodecMap
 */
function mapTypeSanitizeKeyValue(map) {
    const jsonMap = {};
    map.forEach((value, key) => {
        const nonCodecKey = sanitizeNumbers(key);
        if (!(typeof nonCodecKey === 'string' ||
            typeof nonCodecKey === 'number')) {
            throw new http_errors_1.InternalServerError('Unexpected non-string and non-number key while sanitizing a Map-like type');
        }
        jsonMap[nonCodecKey] = sanitizeNumbers(value);
    });
    return jsonMap;
}
//# sourceMappingURL=sanitizeNumbers.js.map