"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterApiRpc = void 0;
const winston_1 = require("winston");
/**
 * Ignore log messages that have `API-WS:`. (e.g. polkadot-js RPC logging)
 */
exports.filterApiRpc = winston_1.format((info, _opts) => {
    var _a, _b, _c;
    if (!info ||
        (((_a = info === null || info === void 0 ? void 0 : info.message) === null || _a === void 0 ? void 0 : _a.includes) &&
            !((_b = info === null || info === void 0 ? void 0 : info.message) === null || _b === void 0 ? void 0 : _b.includes('connected')) &&
            ((_c = info.message) === null || _c === void 0 ? void 0 : _c.includes('API-WS:')) &&
            info.level === 'info')) {
        return false;
    }
    return info;
});
//# sourceMappingURL=filterApiRpc.js.map