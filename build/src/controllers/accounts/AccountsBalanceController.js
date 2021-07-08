"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsBalanceController = void 0;
const AbstractController_1 = require("../AbstractController");
const accounts_1 = require("../../services/accounts");
class AccountsBalanceController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/account/balance', new accounts_1.AccountsBalanceService(csovApi, api));
        /**
         * Submit a serialized transaction to the transaction queue.
         *
         * @param req Sidecar TxRequest
         * @param res Express Response
         */
        this.getAccountBalance = async ({ body: { addresses } }, res) => {
            if (addresses.length < 1) {
                throw Error('Addresses array must include at least one address!');
            }
            AccountsBalanceController.sanitizedSend(res, await this.service.fetchAccountBalance(addresses));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, AccountsBalanceController.catchWrap(this.getAccountBalance));
    }
}
exports.AccountsBalanceController = AccountsBalanceController;
//# sourceMappingURL=AccountsBalanceController.js.map