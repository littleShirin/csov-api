"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpErrorMiddleware = void 0;
const http_errors_1 = require("http-errors");
const Log_1 = require("../../logging/Log");
/**
 * Handle HttpError instances.
 *
 * Should be put before middleware that handles Error, since HttpError
 * inherits from Error.
 *
 * @param exception unknown
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
const httpErrorMiddleware = (err, _req, res, next) => {
    if (res.headersSent || !(err instanceof http_errors_1.HttpError)) {
        return next(err);
    }
    const code = err.status;
    const info = {
        code,
        message: err.message,
        stack: err.stack,
    };
    Log_1.Log.logger.error(info);
    res.status(code).send(info);
};
exports.httpErrorMiddleware = httpErrorMiddleware;
//# sourceMappingURL=httpErrorMiddleware.js.map