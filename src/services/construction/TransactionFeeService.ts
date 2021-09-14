import { AbstractService } from '../AbstractService';
import { BlockHash } from '@polkadot/types/interfaces';
import { u8aToHex } from '@polkadot/util';
import { blake2AsU8a } from '@polkadot/util-crypto';

interface resTransactionFee {
    partialFee: string, 
    weight: string
}


export class TransactionFeeService extends AbstractService {
    async fetchTransactionFee(blockHash: BlockHash, txHash: string): Promise<resTransactionFee>{
        
        

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
				const hash = u8aToHex(blake2AsU8a(extrinsic.toU8a(), 256));
               
				destSenderValueObj['dest'] = dest;
				destSenderValueObj['sender'] = sender; 
				destSenderValueObj['value'] = value; 
                destSenderValueObj['index'] = index;
					return {hash, destSenderValueObj};
				});
            
                transactionsInfo.shift();
                console.log('transactionsInfo', transactionsInfo)

                //find the  right extrinsic in block matching to txHash input value 
                const getTxHashMatch  = transactionsInfo.filter((tx => (tx.hash == txHash)));
                //index of tx inside of extrinsics 
                const txHashMatchIndex = getTxHashMatch[0].destSenderValueObj.index
                console.log('txHashMatchIndex', txHashMatchIndex);

                console.log('extrinsic:', JSON.stringify(currBlock.block.extrinsics[txHashMatchIndex].toHuman(), null, 2));

                //querry fee of extrinsic at matching index 
                const queryFeeDetails = 
                await this.api.rpc.payment
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
                  }
        }
}