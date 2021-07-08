"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kusamaRegistry = void 0;
const metadata_1 = require("@polkadot/metadata");
const static_1 = require("@polkadot/metadata/v11/static");
const types_1 = require("@polkadot/types");
const types_known_1 = require("@polkadot/types-known");
/**
 * Create a type registry for Kusama.
 * Useful for creating types in order to facilitate testing.
 *
 * N.B. This should deprecated since it does not set chain properties.
 * It is still here because it has users.
 */
function createKusamaRegistry() {
    const registry = new types_1.TypeRegistry();
    registry.register(types_known_1.getSpecTypes(registry, 'Kusama', 'kusama', 2008));
    registry.setMetadata(new metadata_1.Metadata(registry, static_1.default));
    return registry;
}
/**
 * Kusama v2008 TypeRegistry.
 */
exports.kusamaRegistry = createKusamaRegistry();
//# sourceMappingURL=kusamaRegistry.js.map