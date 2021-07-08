"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkStatusService = void 0;
const Error_1 = require("../../types/responses/Error");
const AbstractService_1 = require("../AbstractService");
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
class NetworkStatusService extends AbstractService_1.AbstractService {
    async fetchNetwork() {
        try {
            const currBlock = await (this.api.rpc.chain.getBlock());
            //const testBlock = await(this.api.rpc.chain.getBlock('0x851149e0fed9dc3575ad9ef31f65cf662048a084d3b3f511318728afa437e06c'));
            const currBlockIndex = currBlock.block.header.number;
            const [currBlockHash, currBlockTime, genesisBlockHash] = await Promise.all([
                this.api.rpc.chain.getBlockHash(+currBlockIndex),
                this.api.query.timestamp.now(),
                this.api.rpc.chain.getBlockHash(0)
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
                current_block_identifier: {
                    index: currBlockIndex,
                    hash: currBlockHash.toString()
                },
                current_block_timestamp: Number(currBlockTime),
                genesis_block_identifier: {
                    index: 0,
                    hash: (genesisBlockHash).toString()
                },
                parent_block_identifier: {
                    index: +(currBlock.block.header.number.toNumber()) - 1,
                    hash: (currBlock.block.header.parentHash).toString()
                },
                transactions: transactionsInfo,
            };
        }
        catch (_a) {
            throw Error_1.unexpectedError;
        }
    }
}
exports.NetworkStatusService = NetworkStatusService;
//# sourceMappingURL=NetworkStatusService.js.map