"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitService = void 0;
const AbstractService_1 = require("../AbstractService");
const util_1 = require("../txWrapper/util");
class SubmitService extends AbstractService_1.AbstractService {
    async fetchSubmit(tx, blockHash) {
        const actualTxHash = await util_1.rpcToLocalNode('author_submitExtrinsic', [tx]);
        console.log(`Actual Tx Hash: ${actualTxHash}`);
        return {
            blockHash: blockHash,
            txHash: actualTxHash,
        };
    }
}
exports.SubmitService = SubmitService;
//# sourceMappingURL=SubmitService.js.map