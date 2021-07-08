"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csovMockApi = exports.mockApi = exports.tx = exports.pendingExtrinsics = exports.submitExtrinsic = exports.queryInfoBalancesTransfer = exports.ledgerAt = exports.bondedAt = exports.erasStartSessionIndexAt = exports.activeEraAt = exports.deriveGetBlock = exports.getBlock = void 0;
const metadata_1 = require("../../../test-helpers/metadata/metadata");
const registries_1 = require("../../../test-helpers/registries");
const _1 = require(".");
const events789629Hex_1 = require("./data/events789629Hex");
const localListenAddresses_1 = require("./data/localListenAddresses");
const validators789629Hex_1 = require("./data/validators789629Hex");
const eventsAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<EventRecord>', events789629Hex_1.events789629));
const chain = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistry.createType('Text', 'Polkadot');
});
const getBlock = (_hash) => Promise.resolve().then(() => {
    return {
        block: _1.mockBlock789629,
    };
});
exports.getBlock = getBlock;
const deriveGetBlock = (_hash) => Promise.resolve().then(() => {
    return {
        author: registries_1.polkadotRegistry.createType('AccountId', '1zugcajGg5yDD9TEqKKzGx7iKuGWZMkRbYcyaFnaUaEkwMK'),
        block: _1.mockBlock789629,
    };
});
exports.deriveGetBlock = deriveGetBlock;
const getHeader = (_hash) => Promise.resolve().then(() => _1.mockBlock789629.header);
const runtimeVersion = {
    specName: registries_1.polkadotRegistry.createType('Text', 'polkadot'),
    specVersion: registries_1.polkadotRegistry.createType('u32', 16),
    transactionVersion: registries_1.polkadotRegistry.createType('u32', 2),
    implVersion: registries_1.polkadotRegistry.createType('u32', 0),
    implName: registries_1.polkadotRegistry.createType('Text', 'parity-polkadot'),
    authoringVersion: registries_1.polkadotRegistry.createType('u32', 0),
};
const getRuntimeVersion = () => Promise.resolve().then(() => {
    return runtimeVersion;
});
const getMetadata = () => Promise.resolve().then(() => metadata_1.polkadotMetadata);
const deriveGetHeader = () => Promise.resolve().then(() => {
    return {
        author: registries_1.polkadotRegistry.createType('AccountId', '1zugcajGg5yDD9TEqKKzGx7iKuGWZMkRbYcyaFnaUaEkwMK'),
    };
});
const nextFeeMultiplierAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Fixed128', 1000000000));
const validatorCountAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('u32', 197));
const forceEraAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Forcing', 'NotForcing'));
const eraElectionStatusAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('ElectionStatus', { Close: null }));
const validatorsAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<ValidatorId>', validators789629Hex_1.validators789629Hex));
const currentSlotAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('u64', 265876724));
const epochIndexAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('u64', 330));
const genesisSlotAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('u64', 265084563));
const currentIndexAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('SessionIndex', 330));
const version = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Text', '0.8.22-c6ee8675-x86_64-linux-gnu'));
const activeEraAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<ActiveEraInfo>', {
    index: 49,
    start: 1595259378000,
}));
exports.activeEraAt = activeEraAt;
const erasStartSessionIndexAt = (_hash, _activeEra) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<SessionIndex>', 330));
exports.erasStartSessionIndexAt = erasStartSessionIndexAt;
const unappliedSlashesAt = (_hash, _activeEra) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<UnappliedSlash>', []));
const locksAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<BalanceLock>', '0x047374616b696e672000e8764817000000000000000000000002'));
const accountAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('AccountInfo', '0x0600000003dbb656ab7400000000000000000000000000000000000000000000000000000000e8764817000000000000000000000000e87648170000000000000000000000'));
const bondedAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<AccountId>', _1.testAddressController));
exports.bondedAt = bondedAt;
const vestingAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<VestingInfo>', null));
const ledgerAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<StakingLedger>', '0x2c2a55b5e0d28cc772b47bb9b25981cbb69eca73f7c3388fb6464e7d24be470e0700e87648170700e8764817008c000000000100000002000000030000000400000005000000060000000700000008000000090000001700000018000000190000001a0000001b0000001c0000001d0000001e0000001f000000200000002100000022000000230000002400000025000000260000002700000028000000290000002a0000002b0000002c0000002d0000002e0000002f000000'));
exports.ledgerAt = ledgerAt;
const payeeAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('RewardDestination', 'Controller'));
const slashingSpansAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('SlashingSpans'));
// For getting the blockhash of the genesis block
const getBlockHashGenesis = (_zero) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('BlockHash', '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'));
const queryInfoBalancesTransfer = (_extrinsic, _hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('RuntimeDispatchInfo', {
    weight: 195000000,
    class: 'Normal',
    partialFee: 149000000,
}));
exports.queryInfoBalancesTransfer = queryInfoBalancesTransfer;
const submitExtrinsic = (_extrinsic) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Hash'));
exports.submitExtrinsic = submitExtrinsic;
const getStorage = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<Raw>', '0x'));
const chainType = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('ChainType', {
    Live: null,
}));
const properties = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('ChainProperties', {
    ss58Format: '0',
    tokenDecimals: '12',
    tokenSymbol: 'DOT',
}));
const getFinalizedHead = () => Promise.resolve().then(() => _1.blockHash789629);
const health = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Health', '0x7a000000000000000001'));
const localListenAddresses = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<Text>', localListenAddresses_1.localListenAddressesHex));
const nodeRoles = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<NodeRole>', '0x0400'));
const localPeerId = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Text', '0x313244334b6f6f57415a66686a79717a4674796435357665424a78545969516b5872614d584c704d4d6a355a6f3471756431485a'));
const pendingExtrinsics = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<Extrinsic>'));
exports.pendingExtrinsics = pendingExtrinsics;
const tx = () => registries_1.polkadotRegistry.createType('Extrinsic', _1.balancesTransferValid);
exports.tx = tx;
const referendumInfoOfAt = () => Promise.resolve().then(() => {
    registries_1.polkadotRegistry.createType('ReferendumInfo');
});
/**
 * Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #789629, which is what most Service unit tests are based on.
 */
