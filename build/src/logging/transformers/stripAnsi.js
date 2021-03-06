"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAnsi = void 0;
const winston_1 = require("winston");
/**
 * Regex pattern to match ANSI characters.
 */
const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
].join('|');
/**
 * RegExp for global matching ANSI characters.
 */
const ansiRegex = new RegExp(pattern, 'g');
/**
 * Strip ANSI characters from strings in simple, arbitrary data. N.B. this is not
 * hardened to work with any possible javascript type and is only meant for arrays,
 * basic objects and strings.
 *
 * @param data arbitrary data
 */
function stripAnsiShellCodes(data) {
    if (data === null || data === undefined) {
        return data;
    }
    if (typeof data === 'string') {
        return data.replace(ansiRegex, '');
    }
    if (Array.isArray(data)) {
        return data.map((val) => stripAnsiShellCodes(val));
    }
    if (typeof data === 'object' && data !== null) {
        const sanitizedData = {};
        for (const [k, v] of Object.entries(data)) {
            sanitizedData[k] = stripAnsiShellCodes(v);
        }
        return sanitizedData;
    }
    return data;
}
/**
 * Strip ANSI characters from `TransformableInfo.message`.
 */
exports.stripAnsi = winston_1.format((info, _opts) => {
    info.message = stripAnsiShellCodes(info.message);
    return info;
});
//# sourceMappingURL=stripAnsi.js.map