"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripTimestamp = void 0;
const winston_1 = require("winston");
/**
 * Regex that matches timestamps with the format of `YYYY-MM-DD HH:MM`
 */
const timestampRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
/**
 * Slice out the timestamp from a message so it is not redundant with the winston
 * timestamp. This is for the polkadot-js console statements.
 */
exports.stripTimestamp = winston_1.format((info, _opts) => {
    if (timestampRegex.exec(info === null || info === void 0 ? void 0 : info.message)) {
        info.message = info.message.slice(24).trim();
    }
    return info;
});
//# sourceMappingURL=stripTimestamp.js.map