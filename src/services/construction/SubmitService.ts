import { AbstractService } from '../AbstractService';
import { rpcToLocalNode } from '../txWrapper/util'


interface resSubmit {
    blockHash: string,
    txHash: string,
}

export class SubmitService extends AbstractService {
    async fetchSubmit(tx: string, blockHash: string): Promise<resSubmit>{

        const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
        
        console.log(`Actual Tx Hash: ${actualTxHash}`);

            return{    
                blockHash: blockHash,
                txHash: actualTxHash,
                  }
        }
}