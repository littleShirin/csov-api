"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@polkadot/util");
const express = require("express");
const http_errors_1 = require("http-errors");
//import { sanitizeNumbers } from '../sanitize';
const errors_1 = require("../types/errors");
/**
 * Abstract base class for creating controller classes.
 */
class AbstractController {
    constructor(csovApi, api, _path, service) {
        this.csovApi = csovApi;
        this.api = api;
        this._path = _path;
        this.service = service;
        this._router = express.Router();
    }
    get path() {
        return this._path;
    }
    get router() {
        return this._router;
    }
    /**
     * Safely mount async GET routes by wrapping them with an express
     * handler friendly try / catch block and then mounting on the controllers
     * router.
     *
     * @param pathsAndHandlers array of tuples containing the suffix to the controller
     * base path (use empty string if no suffix) and the get request handler function.
     */
    safeMountAsyncGetHandlers(pathsAndHandlers) {
        for (const pathAndHandler of pathsAndHandlers) {
            const [pathSuffix, handler] = pathAndHandler;
            this.router.get(`${this.path}${pathSuffix}`, AbstractController.catchWrap(handler));
        }
    }
    /**
     * Create or retrieve the corresponding BlockHash for the given block identifier.
     * This also acts as a validation for string based block identifiers.
     *
     * @param blockId string representing a hash or number block identifier.
     */
    async getHashForBlock(blockId) {
        let blockNumber;
        try {
            const isHexStr = util_1.isHex(blockId);
            if (isHexStr && blockId.length === 66) {
                // This is a block hash
                return this.api.createType('BlockHash', blockId);
            }
            else if (isHexStr) {
                throw new http_errors_1.BadRequest(`Cannot get block hash for ${blockId}. ` +
                    `Hex string block IDs must be 32-bytes (66-characters) in length.`);
            }
            else if (blockId.slice(0, 2) === '0x') {
                throw new http_errors_1.BadRequest(`Cannot get block hash for ${blockId}. ` +
                    `Hex string block IDs must be a valid hex string ` +
                    `and must be 32-bytes (66-characters) in length.`);
            }
            // Not a block hash, must be a block height
            try {
                blockNumber = this.parseNumberOrThrow(blockId, 'Invalid block number');
            }
            catch (err) {
                throw new http_errors_1.BadRequest(`Cannot get block hash for ${blockId}. ` +
                    `Block IDs must be either 32-byte hex strings or non-negative decimal integers.`);
            }
            return await this.api.rpc.chain.getBlockHash(blockNumber);
        }
        catch (err) {
            if (err instanceof http_errors_1.HttpError) {
                // Throw errors we created in the above try block
                throw err;
            }
            const { number } = await this.api.rpc.chain
                .getHeader()
                .catch(() => {
                throw new http_errors_1.InternalServerError('Failed while trying to get the latest header.');
            });
            if (blockNumber && number.toNumber() < blockNumber) {
                throw new http_errors_1.BadRequest(`Specified block number is larger than the current largest block. ` +
                    `The largest known block number is ${number.toString()}.`);
            }
            // This should never be used, but here just in case
            if (errors_1.isBasicLegacyError(err)) {
                throw err;
            }
            throw new http_errors_1.InternalServerError(`Cannot get block hash for ${blockId}.`);
        }
    }
    parseNumberOrThrow(n, errorMessage) {
        const num = Number(n);
        if (!Number.isInteger(num) || num < 0) {
            throw new http_errors_1.BadRequest(errorMessage);
        }
        return num;
    }
    verifyAndCastOr(name, str, or) {
        if (!str) {
            return or;
        }
        if (!(typeof str === 'string')) {
            throw new http_errors_1.BadRequest(`Incorrect argument quantity or type passed in for ${name} query param`);
        }
        return this.parseNumberOrThrow(str, `${name} query param is an invalid number`);
    }
    /**
     * Get a BlockHash based on the `at` query param.
     *
     * @param at should be a block height, hash, or undefined from the `at` query param
     */
    async getHashFromAt(at) {
        return typeof at === 'string'
            ? await this.getHashForBlock(at)
            : await this.api.rpc.chain.getFinalizedHead();
    }
    /**
     * Sanitize the numbers within the response body and then send the response
     * body using the original Express Response object.
     *
     * @param res Response
     * @param body response body
     */
    static sanitizedSend(res, body) {
        //res.send(sanitizeNumbers(body));
        res.send(body);
    }
}
exports.default = AbstractController;
/**
 * Wrapper for any asynchronous RequestHandler function. Pipes errors
 * to downstream error handling middleware.
 *
 * @param cb ExpressHandler
 */
AbstractController.catchWrap = (cb) => async (req, res, next) => {
    try {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await cb(req, res, next);
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=AbstractController.js.map