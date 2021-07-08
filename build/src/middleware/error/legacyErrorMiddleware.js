"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.legacyErrorMiddleware = void 0;
const HttpErrorConstructor = require("http-errors");
const http_errors_1 = require("http-errors");
const Log_1 = require("../../logging/Log");
const errors_1 = require("../../types/errors");
/**
 * Handle errors of an older format and prior to the introduction of http-error.
 *
 * @param err any
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
const legacyErrorMiddleware = (err, _req, res, next) => {
    if (res.headersSent || !errors_1.isBasicLegacyError(err)) {
        return next(err);
    }
    if (errors_1.isLegacyError(err)) {
        const info = {
            code: err.statusCode,
            message: HttpErrorConstructor(err.statusCode, err.error),
        };
        Log_1.Log.logger.error(info);
        res.status(err.statusCode).send(info.message);
        return;
    }
    res.status(500).send(new http_errors_1.InternalServerError(err.error));
};
exports.legacyErrorMiddleware = legacyErrorMiddleware;
//# sourceMappingURL=legacyErrorMiddleware.js.map