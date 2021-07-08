"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleTransport = void 0;
const winston_1 = require("winston");
const SidecarConfig_1 = require("../../SidecarConfig");
const transformers_1 = require("../transformers");
const { config: { LOG }, } = SidecarConfig_1.SidecarConfig;
/**
 * Console transport for winston logger.
 */
function consoleTransport() {
    /**
     * A simple printing format for how `TransformableInfo` shows up.
     */
    const simplePrint = winston_1.format.printf((info) => {
        if (info === null || info === void 0 ? void 0 : info.stack) {
            // If there is a stack dump (e.g. error middleware), show that in console
            return `${info === null || info === void 0 ? void 0 : info.timestamp} ${info === null || info === void 0 ? void 0 : info.level}: ${info === null || info === void 0 ? void 0 : info.message} \n ${info === null || info === void 0 ? void 0 : info.stack}`;
        }
        return `${info === null || info === void 0 ? void 0 : info.timestamp} ${info === null || info === void 0 ? void 0 : info.level}: ${info === null || info === void 0 ? void 0 : info.message}`;
    });
    const transformers = [transformers_1.stripTimestamp(), transformers_1.nodeUtilFormat(), transformers_1.timeStamp];
    if (!LOG.JSON) {
        transformers.push(winston_1.format.colorize(), simplePrint);
    }
    else {
        transformers.push(winston_1.format.prettyPrint());
    }
    if (LOG.STRIP_ANSI) {
        transformers.unshift(transformers_1.stripAnsi());
    }
    if (LOG.FILTER_RPC) {
        transformers.unshift(transformers_1.filterApiRpc());
    }
    return new winston_1.transports.Console({
        level: LOG.LEVEL || 'info',
        handleExceptions: true,
        format: winston_1.format.combine(...transformers),
        // Silence using `jest --silent`
        silent: process.argv.indexOf('--silent') >= 0,
    });
}
exports.consoleTransport = consoleTransport;
//# sourceMappingURL=consoleTransport.js.map