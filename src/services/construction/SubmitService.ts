import { AbstractService } from '../AbstractService';
import { rpcToLocalNode } from '../txWrapper/util'



interface resSubmit {
    transaction_hash: string,
}

export class SubmitService extends AbstractService {
    async fetchSubmit(tx: string): Promise<resSubmit>{

        const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
        console.log(`Actual Tx Hash: ${actualTxHash}`);

            return{    
                transaction_hash: actualTxHash
                  }
        }
}