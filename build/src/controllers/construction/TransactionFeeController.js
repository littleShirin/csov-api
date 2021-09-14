"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFeeController = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class TransactionFeeController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/construction/transactionFee', new services_1.TransactionFeeService(csovApi, api));
        this.getCombine = async ({ body: { blockHash, txHash } }, res) => {
            console.log();
            TransactionFeeController.sanitizedSend(res, await this.service.fetchTransactionFee(blockHash, txHash));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, TransactionFeeController.catchWrap(this.getCombine));
    }
}
exports.TransactionFeeController = TransactionFeeController;
//# sourceMappingURL=TransactionFeeController.js.map