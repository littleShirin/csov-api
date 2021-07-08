"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kusamaMetadata = exports.polkadotMetadata = void 0;
const metadata_1 = require("@polkadot/metadata");
const static_1 = require("@polkadot/metadata/v11/static");
const kusamaRegistry_1 = require("../registries/kusamaRegistry");
const polkadotRegistry_1 = require("../registries/polkadotRegistry");
const polkadotV16Metadata_1 = require("./polkadotV16Metadata");
/**
 * Metadata of the polkadotRegistry (v16).
 */
exports.polkadotMetadata = new metadata_1.Metadata(polkadotRegistry_1.polkadotRegistry, polkadotV16Metadata_1.polkadotV16MetadataRpc);
/**
 * Metadata of the kusamaRegistry (v2008).
 */
exports.kusamaMetadata = new metadata_1.Metadata(kusamaRegistry_1.kusamaRegistry, static_1.default);
//# sourceMappingURL=metadata.js.map