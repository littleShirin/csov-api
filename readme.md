
# Getting started 
---
1. [Configuration](#configuration)
2. [Start CSOV API](#start-scov-api)
3. [Usage of Endpoints](#usage-of-endpoint)
4. [Reporting Issues](#reporting-issues)

## Configuration 
---
Update the environment variables 
```bash
example: 
SAS_SUBSTRATE_TYPES=[path to sc-types]
SAS_SUBSTRATE_WS_URL=ws://127.0.0.1:9944
SAS_SUBSTRATE_CSOV_WS_URL=ws://127.0.0.1:9944
```

# Start CSOV API
---
## Using Docker
Runs the docker-compose file to spin up a new [csov-node](https://hub.docker.com/repository/docker/crownsterlingllc/csov-node/general) and [csov-api](https://hub.docker.com/repository/docker/crownsterlingllc/csov-api/general).
Refer to the csov-node repo for instructions on getting started.

## Using Yarn
Inside the root folder of the project use "yarn start" to trigger a new build and start the project. If the project starts successfully, the available endpoints will be located at [localhost:8080](http://localhost:8080/) in any desired browser.
**Note:  Fees per balance transfer are between 0.000125000000 - 0.000126000000**

# Usage of Endpoints 
---
### Available Endpoints:
- [/network/status ](#/network/status) (Get Network Status)
- [/block/transaction](#/block/transaction) (Get a Block Transaction)
- [/account/key](#/account/key) (Create a Mnemonic)
- [/account/balance](#/account/balance) (Get an Account's Balance)
- [/construction/derive](#/construction/derive) (Derive an AccountIdentifier from a Mnemonic)
- [/construction/unsigned](#/construction/unsigned) (Generate an Unsigned Transaction)
- [/construction/sign](#/construction/sign) (Sign a Unsigned Transaction)
- [/construction/estimateFee](#/construction/estimateFee) (Estimate a Transaction Fee)
- [/construction/historicFee](#/construction/historicFee) (Receive a historic Transaction Fee)
- [/construction/submit](#/construction/submit) (Submit a Signed Transaction)

### /network/status
This endpoint returns the current status of the network requested. It will return the block `height`, `hash`, `previous block`, transactions `sender/receiver address` and the `value` of the transaction. 
```bash
Output: 
{
  "current_block_identifier": {
    "index": 21653,
    "hash": "0xef90c0293b83da3ac098f0dcafda2b8a26deaa7660f134c31b400f3debd18af1"
  },
  "current_block_timestamp": 1625608938004,
  "genesis_block_identifier": {
    "index": 0,
    "hash": "0xbe8cd9fba4f455915eb5bcc86cee2f5a090dcbc44d1f91ef1bb85cdd9502a053"
  },
  "parent_block_identifier": {
    "index": 21652,
    "hash": "0xed716f924efff4a8991b360576d8a87b7f3b0daf25eced0cfffa075f0c07b0b2"
  },
  "transactions": [
    [
      "0x02890d983094bc2d03f8bf2bcbd4bdf230978b38e2c7cc072515953c3d5c8f1b",
      {
        "dest": {
          "id": "14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3"
        },
        "sender": {
          "id": "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5"
        },
        "value": 1000000000000
      }
    ]
  ]
}
```
### /block/transaction
Gets a specific block using a Block identifier, which can be a block index or hash. Similar to  `/network/status`, it will return an array of transactions including `hash`, `value` and `sender/receiver address`. 
### /account/key
This Endpoint returns a Mnemonic and an address. 
```bash
Output: 
{
  "mnemonic": "gallery pride ankle initial aunt type fly dress shop corn relief phrase",
  "address": "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5"
}
```
### /account/balance
Gets an `accounts balance` based on the current block and `account addresses`. Given an array of addresses in the request body, it will returen multiple account balances at once. This endpoint will validate the addresses and returns the current balances in the format: `[address]:[amount in CSOV]`.
```bash
Output: 
{
  "block_identifier": {
    "index": 21810,
    "hash": "0xc9eed7f9e9fc7faa31dff379502ae78001a8eca7c96be63d3ff1d04d84f76b4a"
  },
  "balances": {
    "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5": "1274914499981841250"
  },
  "invalidAddresses": [
    "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6"
  ]
}
```
### /construction/derive
Derive returns the `accountidentifier` associated with a `mnemonic` and validates the mnemonic.
### /construction/unsigned 
This endpoint returns an `unsigned transaction`. The request body needs a `sender & receiver address` and the `amount` of CSOV. The response object includes the `unsigned transaction string` and an `unsigned object`. The returned items will be used later on to sign the transaction and have to be `forwarded` to the /construction/sign endpoint. 
### /construction/sign
Signs an unsigned transaction. Using the previously generated `unsigned transaction` string, `unsigned object` and the senders `mnemonic`, it will return a `signed transaction` which can be submitted.

### /construction/estimateFee
Estimate a transaction fee using the arguments `sender address`, `receiver address` and `amount`. 
```bash
Output: 
{
  "partialFee": "125000141",
  "weight": "206909000"
}
```
### /construction/historicFee
Find the transaction fee using the arguments `blockHash` and `txHash`. 
```bash
Output: 
{
  "partialFee": "125000141",
  "weight": "206909000"
}
```

### /construction/submit
Submits a Signed Transaction to the node. On success, it will return a hash of the submitted transaction. 

### Reporting issues
Please email devops@crownsterling.io if there are any issues.