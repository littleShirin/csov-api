"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFeeService = void 0;
const AbstractService_1 = require("../AbstractService");
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
class TransactionFeeService extends AbstractService_1.AbstractService {
    async fetchTransactionFee(blockHash, txHash) {
        const [currBlock] = await Promise.all([
            this.api.rpc.chain.getBlock(blockHash),
        ]);
        const extrinsicsArray = currBlock.block.extrinsics;
        const transactionsInfo = extrinsicsArray.map((extrinsic, index) => {
            const destSenderValueObj = {
                index: index
            };
            const dest = extrinsic.method.toJSON().args.dest;
            const value = extrinsic.method.toJSON().args.value;
            const sender = extrinsic.signer.toJSON();
            const hash = util_1.u8aToHex(util_crypto_1.blake2AsU8a(extrinsic.toU8a(), 256));
            destSenderValueObj['dest'] = dest;
            destSenderValueObj['sender'] = sender;
            destSenderValueObj['value'] = value;
            destSenderValueObj['index'] = index;
            return { hash, destSenderValueObj };
        });
        transactionsInfo.shift();
        console.log('transactionsInfo', transactionsInfo);
        //find the  right extrinsic in block matching to txHash input value 
        const getTxHashMatch = transactionsInfo.filter((tx => (tx.hash == txHash)));
        //index of tx inside of extrinsics 
        const txHashMatchIndex = getTxHashMatch[0].destSenderValueObj.index;
        console.log('txHashMatchIndex', txHashMatchIndex);
        console.log('extrinsic:', JSON.stringify(currBlock.block.extrinsics[txHashMatchIndex].toHuman(), null, 2));
        //querry fee of extrinsic at matching index 
        const queryFeeDetails = await this.api.rpc.payment
            .queryFeeDetails(currBlock.block.extrinsics[txHashMatchIndex]
            .toHex(), blockHash);
        console.log('queryFeeDetails:', JSON.stringify(queryFeeDetails.toHuman(), null, 2));
        const queryInfo = await this.api.rpc.payment
            .queryInfo(currBlock.block.extrinsics[txHashMatchIndex]
            .toHex(), blockHash);
        console.log('queryInfo:', JSON.stringify(queryInfo.toHuman(), null, 2));
        return {
            partialFee: queryInfo.partialFee.toHuman(),
            weight: queryInfo.weight.toHuman()
        };
    }
}
exports.TransactionFeeService = TransactionFeeService;
//# sourceMappingURL=TransactionFeeService.js.map