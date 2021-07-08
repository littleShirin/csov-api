import { UnsignedTransaction } from "@substrate/txwrapper-core";

 

export interface unsignedResponse {
    unsigned_transaction: string, 
    unsigned: UnsignedTransaction
}

export interface resPayloads {
    unsigned_transaction: string, 
    payloads: [{
        addressSender: string, 
        addressReceiver: string, 
    }],
    unsigned: UnsignedTransaction
}