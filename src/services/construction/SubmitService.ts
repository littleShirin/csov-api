import { AbstractService } from '../AbstractService';


interface resSubmit {
    blockHash: any,
    txHash: any,
}

export class SubmitService extends AbstractService {
    async fetchSubmit(tx: any): Promise<resSubmit>{

        
        //const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);

        const  [ blockHash, actualTxHash ] = await Promise.all([
                this.api.rpc.chain.getBlockHash(),
                this.api.rpc.author.submitExtrinsic(tx)
                ])

               
        //console.log('blockHash Submit service:',blockHash)
        //console.log(`Actual Tx Hash: ${actualTxHash}`);

            return{    
                blockHash: blockHash,
                txHash: actualTxHash,
                  }
        }
}