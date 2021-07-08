"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalErrorMiddleware = void 0;
const http_errors_1 = require("http-errors");
const Log_1 = require("../../logging/Log");
/**
 * The last backstop for errors that do not conform to one of Sidecars error
 * format. Used to create a standardized 500 error instead of relying on express.
 *
 * @param exception any
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
const internalErrorMiddleware = (exception, _req, res, next) => {
    // If express has started writing the response, we must default to the
    // built in express error handler in order to close the connection.
    if (res.headersSent) {
        return next(exception);
    }
    const message = new http_errors_1.InternalServerError('Internal Error');
    Log_1.Log.logger.error({ code: 500, message });
    res.status(500).send(message);
};
exports.internalErrorMiddleware = internalErrorMiddleware;
//# sourceMappingURL=internalErrorMiddleware.js.map