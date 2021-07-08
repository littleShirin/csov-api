import { Text } from '@polkadot/types';


//import { Moment } from '@polkadot/types/interfaces';


export interface INetworkResponse {
	network_identifiers: [
		{
			blockchain: Text,
			network: Text,
			sub_network: {
				network: Text,
				meta_data: any,
			}
			
		}
	]
}

export interface INetwork {
	blockchain: Text,
	network: Text,
	subNetwork: ISubNetwork,
}

export interface ISubNetwork {
	network: Text,
	metaData: any,
}

// export type Int = number & { __int__: void };
// export const roundToInt = (num: number): Int => Math.round(num) as Int;

export type BlockIdentifier = {
	index: any, 
	hash: string
}


export interface NetworkStatus {
		current_block_identifier : BlockIdentifier,
		current_block_timestamp : any, 
		genesis_block_identifier : BlockIdentifier,
		
		parent_block_identifier: BlockIdentifier,
		transactions: any
};


export interface NetworkOpt{
	version: {

	  rosetta_version: string,
	  node_version: string,
	  middleware_version: string,
	  metadata: {}
	},
	allow: {
	  operation_statuses: [
		{
		  status: string,
		  successful: boolean, 

		},
		{
			status: string,
			successful: boolean, 
		  }
	  ],
	  operation_types: string[],
	  errors:any,
	  historical_balance_lookup: boolean,
	}
  }
  

