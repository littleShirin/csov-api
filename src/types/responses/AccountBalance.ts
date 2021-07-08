import { BlockHash } from "@polkadot/types/interfaces";


export interface IAccountBalanceResponse{
    block_identifier:{
        index: number, 
        hash: BlockHash,
    }, 
    balances:Record<string, string>, 
    invalidAddresses: string[]

}