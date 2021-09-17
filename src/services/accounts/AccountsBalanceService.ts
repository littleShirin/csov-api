import { IAccountBalanceResponse } from 'src/types/responses/AccountBalance';
import { AbstractService } from '../AbstractService';
import { encodeAddress, decodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util'; 


export class AccountsBalanceService extends AbstractService {

    async fetchAccountBalance(addresses: string[]): Promise<IAccountBalanceResponse>{
       

        const validAddress = []; 
        const invalidAddress = []; 

            const isValidAddress = (address: string) => {
                try {
                   encodeAddress(isHex(address)? hexToU8a(address) : decodeAddress(address));
                  return true;

                } catch (error) {
                  return false;
                }
              };
  
              for (const address of addresses){
                  const checkAddress : boolean = isValidAddress(address); 
                  (checkAddress) ? validAddress.push(address) : invalidAddress.push(address); 
              }
           
 
            const balanceStore: Record<string, string> = {}; 

            //add blockHash and blockNumber? 
                for(const address of validAddress){
                    const balance = await (this.api.query.system.account(address))
                    console.log('balance', balance);
                     balanceStore[address] = balance.data.free.toString();  
                }
            
           
			const currBlockHash = await (this.api.rpc.chain.getBlockHash());
            const currBlock = await (this.api.rpc.chain.getBlock(currBlockHash));

            return { 
                block_identifier:{
                    index: Number(currBlock.block.header.number), 
                    hash: currBlockHash,
                }, 
                balances : balanceStore,
                invalidAddresses: invalidAddress
            }


    }
}
