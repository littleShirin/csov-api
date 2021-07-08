"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const Log_1 = require("../../logging/Log");
/**
 * Handle Error instances.
 *
 * @param err unknown
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
const errorMiddleware = (err, _req, res, next) => {
    var _a;
    if (res.headersSent || !(err instanceof Error)) {
        return next(err);
    }
    const info = {
        code: 500,
        message: (_a = err.message) !== null && _a !== void 0 ? _a : 'Internal Error',
        stack: err.stack,
    };
    Log_1.Log.logger.error(info);
    res.status(500).send(info);
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map