import { AbstractService } from '../AbstractService';
import { unsignedResponse } from '../../types/responses/Unsigned';
import { unsigned_tx } from '../txWrapper';
import { encodeAddress, decodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util'; 


export class UnsignedService extends AbstractService {
    async fetchUnsigned(accountSender: string, accountReceiver: string, value: string): Promise<unsignedResponse>{

        const isValidAddress = (address: string) => {
            try {
               encodeAddress(isHex(address)? hexToU8a(address) : decodeAddress(address));
              return true;

            } catch (error) {
              return false;
            }
          };

          const checkSender = isValidAddress(accountSender); 
          const checkReceiver = isValidAddress(accountReceiver); 

          if(!checkSender){
            throw Error('Invalid Sender Address!')	
          }else if(!checkReceiver){
            throw Error('Invalid Receiver Address!')	
          }else if(!value || Number(value) < 0){
            throw Error("Value can't be negative or empty!")
          }else{
            const unsigned_resonse = await unsigned_tx(value, accountReceiver, accountSender); 
    
            return{
                unsigned_transaction: unsigned_resonse.unsignedTx, 
                unsigned: unsigned_resonse.unsigned,
            }

          }
      }
}