"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeriveService = void 0;
const AbstractService_1 = require("../AbstractService");
//import { encodeAddress } from '@polkadot/util-crypto/address'
const api_1 = require("@polkadot/api");
const http_errors_1 = require("http-errors");
class DeriveService extends AbstractService_1.AbstractService {
    async fetchAccountIdentifier(mnemonic) {
        const keyring = new api_1.Keyring();
        try {
            const user = keyring.addFromMnemonic(mnemonic, { name: 'User' }, 'sr25519');
            return {
                address: user.address
            };
        }
        catch (error) {
            throw new http_errors_1.BadRequest('Invalid mnemonic, could not derive AccountIdentifier');
        }
    }
}
exports.DeriveService = DeriveService;
//# sourceMappingURL=DeriveService.js.map