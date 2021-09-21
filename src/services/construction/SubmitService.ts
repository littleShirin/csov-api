import { AbstractService } from '../AbstractService';
import { BlockHash, Hash } from '@polkadot/types/interfaces';

interface resSubmit {
    onSubmitBlockHash: BlockHash,
    txHash: Hash,
}

export class SubmitService extends AbstractService {
    async fetchSubmit(tx: any): Promise<resSubmit>{

        const  [ blockHash, txHash ] = await Promise.all([
                this.api.rpc.chain.getBlockHash(),
                this.api.rpc.author.submitExtrinsic(tx)
                ]);

        //console.log('blockHash Submit service:',blockHash)
        //console.log(`Actual Tx Hash: ${txHash}`);

            return{    
                onSubmitBlockHash: blockHash,
                txHash: txHash,
                  }
        }
}