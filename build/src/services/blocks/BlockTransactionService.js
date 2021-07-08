"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockTransactionService = void 0;
//import { ApiPromise } from '@polkadot/api';
const AbstractService_1 = require("../AbstractService");
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
class BlockTransactionService extends AbstractService_1.AbstractService {
    async fetchBlock(inputBlockIndex, inputBlockHash) {
        if (inputBlockIndex) {
            const [blockHash] = await Promise.all([
                this.api.rpc.chain.getBlockHash(inputBlockIndex),
            ]);
            const [currBlock, timestamp] = await Promise.all([
                this.api.rpc.chain.getBlock(blockHash),
                this.api.query.timestamp.now(),
            ]);
            const extrinsicsArray = currBlock.block.extrinsics;
            const transactionsInfo = extrinsicsArray.map((extrinsic) => {
                const destSenderValueObj = {};
                const dest = extrinsic.method.toJSON().args.dest;
                const value = extrinsic.method.toJSON().args.value;
                const sender = extrinsic.signer.toJSON();
                const hash = util_1.u8aToHex(util_crypto_1.blake2AsU8a(extrinsic.toU8a(), 256));
                destSenderValueObj['dest'] = dest;
                destSenderValueObj['sender'] = sender;
                destSenderValueObj['value'] = value;
                return [hash, destSenderValueObj];
            });
            transactionsInfo.shift();
            return {
                block_identifier: {
                    index: inputBlockIndex,
                    hash: blockHash,
                },
                parent_block_identifier: {
                    index: (inputBlockIndex - 1),
                    hash: currBlock.block.header.parentHash,
                },
                current_block_timestamp: Number(timestamp),
                transactions: transactionsInfo,
            };
        }
        else if (inputBlockHash) {
            const [currBlock, timestamp] = await Promise.all([
                this.api.rpc.chain.getBlock(inputBlockHash),
                this.api.query.timestamp.now(),
            ]);
            const currBlockIndex = Number(currBlock.block.header.number);
            const extrinsicsArray = currBlock.block.extrinsics;
            const transactionsInfo = extrinsicsArray.map((extrinsic) => {
                const destSenderValueObj = {};
                const dest = extrinsic.method.toJSON().args.dest;
                const value = extrinsic.method.toJSON().args.value;
                const sender = extrinsic.signer.toJSON();
                const hash = util_1.u8aToHex(util_crypto_1.blake2AsU8a(extrinsic.toU8a(), 256));
                destSenderValueObj['dest'] = dest;
                destSenderValueObj['sender'] = sender;
                destSenderValueObj['value'] = value;
                return [hash, destSenderValueObj];
            });
            transactionsInfo.shift();
            return {
                block_identifier: {
                    index: currBlockIndex,
                    hash: inputBlockHash,
                },
                parent_block_identifier: {
                    index: (currBlockIndex - 1),
                    hash: currBlock.block.header.parentHash,
                },
                current_block_timestamp: Number(timestamp),
                transactions: transactionsInfo,
            };
        }
        else {
            return {
                code: 3004,
                message: "missing block_index or missing block_hash",
                retriable: false
            };
        }
    }
}
exports.BlockTransactionService = BlockTransactionService;
//# sourceMappingURL=BlockTransactionService.js.map