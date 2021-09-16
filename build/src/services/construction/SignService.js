"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignService = void 0;
const AbstractService_1 = require("../AbstractService");
const sovereinchainExample_1 = require("../txWrapper/sovereinchainExample");
const util_crypto_1 = require("@polkadot/util-crypto");
class SignService extends AbstractService_1.AbstractService {
    async fetchSign(unsigned_tx, unsigned, mnemonic) {
        const isValidMnemonic = util_crypto_1.mnemonicValidate(mnemonic);
        if (!unsigned_tx) {
            throw Error('Missing unsigned_tx!');
        }
        else if (Object.keys(unsigned).length === 0) {
            throw Error("Missing 'unsigned object'!");
        }
        else if (isValidMnemonic === false) {
            throw Error("Invalid Mnemonic!");
        }
        else {
            const signed_transaction = (await sovereinchainExample_1.sign_tx(unsigned, unsigned_tx, mnemonic)).signedTx;
            const blockHash = (await sovereinchainExample_1.sign_tx(unsigned, unsigned_tx, mnemonic)).blockHash;
            return {
                signed_transaction,
                blockHash
            };
        }
    }
    ;
}
exports.SignService = SignService;
//# sourceMappingURL=SignService.js.map