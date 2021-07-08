"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddressMiddleware = void 0;
const util_crypto_1 = require("@polkadot/util-crypto");
const util_crypto_2 = require("@polkadot/util-crypto");
const defaults_1 = require("@polkadot/util-crypto/address/defaults");
const http_errors_1 = require("http-errors");
/**
 * Express Middleware to validate that an `:address` param is properly formatted.
 */
const validateAddressMiddleware = (req, _res, next) => {
    if (!('address' in req.params)) {
        return next();
    }
    const [isValid, error] = checkAddress(req.params.address);
    if (!isValid && error) {
        return next(new http_errors_1.BadRequest(error));
    }
    return next();
};
exports.validateAddressMiddleware = validateAddressMiddleware;
/**
 * Verify that an address is a valid substrate ss58 address.
 *
 * Note: this is very similar '@polkadot/util-crypto/address/checkAddress,
 * except it does not check the prefix.
 *
 * @param address potential ss58 address
 */
function checkAddress(address) {
    let decoded;
    try {
        decoded = util_crypto_2.base58Decode(address);
    }
    catch (error) {
        return [false, error.message];
    }
    if (!defaults_1.defaults.allowedEncodedLengths.includes(decoded.length)) {
        return [false, 'Invalid decoded address length'];
    }
    const [isValid] = util_crypto_1.checkAddressChecksum(decoded);
    return [isValid, isValid ? undefined : 'Invalid decoded address checksum'];
}
//# sourceMappingURL=validateAddressMiddleware.js.map