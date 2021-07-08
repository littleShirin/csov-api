import { AbstractService } from '../AbstractService';
import { resSign } from '../../types/responses/Sign';
import { sign_tx} from '../txWrapper/sovereinchainExample';
import { UnsignedTransaction } from '@substrate/txwrapper-core';
import { mnemonicValidate } from '@polkadot/util-crypto'

export class SignService extends AbstractService {
    async fetchSign( unsigned_tx: string, unsigned: UnsignedTransaction, mnemonic: string): Promise<resSign>{
    
      const isValidMnemonic = mnemonicValidate(mnemonic);

      if(!unsigned_tx){
        throw Error('Missing unsigned_tx!');
      }else if(Object.keys(unsigned).length === 0){
        throw Error("Missing 'unsigned object'!");
      }else if(isValidMnemonic === false){
        throw Error("Invalid Mnemonic!");
      }else{
        const signed_transaction = (await sign_tx(unsigned, unsigned_tx, mnemonic)).signedTx;
    
        return{
          signed_transaction,
        }
      }
  };

}


