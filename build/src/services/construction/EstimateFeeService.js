"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimateFeeService = void 0;
const AbstractService_1 = require("../AbstractService");
class EstimateFeeService extends AbstractService_1.AbstractService {
    async fetchTransactionFee(sender, receiver, amount) {
        const info = await this.api.tx.balances
            .transfer(receiver, amount)
            .paymentInfo(sender);
        //   console.log(`
        //   class=${info.class.toString()},
        //   weight=${info.weight.toString()},
        //   partialFee=${info.partialFee.toHuman()}
        // `);
        return {
            partialFee: info.partialFee.toString(),
            weight: info.weight.toString()
        };
    }
}
exports.EstimateFeeService = EstimateFeeService;
//# sourceMappingURL=EstimateFeeService.js.map