exports.mockApi = {
    runtimeVersion,
    createType: registries_1.polkadotRegistry.createType.bind(registries_1.polkadotRegistry),
    registry: registries_1.polkadotRegistry,
    tx: exports.tx,
    runtimeMetadata: metadata_1.polkadotMetadata,
    query: {
        babe: {
            currentSlot: { at: currentSlotAt },
            epochIndex: { at: epochIndexAt },
            genesisSlot: { at: genesisSlotAt },
        },
        balances: {
            locks: { at: locksAt },
        },
        session: {
            currentIndex: { at: currentIndexAt },
            validators: { at: validatorsAt },
        },
        staking: {
            validatorCount: { at: validatorCountAt },
            forceEra: { at: forceEraAt },
            eraElectionStatus: { at: eraElectionStatusAt },
            activeEra: { at: exports.activeEraAt },
            erasStartSessionIndex: { at: exports.erasStartSessionIndexAt },
            unappliedSlashes: { at: unappliedSlashesAt },
            bonded: { at: exports.bondedAt },
            ledger: { at: exports.ledgerAt },
            payee: { at: payeeAt },
            slashingSpans: { at: slashingSpansAt },
        },
        system: {
            events: { at: eventsAt },
            account: { at: accountAt },
        },
        transactionPayment: {
            nextFeeMultiplier: { at: nextFeeMultiplierAt },
        },
        vesting: {
            vesting: { at: vestingAt },
        },
        democracy: {
            referendumInfoOf: { at: referendumInfoOfAt },
        },
    },
    consts: {
        babe: {
            epochDuration: registries_1.polkadotRegistry.createType('u64', 2400),
        },
        transactionPayment: {
            transactionByteFee: registries_1.polkadotRegistry.createType('Balance', 1000000),
            weightToFee: [
                {
                    coeffFrac: registries_1.polkadotRegistry.createType('Perbill', 80000000),
                    coeffInteger: registries_1.polkadotRegistry.createType('Balance', 0),
                    degree: registries_1.polkadotRegistry.createType('u8', 1),
                    negative: false,
                },
            ],
        },
        staking: {
            electionLookAhead: registries_1.polkadotRegistry.createType('BlockNumber'),
            sessionsPerEra: registries_1.polkadotRegistry.createType('SessionIndex', 6),
        },
        system: {
            extrinsicBaseWeight: registries_1.polkadotRegistry.createType('u64', 125000000),
        },
    },
    rpc: {
        chain: {
            getHeader,
            getBlock: exports.getBlock,
            getBlockHash: getBlockHashGenesis,
            getFinalizedHead,
        },
        state: {
            getRuntimeVersion,
            getMetadata,
            getStorage,
        },
        system: {
            chain,
            health,
            localListenAddresses,
            nodeRoles,
            localPeerId,
            version,
            chainType,
            properties,
        },
        payment: {
            queryInfo: exports.queryInfoBalancesTransfer,
        },
        author: {
            submitExtrinsic: exports.submitExtrinsic,
            pendingExtrinsics: exports.pendingExtrinsics,
        },
    },
    derive: {
        chain: {
            getHeader: deriveGetHeader,
            getBlock: exports.deriveGetBlock,
        },
    },
};
exports.csovMockApi = {
    runtimeVersion,
    createType: registries_1.polkadotRegistry.createType.bind(registries_1.polkadotRegistry),
    registry: registries_1.polkadotRegistry,
    tx: exports.tx,
    runtimeMetadata: metadata_1.polkadotMetadata,
    query: {
        babe: {
            currentSlot: { at: currentSlotAt },
            epochIndex: { at: epochIndexAt },
            genesisSlot: { at: genesisSlotAt },
        },
        balances: {
            locks: { at: locksAt },
        },
        session: {
            currentIndex: { at: currentIndexAt },
            validators: { at: validatorsAt },
        },
        staking: {
            validatorCount: { at: validatorCountAt },
            forceEra: { at: forceEraAt },
            eraElectionStatus: { at: eraElectionStatusAt },
            activeEra: { at: exports.activeEraAt },
            erasStartSessionIndex: { at: exports.erasStartSessionIndexAt },
            unappliedSlashes: { at: unappliedSlashesAt },
            bonded: { at: exports.bondedAt },
            ledger: { at: exports.ledgerAt },
            payee: { at: payeeAt },
            slashingSpans: { at: slashingSpansAt },
        },
        system: {
            events: { at: eventsAt },
            account: { at: accountAt },
        },
        transactionPayment: {
            nextFeeMultiplier: { at: nextFeeMultiplierAt },
        },
        vesting: {
            vesting: { at: vestingAt },
        },
        democracy: {
            referendumInfoOf: { at: referendumInfoOfAt },
        },
    },
    consts: {
        babe: {
            epochDuration: registries_1.polkadotRegistry.createType('u64', 2400),
        },
        transactionPayment: {
            transactionByteFee: registries_1.polkadotRegistry.createType('Balance', 1000000),
            weightToFee: [
                {
                    coeffFrac: registries_1.polkadotRegistry.createType('Perbill', 80000000),
                    coeffInteger: registries_1.polkadotRegistry.createType('Balance', 0),
                    degree: registries_1.polkadotRegistry.createType('u8', 1),
                    negative: false,
                },
            ],
        },
        staking: {
            electionLookAhead: registries_1.polkadotRegistry.createType('BlockNumber'),
            sessionsPerEra: registries_1.polkadotRegistry.createType('SessionIndex', 6),
        },
        system: {
            extrinsicBaseWeight: registries_1.polkadotRegistry.createType('u64', 125000000),
        },
    },
    rpc: {
        chain: {
            getHeader,
            getBlock: exports.getBlock,
            getBlockHash: getBlockHashGenesis,
            getFinalizedHead,
        },
        state: {
            getRuntimeVersion,
            getMetadata,
            getStorage,
        },
        system: {
            chain,
            health,
            localListenAddresses,
            nodeRoles,
            localPeerId,
            version,
            chainType,
            properties,
        },
        payment: {
            queryInfo: exports.queryInfoBalancesTransfer,
        },
        author: {
            submitExtrinsic: exports.submitExtrinsic,
            pendingExtrinsics: exports.pendingExtrinsics,
        },
    },
    derive: {
        chain: {
            getHeader: deriveGetHeader,
            getBlock: exports.deriveGetBlock,
        },
    },
};
//# sourceMappingURL=mockApi.js.map