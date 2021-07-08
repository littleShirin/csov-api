import { DecoratedMeta } from '@polkadot/metadata/decorate/types';
import { Compact } from '@polkadot/types';
import { BlockHash, BlockNumber, Hash } from '@polkadot/types/interfaces';
import { AccountId } from '@polkadot/types/interfaces/runtime';
import { Codec } from '@polkadot/types/types';
import { CalcFee } from '@substrate/calc';

import { IExtrinsic, ISanitizedEvent } from '.';

export interface IBlock {
	number: Compact<BlockNumber>;
	hash: BlockHash;
	parentHash: Hash;
	stateRoot: Hash;
	extrinsicsRoot: Hash;
	authorId: AccountId | undefined;
	logs: ILog[];
	onInitialize: IOnInitializeOrFinalize;
	extrinsics: IExtrinsic[];
	onFinalize: IOnInitializeOrFinalize;
	finalized: boolean | undefined;
}


export interface resBlockTransaction{
		block_identifier:{
			index: number;
			hash: BlockHash;
		}
		parent_block_identifier:{
			index: number;
			hash: Hash;
		}
		current_block_timestamp: number; 
		transactions: any
}

export interface resBlock{
	block :{
			index: number,
			hash: BlockHash,
	}
}

export interface error {
	 	code: number;
        message: string; 
        retriable: boolean;
}

interface IOnInitializeOrFinalize {
	events: ISanitizedEvent[];
}

interface ILog {
	type: string;
	index: number;
	value: Codec;
}

export interface ICalcFee {
	calcFee?: null | CalcFee;
	specName: string | number;
	specVersion: string | number;
	decorated?: DecoratedMeta;
	runtimeDoesNotMatch?: boolean;
}
