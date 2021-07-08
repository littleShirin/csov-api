import type {OverrideBundleDefinition,RegistryTypes} from "@polkadot/types/types";

export const types1 : RegistryTypes = {
      "Address": "MultiAddress",
      "LookupSource": "MultiAddress",
      "AccountInfo": {
        "nonce": "Index",
        "consumers": "RefCount",
        "providers": "RefCount",
        "data": "AccountData"
      },
      "Balance": "u128",
      "BalanceOf": "Balance",
      "Payment": {
        "account_id": "AccountId",
        "success_url": "Vec<u8>",
        "failure_url": "Vec<u8>",
        "paid": "bool",
        "pay_to": "AccountId"
      }
  }

  export const typeBundleForPolkadot: OverrideBundleDefinition = {
    types: [
      {
        minmax: [0, 1],
        types: types1,
      }
    ],
  };