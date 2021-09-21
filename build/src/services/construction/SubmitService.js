"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitService = void 0;
const AbstractService_1 = require("../AbstractService");
class SubmitService extends AbstractService_1.AbstractService {
    async fetchSubmit(tx) {
        const [blockHash, txHash] = await Promise.all([
            this.api.rpc.chain.getBlockHash(),
            this.api.rpc.author.submitExtrinsic(tx)
        ]);
        //console.log('blockHash Submit service:',blockHash)
        //console.log(`Actual Tx Hash: ${txHash}`);
        return {
            onSubmitBlockHash: blockHash,
            txHash: txHash,
        };
    }
}
exports.SubmitService = SubmitService;
//# sourceMappingURL=SubmitService.js.map