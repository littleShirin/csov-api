import { AbstractService } from '../AbstractService';
import { resParse } from '../../types/responses/Parse';
import { rpcToLocalNode } from '../txWrapper/util';
import { getRegistry } from '../txWrapper/index';
import { decode } from '@substrate/txwrapper-core';
import { hexToU8a } from '@polkadot/util'
import { AnyJson } from '@polkadot/types/types';


export class ParseService extends AbstractService {
    async fetchParse(tx: string, signed: boolean): Promise<resParse>{

        const metadataRpc = await rpcToLocalNode('state_getMetadata');
        const { specVersion, specName } = await rpcToLocalNode('state_getRuntimeVersion');

        const registry = getRegistry({
            chainName: 'SovereignChain',
            specName,
            specVersion,
            metadataRpc,
        });
        
        //declare variables for if else cases and return those 
        let senderAddress: string = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'; 
        let txValue: AnyJson | null = 0;
        let signers: string[] = [''];
        let destAddress : any;
        let dest: any = ['null'];
        
        if(signed === true){
            //Decode a signed payload.
            //signers array should hold address of signer 
            const txAddress = registry.createType('Extrinsic', hexToU8a(tx), {
                isSigned: true,
            });

            senderAddress = txAddress.signer.toString();  

            const txInfo = decode(tx, {
                metadataRpc,
                registry,
	        });

            destAddress = txInfo.method.args.dest;
            txValue = txInfo.method.args.value;
            signers = [senderAddress]; 
            dest = Object.values(destAddress);
            //console.log('dest: -----> ',dest[0]); 
            
        }else{

           //Decode the information from a signing payload.
           //tx is here the signingPayload 

  	        const payloadInfo = decode(tx, {
                    metadataRpc,
                    registry,
            });

            destAddress = payloadInfo.method.args.dest;
            txValue = payloadInfo.method.args.value;
            signers = []; 
            dest = Object.values(destAddress);
            //console.log('decodedUnsigned TX args:', payloadInfo.method.args, 
            //'decodedUnsigned TX blockHash:', payloadInfo.method, 'options:', payloadInfo)
           
           
        }
        
      

        return{
            operations: [{
                    operation_identifier: {
                        index: 0
                    },
                    type:"TRANSFER",
                    status: "",
                    account: {
                        address: senderAddress,
                    },
                    amount: {
                        value: txValue?.toString(),
                        currency: {
                            symbol: "CSOV",
                            decimals: 10
                        }
                    }
                }, {
                    operation_identifier: {
                        index: 0
                    },
                    related_operations: [{
                        index: 1
                    }],
                    type: "TRANSFER",
                    status: "",
                    account: {
                        address: dest[0],
                    },
                    amount: {
                        value: txValue?.toString(),
                        currency: {
                            symbol: "CSOV",
                            decimals: 10
                        }
                    }
            }], 
            signers:  signers,
        }

      }
}