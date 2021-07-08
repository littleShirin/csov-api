"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsignedService = void 0;
const AbstractService_1 = require("../AbstractService");
const txWrapper_1 = require("../txWrapper");
const keyring_1 = require("@polkadot/keyring");
const util_1 = require("@polkadot/util");
class UnsignedService extends AbstractService_1.AbstractService {
    async fetchUnsigned(accountSender, accountReceiver, value) {
        const isValidAddress = (address) => {
            try {
                keyring_1.encodeAddress(util_1.isHex(address) ? util_1.hexToU8a(address) : keyring_1.decodeAddress(address));
                return true;
            }
            catch (error) {
                return false;
            }
        };
        const checkSender = isValidAddress(accountSender);
        const checkReceiver = isValidAddress(accountReceiver);
        if (!checkSender) {
            throw Error('Invalid Sender Address!');
        }
        else if (!checkReceiver) {
            throw Error('Invalid Receiver Address!');
        }
        else if (!value || Number(value) < 0) {
            throw Error("Value can't be negative or empty!");
        }
        else {
            const unsigned_resonse = await txWrapper_1.unsigned_tx(value, accountReceiver, accountSender);
            return {
                unsigned_transaction: unsigned_resonse.unsignedTx,
                unsigned: unsigned_resonse.unsigned,
            };
        }
    }
}
exports.UnsignedService = UnsignedService;
//# sourceMappingURL=UnsignedService.js.map