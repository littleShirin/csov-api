import { BlockHash } from "@polkadot/types/interfaces";

export interface resMetadata{
    metadata: {
      recent_block_hash: BlockHash,
    },
    suggested_fee: [
      {
        value: number,
        currency: {
          symbol: string,
          decimals: number,
          metadata: {
            Issuer: string,
          }
        },
        metadata: {}
      }
    ]
  }