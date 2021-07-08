"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumberOrThrow = void 0;
const http_errors_1 = require("http-errors");
function parseNumberOrThrow(n, errorMessage) {
    const num = Number(n);
    if (!Number.isInteger(num) || num < 0) {
        throw new http_errors_1.BadRequest(errorMessage);
    }
    return num;
}
exports.parseNumberOrThrow = parseNumberOrThrow;
//# sourceMappingURL=parseNumberOrThrow.js.map