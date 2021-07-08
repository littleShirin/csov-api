"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLoggerCreate = void 0;
const expressWinston = require("express-winston");
const httpLoggerCreate = (winstonInstance) => expressWinston.logger({
    // transports,
    winstonInstance,
    msg: `{{req.method}} {{req.url}} {{req.res.statusCode}} {{res.responseTime}}ms`,
    level: (_req, res) => {
        const { statusCode } = res;
        if (statusCode < 400) {
            // `http` is above `info`, so one needs to opt into `http` or above log level to view sub 400
            return 'http';
        }
        if (statusCode < 500) {
            return 'warn';
        }
        return 'error';
    },
});
exports.httpLoggerCreate = httpLoggerCreate;
//# sourceMappingURL=httpLogger.js.map