"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockForkedBlock789629 = exports.blockHash789629 = exports.mockBlock789629 = void 0;
const registries_1 = require("../../../test-helpers/registries");
const block789629 = require("./data/block789629.json");
const block789629Fork = require("./data/blocks789629Fork.json");
/**
 * Mock for polkadot block #789629.
 */
exports.mockBlock789629 = registries_1.polkadotRegistry.createType('Block', block789629);
/**
 * BlockHash for polkadot block #789629.
 */
exports.blockHash789629 = registries_1.polkadotRegistry.createType('BlockHash', '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578');
/**
 * Mock for polkadot forked block #789629.
 */
exports.mockForkedBlock789629 = registries_1.polkadotRegistry.createType('Block', block789629Fork);
//# sourceMappingURL=mockBlock789629.js.map