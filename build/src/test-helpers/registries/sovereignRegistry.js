"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSovereignRegistry = void 0;
const metadata_1 = require("@polkadot/metadata");
const types_1 = require("@polkadot/types");
const types_known_1 = require("@polkadot/types-known");
/**
 * Create a type registry for Polkadot.
 * Useful for creating types in order to facilitate testing.
 */
function createSovereignRegistry(specVersion, metadataRpc) {
    const registry = new types_1.TypeRegistry();
    registry.register(types_known_1.getSpecTypes(registry, 'SovereignChain', 'sovereign-chain', specVersion));
    registry.setChainProperties(registry.createType('ChainProperties', {
        ss58Format: 0,
        tokenDecimals: 10,
        tokenSymbol: 'CSOV',
    }));
    registry.setMetadata(new metadata_1.Metadata(registry, metadataRpc));
    return registry;
}
exports.createSovereignRegistry = createSovereignRegistry;
// /**
//  * sovereignChainRegistry
//  */
// export const sovereignChainRegistry = createSovereignRegistry();
//# sourceMappingURL=sovereignRegistry.js.map