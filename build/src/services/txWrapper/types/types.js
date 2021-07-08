"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeBundleForPolkadot = exports.types1 = void 0;
exports.types1 = {
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
};
exports.typeBundleForPolkadot = {
    types: [
        {
            minmax: [0, 1],
            types: exports.types1,
        }
    ],
};
//# sourceMappingURL=types.js.map