import { AbstractService } from '../AbstractService';
// import { BlockHash } from '@polkadot/types/interfaces';
// import { u8aToHex } from '@polkadot/util';
// import { blake2AsU8a } from '@polkadot/util-crypto';

interface resEstimateFee {
    partialFee: string,
    weight: string
}


export class EstimateFeeService extends AbstractService {
    async fetchTransactionFee(sender: string, receiver: string, amount: string ): Promise<resEstimateFee>{
        
    
        const info = await this.api.tx.balances
        .transfer(receiver, amount)
        .paymentInfo(sender);
     
      //   console.log(`
      //   class=${info.class.toString()},
      //   weight=${info.weight.toString()},
      //   partialFee=${info.partialFee.toHuman()}
      // `);

            return {    
                    partialFee: info.partialFee.toString(),
                    weight: info.weight.toString()
                  }
        }
}