import { AbstractService } from '../AbstractService';
import { unsignedResponse } from '../../types/responses/Unsigned';
import { unsigned_tx } from '../txWrapper';
import { encodeAddress, decodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util'; 
//import { construct, getRegistry, methods, UnsignedTransaction} from '../txWrapper/index';

 interface  unsigned_txProps {
  block: any,
  blockHash: any,
  genesisHash: any,
  metadataRpc: any,
  accountNonce: any,
  specVersion: any,
  transactionVersion: any,
  specName: any
}

export class UnsignedService extends AbstractService {
    async fetchUnsigned(accountSender: string, accountReceiver: string, amount: string): Promise<unsignedResponse>{

   
      const block = await this.api.rpc.chain.getBlock();
      const blockHash = await this.api.rpc.chain.getBlockHash();
      const genesisHash = await this.api.rpc.chain.getBlockHash(0);
      const metadataRpc = await this.api.rpc.state.getMetadata();
      const accountNonce = await this.api.rpc.system.accountNextIndex(accountSender);
      const specVersion = await (await this.api.rpc.state.getRuntimeVersion()).specVersion;
      const transactionVersion = await (await this.api.rpc.state.getRuntimeVersion()).transactionVersion;
      const specName = await (await this.api.rpc.state.getRuntimeVersion()).specName;

      const unsigned_txProps:  unsigned_txProps = {
        block: block,
        blockHash: blockHash,
        genesisHash: genesisHash,
        metadataRpc: metadataRpc,
        accountNonce: accountNonce,
        specVersion: specVersion,
        transactionVersion: transactionVersion,
        specName: specName
      }
    
    // console.log('block:', block.toJSON());
    // console.log('blockHash:', blockHash.toJSON());
    // console.log('genesisHash:', genesisHash.toJSON());
    // console.log('metadataRpc:', metadataRpc.toJSON());
    // console.log('accountNonce:', accountNonce.toJSON());
    // console.log('specVersion:', specVersion.toJSON());
    // console.log('transactionVersion:', transactionVersion.toJSON());
    // console.log('specName:', specName.toJSON());


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
          }else if(!amount || Number(amount) < 0){
            throw Error("Value can't be negative or empty!")
          }else{
            
            const unsigned_res = await unsigned_tx(amount, accountReceiver, accountSender, unsigned_txProps); 

            
    
            return{
                unsigned_transaction: unsigned_res.unsignedTx, 
                unsigned: unsigned_res.unsigned,
            }

          }
      }
}