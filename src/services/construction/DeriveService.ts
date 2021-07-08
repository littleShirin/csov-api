import { AbstractService } from '../AbstractService';
import { resDerive } from '../../types/responses/Derive'
//import { encodeAddress } from '@polkadot/util-crypto/address'
import { Keyring } from '@polkadot/api';
import {BadRequest} from "http-errors";

export class DeriveService extends AbstractService {

    async fetchAccountIdentifier(mnemonic: string): Promise<resDerive>{
      const keyring = new Keyring();
      try{
        const user = keyring.addFromMnemonic(mnemonic,{ name: 'User' }, 'sr25519');
        return {
          address: user.address
        }
      }catch(error){
        throw new BadRequest('Invalid mnemonic, could not derive AccountIdentifier')
        }
      }
  }
