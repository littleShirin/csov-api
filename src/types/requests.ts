import { Metadata } from '@polkadot/metadata';
import { UnsignedTransaction } from '@substrate/txwrapper-core';
import { RequestHandler } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { BlockHash } from '@polkadot/types/interfaces';
 
/**
 * Body for RequestHandlerTx. In other words, the body of a POST route that sends an encoded transaction.
 */
export interface MetaData {
	metadata: {};
}

export interface StatusMetaData {
		  blockchain: string,
		  network: string,
		  sub_network_identifier: {
			network: string,
			metadata: {
			  producer: string
			}
		  }
		
}
export interface NetworkStatusRequest {
	network_identifier: StatusMetaData,
	metadata: Metadata,
}

export interface BlockRequest {

	block_identifier:{
		index: number,
		hash: BlockHash
	}
}

export interface AccountBalanceRequest {
	addresses: string[]
}

export interface DeriveRequest {
	mnemonic: string
}

export interface PreprocessRequest {
	network_identifier: StatusMetaData,
	operations: [{
		operation_identifier: {
			index: number
		},
		type: string,
		status: string,
		account: {
			address: string
		},
		amount: {
			value: string,
			currency: {
				symbol: string,
				decimals: number
			}
		}
	}, 
		{
		operation_identifier: {
			index: number
		},
		related_operations: [{
			index: number
		}],
		type: string,
		status: string,
		account: {
			address: string
		},
		amount: {
			value: string,
			currency: {
				symbol: string,
				decimals: number
			}
		}
	}]
}

  export interface MetadataRequest {
	  network_identifier: StatusMetaData,
	  options: {},
	  public_keys: [
		{
		  hex_bytes: string,
		  curve_type: string
		}
	  ]
  }

  export interface PayloadsRequest{
	operations: [{
		type: string,
	
		accountSender: {
			address: string
		},
		accountReceiver: {
			address: string
		},
		amount: {
			value: string,
			currency: {
				symbol: string,
				decimals: number
			}
		}
 	 }]
  }

  export interface PayloadsRequestV2 {
	accountSender: string,
	accountReceiver:  string,
	amount: string,
	
  }

  export interface CombineRequest{
	unsigned_transaction: string,
	payload: [
		{
			signing_payload: {
			  account_identifierSender: {
				address: string
			  },
			  account_identifierReceiver: {
				address: string
			  }
			},
			signature: string
		  }
	],
	unsigned: UnsignedTransaction
}

export interface CombineRequestV2{
	unsigned: UnsignedTransaction,
	unsigned_transaction: string,
	mnemonic: string,
}

export interface ParseRequest {
	network_identifier: StatusMetaData,
	signed: boolean,
	transaction: string
}

export interface HashRequest {
	network_identifier: StatusMetaData,
	"signed_transaction": string
}

export interface SubmitRequest {
	network_identifier: StatusMetaData,
	"signed_transaction": string
}


/**
 * Body for RequestHandlerTx. In other words, the body of a POST route that sends an encoded transaction.
 */
export interface ITx {
	tx: string;
}

/**
 * Post Request - assuming no url params
 */
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export type IPostRequestHandler<T> = RequestHandler<{}, any, T, Query>;

export interface INumberParam extends ParamsDictionary {
	number: string;
}

export interface IAddressParam extends ParamsDictionary {
	address: string;
}

export interface IAddressNumberParams extends IAddressParam {
	number: string;
}
