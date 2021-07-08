
import { rpcToLocalNode } from './txWrapper/util';

export let metadataCSOV = '';
export let gotCalled = false; 


export async function getMetadata() {
    if(gotCalled === false){
        let metadataRpc = await rpcToLocalNode('state_getMetadata');
        gotCalled = true;
        metadataCSOV = metadataRpc; 
        return metadataCSOV; 
    }else{
        return metadataCSOV; 
    }
}
 




