"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsBalanceService = void 0;
const AbstractService_1 = require("../AbstractService");
const keyring_1 = require("@polkadot/keyring");
const util_1 = require("@polkadot/util");
class AccountsBalanceService extends AbstractService_1.AbstractService {
    async fetchAccountBalance(addresses) {
        const validAddress = [];
        const invalidAddress = [];
        const isValidAddress = (address) => {
            try {
                keyring_1.encodeAddress(util_1.isHex(address) ? util_1.hexToU8a(address) : keyring_1.decodeAddress(address));
                return true;
            }
            catch (error) {
                return false;
            }
        };
        for (const address of addresses) {
            const checkAddress = isValidAddress(address);
            (checkAddress) ? validAddress.push(address) : invalidAddress.push(address);
        }
        const balanceStore = {};
        for (const address of validAddress) {
            const balance = await (this.api.query.system.account(address));
            console.log('balance', balance);
            balanceStore[address] = balance.data.free.toString();
        }
        const currBlockHash = await (this.api.rpc.chain.getBlockHash());
        const currBlock = await (this.api.rpc.chain.getBlock(currBlockHash));
        return {
            block_identifier: {
                index: Number(currBlock.block.header.number),
                hash: currBlockHash,
            },
            balances: balanceStore,
            invalidAddresses: invalidAddress
        };
    }
}
exports.AccountsBalanceService = AccountsBalanceService;
//# sourceMappingURL=AccountsBalanceService.js.map