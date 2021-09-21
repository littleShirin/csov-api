"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitService = void 0;
const AbstractService_1 = require("../AbstractService");
class SubmitService extends AbstractService_1.AbstractService {
    async fetchSubmit(tx) {
        //const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
        const [blockHash, actualTxHash] = await Promise.all([
            this.api.rpc.chain.getBlockHash(),
            this.api.rpc.author.submitExtrinsic(tx)
        ]);
        //console.log('blockHash Submit service:',blockHash)
        //console.log(`Actual Tx Hash: ${actualTxHash}`);
        return {
            blockHash: blockHash,
            txHash: actualTxHash,
        };
    }
}
exports.SubmitService = SubmitService;
//# sourceMappingURL=SubmitService.js.map