"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoratedPolkadotMetadata = exports.decoratedKusamaMetadata = void 0;
const decorate_1 = require("@polkadot/metadata/decorate");
const kusamaRegistry_1 = require("../registries/kusamaRegistry");
const polkadotRegistry_1 = require("../registries/polkadotRegistry");
const metadata_1 = require("./metadata");
/**
 * Decorated metadata of the kusamaRegistry (v2008).
 */
exports.decoratedKusamaMetadata = decorate_1.expandMetadata(kusamaRegistry_1.kusamaRegistry, metadata_1.kusamaMetadata);
/**
 * Decorated metadata of the polkadotRegistry (v16).
 */
exports.decoratedPolkadotMetadata = decorate_1.expandMetadata(polkadotRegistry_1.polkadotRegistry, metadata_1.polkadotMetadata);
//# sourceMappingURL=decorated.js.map