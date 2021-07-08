"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = exports.unexpectedError = void 0;
//unexpected error: 
exports.unexpectedError = {
    code: 12,
    message: "Invalid account format",
    description: "This error is returned when the requested AccountIdentifier is improperly formatted.",
    retriable: true,
    details: {
        address: "0x1dcc4de8dec75d7aab85b567b6",
        error: "not base64"
    }
};
exports.errors = [
    {
        "code": 1000,
        "message": "Invalid account format",
        "retriable": false,
    },
    {
        code: 2000,
        message: "network identifier is invalid",
        retriable: false
    },
    {
        code: 2001,
        message: "account identifier is invalid",
        retriable: false
    },
    {
        code: 2002,
        message: "address is invalid",
        retriable: false
    },
    {
        code: 2003,
        message: "account not found",
        retriable: false
    },
    {
        code: 2004,
        message: "contract address is invalid",
        retriable: false
    },
    {
        code: 3000,
        message: "block identifier is invalid",
        retriable: false
    },
    {
        code: 3001,
        message: "block index is invalid",
        retriable: false
    },
    {
        code: 3002,
        message: "block hash is invalid",
        retriable: false
    },
    {
        code: 3003,
        message: "block not found",
        retriable: false
    },
    {
        code: 3004,
        message: "missing blockhash and blockindex",
        retriable: false
    },
    {
        code: 4000,
        message: "transaction identifier is invalid",
        retriable: false
    },
    {
        code: 4001,
        message: "transaction hash is invalid",
        retriable: false
    },
    {
        code: 4002,
        message: "transaction not found",
        retriable: false
    },
    {
        code: 5001,
        message: "transaction deserialization error",
        retriable: false
    },
    {
        code: 5002,
        message: "transaction is already signed",
        retriable: false
    },
    {
        code: 5003,
        message: "no signature is passed in",
        retriable: false
    },
    {
        code: 5004,
        message: "one or more signatures are invalid",
        retriable: false
    },
    {
        code: 5005,
        message: "curve type is not supported",
        retriable: false
    },
    {
        code: 5006,
        message: "public key is invalid",
        retriable: false
    },
    {
        code: 5007,
        message: "transaction witness is invalid",
        retriable: false
    },
    {
        code: 5008,
        message: "transaction metadata is invalid",
        retriable: false
    },
    {
        code: 5010,
        message: "Unknown error.",
        retriable: false
    },
    {
        code: 5011,
        message: "The transaction already exists and cannot be sent repeatedly.",
        retriable: false
    },
    {
        code: 5012,
        message: "The memory pool is full and no more transactions can be sent.",
        retriable: true
    },
    {
        code: 5013,
        message: "The transaction cannot be verified.",
        retriable: false
    },
    {
        code: 5014,
        message: "The transaction is invalid.",
        retriable: false
    },
    {
        code: 5015,
        message: "One of the policy filters failed.",
        retriable: false
    },
    {
        code: 6000,
        message: "parse request body error",
        retriable: false
    },
    {
        code: 6001,
        message: "one or more params are invalid",
        retriable: false
    },
    {
        code: 6002,
        message: "engine faulted",
        retriable: false
    }
];
//# sourceMappingURL=Error.js.map