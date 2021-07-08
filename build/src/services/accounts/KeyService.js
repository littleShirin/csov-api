"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyService = void 0;
const AbstractService_1 = require("../AbstractService");
const keyring_1 = require("@polkadot/keyring");
const util_crypto_1 = require("@polkadot/util-crypto");
class KeyService extends AbstractService_1.AbstractService {
    async fetchKey() {
        class KeyRingInstance {
            constructor(type, ss58Format = 0) {
                this.type = type;
                this.ss58Format = ss58Format;
            }
        }
        let keys = () => {
            //creating a new instance and make sure we are passing in a KeypairType imported from @polkadot/util-crypto/types and a number 
            const newKeyRingInstance = new KeyRingInstance('sr25519', 0);
            const keyring = new keyring_1.Keyring({ type: newKeyRingInstance.type, ss58Format: newKeyRingInstance.ss58Format });
            // generate a mnemonic with default params (we can pass the number
            // of words required 12, 15, 18, 21 or 24, less than 12 words, while
            // valid, is not supported since it is more-easily crackable)
            const mnemonic = util_crypto_1.mnemonicGenerate(24);
            // create & add the pair to the keyring with the type and some additional metadata specified
            const pair = keyring.createFromUri(mnemonic, { name: 'first pair' }, 'sr25519');
            return { mnemonic, pair };
        };
        let { mnemonic, pair } = keys();
        if (!mnemonic) {
            throw Error('Could not create mnemonic');
        }
        return {
            mnemonic: mnemonic,
            address: pair.address
        };
    }
}
exports.KeyService = KeyService;
//# sourceMappingURL=KeyService.js.map