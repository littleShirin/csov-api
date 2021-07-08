import { AbstractService } from '../AbstractService';
import { Keyring } from '@polkadot/keyring'; 
import { mnemonicGenerate} from '@polkadot/util-crypto'; 


interface resKey {
    mnemonic: string,
    address: string
}

export class KeyService extends AbstractService {
    async fetchKey(): Promise<resKey>{

        class KeyRingInstance {
            type: "sr25519"; 
            ss58Format: number; 
            constructor(type: "sr25519", ss58Format: number = 0){
                this.type = type; 
                this.ss58Format = ss58Format ;
            }
          }

        let keys = () =>{

            //creating a new instance and make sure we are passing in a KeypairType imported from @polkadot/util-crypto/types and a number 
            const newKeyRingInstance = new KeyRingInstance('sr25519', 0); 
          

            const keyring = new Keyring({ type: newKeyRingInstance.type, ss58Format: newKeyRingInstance.ss58Format})
        
            // generate a mnemonic with default params (we can pass the number
            // of words required 12, 15, 18, 21 or 24, less than 12 words, while
            // valid, is not supported since it is more-easily crackable)
            const mnemonic: string = mnemonicGenerate(24);
        
            // create & add the pair to the keyring with the type and some additional metadata specified
            const pair = keyring.createFromUri(mnemonic, { name: 'first pair' }, 'sr25519');
        
            return { mnemonic, pair}
        
        }

            let {mnemonic, pair} = keys();

            if(!mnemonic){
                throw Error('Could not create mnemonic')
            }
            
            return{    
                    mnemonic: mnemonic,
                    address: pair.address
                  }
        }
}