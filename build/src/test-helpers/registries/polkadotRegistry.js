"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polkadotRegistry = void 0;
const metadata_1 = require("@polkadot/metadata");
const types_1 = require("@polkadot/types");
const types_known_1 = require("@polkadot/types-known");
const polkadotV16Metadata_1 = require("../metadata/polkadotV16Metadata");
/**
 * Create a type registry for Polkadot.
 * Useful for creating types in order to facilitate testing.
 */
function createPolkadotRegistry() {
    const registry = new types_1.TypeRegistry();
    registry.register(types_known_1.getSpecTypes(registry, 'Polkadot', 'polkadot', 16));
    registry.setChainProperties(registry.createType('ChainProperties', {
        ss58Format: 0,
        tokenDecimals: 12,
        tokenSymbol: 'DOT',
    }));
    registry.setMetadata(new metadata_1.Metadata(registry, polkadotV16Metadata_1.polkadotV16MetadataRpc));
    return registry;
}
/**
 * Polkadot v16 TypeRegistry.
 */
exports.polkadotRegistry = createPolkadotRegistry();
//# sourceMappingURL=polkadotRegistry.js.map