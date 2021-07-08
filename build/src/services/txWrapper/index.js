"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = exports.KNOWN_CHAIN_PROPERTIES = exports.methods = void 0;
const types_1 = require("./types/types");
const txwrapper_substrate_1 = require("@substrate/txwrapper-substrate");
const txwrapper_core_1 = require("@substrate/txwrapper-core");
// Export methods of pallets included in your chain's runtime.
// Note: you may also want to create methods for pallets specifc to your chain. In that case
// consult the CHAIN_BUILDER.md guide.
exports.methods = {
    balances: txwrapper_substrate_1.methods.balances,
    utility: txwrapper_substrate_1.methods.utility,
    proxy: txwrapper_substrate_1.methods.proxy,
};
// Rexport all of txwrapper-core so users have access to utilities, construct functions,
// decode function, and types.
__exportStar(require("@substrate/txwrapper-core"), exports);
// Crown Sterling registry 
/**
 * `ChainProperties` for networks that txwrapper-cs supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
exports.KNOWN_CHAIN_PROPERTIES = {
    SovereignChain: {
        ss58Format: 0,
        tokenDecimals: 12,
        tokenSymbol: 'CSOV',
    }
};
/**
* Get a type registry for networks that txwrapper-cs supports.
*
* @param GetRegistryOptions specName, chainName, specVersion, and metadataRpc of the current runtime
*/
function getRegistry({ specName, chainName, specVersion, metadataRpc, properties, }) {
    const registry = new txwrapper_core_1.TypeRegistry();
    registry.setKnownTypes({
        types: types_1.types1,
    });
    return txwrapper_core_1.getRegistryBase({
        chainProperties: properties || exports.KNOWN_CHAIN_PROPERTIES[specName],
        specTypes: txwrapper_core_1.getSpecTypes(registry, chainName, specName, specVersion),
        metadataRpc,
    });
}
exports.getRegistry = getRegistry;
__exportStar(require("./sovereinchainExample"), exports);
__exportStar(require("./types/types"), exports);
__exportStar(require("./sovereinchainExample"), exports);
//# sourceMappingURL=index.js.map