"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.txErrorMiddleware = void 0;
const Log_1 = require("../../logging/Log");
const errors_1 = require("../../types/errors");
/**
 * Handle errors from transaction POST methods
 *
 * @param exception unknown
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
const txErrorMiddleware = (err, _req, res, next) => {
    if (res.headersSent || !errors_1.isTxLegacyError(err)) {
        return next(err);
    }
    const { error, data, cause, stack, transaction } = err;
    const info = {
        code: 500,
        error,
        data,
        transaction,
        cause,
        stack,
    };
    Log_1.Log.logger.error(Object.assign(Object.assign({}, info), { message: `${error}\n Cause: ${cause}\n Transaction: ${transaction}` }));
    res.status(500).send(info);
};
exports.txErrorMiddleware = txErrorMiddleware;
//# sourceMappingURL=txErrorMiddleware.js.map