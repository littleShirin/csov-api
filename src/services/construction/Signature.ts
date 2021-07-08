//goal is to seperate the signature part from Rosetta so we can mimic the caller's signer 
//we need the keypair to create a signature 
//create a new Keyring 
//create/add the keypair we need the mnemonic

import { Keyring } from '@polkadot/keyring';



export function setUpKey(){
        //init a new instant of a keyring class 
        const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });

        //adding a new pair to the keyring 
        const pair = keyring.addFromUri('infant salmon buzz patrol maple subject turtle cute legend song vital leisure', { name: 'first pair' }, 'sr25519');

        return pair;
}




