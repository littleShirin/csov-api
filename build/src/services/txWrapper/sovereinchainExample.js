"use strict";
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @ignore Don't show this file in documentation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign_tx = exports.unsigned_tx = exports.main = void 0;
const api_1 = require("@polkadot/api");
const util_crypto_1 = require("@polkadot/util-crypto");
const index_1 = require("./index");
const util_1 = require("./util");
//import { getMetadata } from '../metadata';
//import { BalancesTransferArgs } from "@substrate/txwrapper-substrate/lib/methods/balances"
/**
 * Entry point of the script. This script assumes a SovereinChain node is running
 * locally on `http://localhost:9933`.
 */
const destBob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
async function main(value, dest, sender) {
    // Wait for the promise to resolve async WASM
    await util_crypto_1.cryptoWaitReady();
    // Create a new keyring, and add an "Alice" account
    const keyring = new api_1.Keyring();
    // const senderSigner = keyring.addFromMnemonic('from body of request',{ name: 'Alice' }, 'sr25519');
    const alice = keyring.addFromUri('//Alice', { name: 'Alice' }, 'sr25519');
    console.log("Alice's SS58-Encoded Address:", index_1.deriveAddress(alice.publicKey, 42));
    const aliceAccountId = index_1.deriveAddress(alice.publicKey, 42);
    console.log('aliceAccountId ----->>', aliceAccountId);
    // To construct the tx, we need some up-to-date information from the node.
    // `txwrapper` is offline-only, so does not care how you retrieve this info.
    const { block } = await util_1.rpcToLocalNode('chain_getBlock');
    const blockHash = await util_1.rpcToLocalNode('chain_getBlockHash');
    const genesisHash = await util_1.rpcToLocalNode('chain_getBlockHash', [0]);
    const metadataRpc = await util_1.rpcToLocalNode('state_getMetadata');
    const accountNonce = await util_1.rpcToLocalNode('system_accountNextIndex', [sender]);
    const { specVersion, transactionVersion, specName } = await util_1.rpcToLocalNode('state_getRuntimeVersion');
    console.log('block Hash:', blockHash);
    console.log('accountNonce:', accountNonce);
    // Create SovereinChain type registry.
    const registry = index_1.getRegistry({
        chainName: 'SovereignChain',
        specName,
        specVersion,
        metadataRpc,
    });
    // Now we can create our `balances.transfer` unsigned tx. The following
    // function takes the above data as arguments, so can be performed offline
    // if desired.
    const unsigned = index_1.methods.balances.transfer({
        value: value,
        dest: dest,
    }, {
        // address: deriveAddress(alice.publicKey, 42), 
        address: sender,
        blockHash,
        blockNumber: registry
            .createType('BlockNumber', block.header.number)
            .toNumber(),
        eraPeriod: 64,
        genesisHash,
        metadataRpc,
        nonce: accountNonce,
        specVersion,
        tip: 0,
        transactionVersion,
    }, {
        metadataRpc,
        registry,
    });
    // Decode an unsigned transaction.
    const decodedUnsigned = index_1.decode(unsigned, {
        metadataRpc,
        registry,
    });
    console.log(
    // Decoding the transfer amount
    `\n DecodedUnsigned Transaction\n  To: ${destBob}\n` +
        `\n Amount: ${decodedUnsigned.method.args.value}`);
    // Construct the signing payload from an unsigned transaction.
    const signingPayload = index_1.construct.signingPayload(unsigned, { registry });
    console.log(`\nPayload to Sign: ${signingPayload}`);
    // Decode the information from a signing payload.
    const payloadInfo = index_1.decode(signingPayload, {
        metadataRpc,
        registry,
    });
    console.log(
    // Decoded transaction of the transfer and providing the tx information
    `\nDecoded Transaction\n  To: ${destBob}\n` +
        `ADDRESS: ${payloadInfo.address}`);
    // Sign a payload. This operation should be performed on an offline device.
    const signature = util_1.signWith(alice, signingPayload, {
        metadataRpc,
        registry,
    });
    console.log(`\nSignature: ${signature}`);
    // Encode a signed transaction.
    const tx = index_1.construct.signedTx(unsigned, signature, {
        metadataRpc,
        registry,
    });
    console.log(` \nTransaction to Submit: ${tx}`);
    // Calculate the tx hash of the signed transaction offline.
    const expectedTxHash = index_1.construct.txHash(tx);
    console.log(`\nExpected Tx Hash: ${expectedTxHash}`);
    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    // const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
    // console.log(`Actual Tx Hash: ${actualTxHash}`);
    // Decode a signed payload.
    const txInfo = index_1.decode(tx, {
        metadataRpc,
        registry,
    });
    console.log(
    // Decoded transaction of the transfer and providing the tx information
    `\nDecoded Transaction\n  To: ${destBob}\n` +
        `Amount: ${txInfo.method.args.value}\n`);
    return {
        registry: registry,
        signingPayload: signingPayload,
        signature: signature,
        signedTx: tx,
        unsigned: unsigned,
        decodedUnsigned: decodedUnsigned,
        txInfo: txInfo,
        senderAccount: aliceAccountId,
    };
}
exports.main = main;
async function unsigned_tx(amount, dest, sender, unsigned_txProps) {
    // const { block } = await rpcToLocalNode('chain_getBlock');
    // const blockHash = await rpcToLocalNode('chain_getBlockHash');
    // const genesisHash = await rpcToLocalNode('chain_getBlockHash', [0]);
    // const metadataRpc = await getMetadata();;
    // const accountNonce = await rpcToLocalNode('system_accountNextIndex',[sender]);
    // const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
    // 	'state_getRuntimeVersion'
    // );
    // Create SovereinChain type registry.
    const registry = index_1.getRegistry({
        chainName: 'SovereignChain',
        specName: unsigned_txProps.specName,
        specVersion: unsigned_txProps.specVersion,
        metadataRpc: unsigned_txProps.metadataRpc,
    });
    // Now we can create our `balances.transfer` unsigned tx. The following
    // function takes the above data as arguments, so can be performed offline
    // if desired.
    const unsigned = index_1.methods.balances.transfer({
        value: amount,
        dest: dest,
    }, {
        // address: deriveAddress(alice.publicKey, 42), 
        address: sender,
        blockHash: unsigned_txProps.blockHash,
        blockNumber: registry
            .createType('BlockNumber', unsigned_txProps.block.block.header.number)
            .toNumber(),
        eraPeriod: 64,
        genesisHash: unsigned_txProps.genesisHash,
        metadataRpc: unsigned_txProps.metadataRpc,
        nonce: unsigned_txProps.accountNonce,
        specVersion: unsigned_txProps.specVersion,
        tip: 0,
        transactionVersion: unsigned_txProps.transactionVersion,
    }, {
        metadataRpc: unsigned_txProps.metadataRpc,
        registry,
    });
    // Construct the signing payload from an unsigned transaction.
    const signingPayload = index_1.construct.signingPayload(unsigned, { registry });
    // console.log(`\nPayload to Sign: ${signingPayload}`);
    //console.log('block hash unsigned TX:', unsigned.blockHash.toString()); 
    return {
        unsigned: unsigned,
        unsignedTx: signingPayload,
    };
}
exports.unsigned_tx = unsigned_tx;
async function sign_tx(unsigned, unsigned_tx, mnemonic, metadataRpc, specName, specVersion) {
    // Wait for the promise to resolve async WASM
    await util_crypto_1.cryptoWaitReady();
    // Create a new keyring, and add an "Alice" account
    const keyring = new api_1.Keyring();
    const alice = keyring.addFromMnemonic(mnemonic, { name: 'Alice' }, 'sr25519');
    // const metadataRpc = await rpcToLocalNode('state_getMetadata');
    // const accountNonce = await rpcToLocalNode('system_accountNextIndex',[sender]);
    // const { specVersion, specName } = await rpcToLocalNode(
    // 	'state_getRuntimeVersion'
    // );
    // Create SovereinChain type registry.
    const registry = index_1.getRegistry({
        chainName: 'SovereignChain',
        specName,
        specVersion,
        metadataRpc,
    });
    // const payloadInfo = decode(unsigned, {
    // 	metadataRpc,
    // 	registry,
    // });
    // Sign a payload. This operation should be performed on an offline device.
    const signature = util_1.signWith(alice, unsigned_tx, {
        metadataRpc,
        registry,
    });
    // Encode a signed transaction.
    const tx = index_1.construct.signedTx(unsigned, signature, {
        metadataRpc,
        registry,
    });
    // const txInfo = decode(tx, {
    // 	metadataRpc,
    // 	registry,
    // });
    //console.log('TX Info from tx  Hash:', txInfo.method.args);
    //console.log('block hash unsignedTX ', unsigned.blockHash.toString()); 
    // console.log(` \nTransaction to Submit: ${tx}`);
    // const decodedSignedTx = decode(unsigned, {
    // 	metadataRpc,
    // 	registry,
    // });
    // const decodedSignedTx = decode(tx, {
    // 	metadataRpc,
    // 	registry,
    // });
    //console.log('decodedSignedTx', decodedSignedTx);
    // Calculate the tx hash of the signed transaction offline.
    // const expectedTxHash = construct.txHash(tx);
    // console.log(`\nExpected Tx Hash: ${expectedTxHash}`);
    // Calculate the tx hash of the signed transaction offline.
    // const expectedTxHash = construct.txHash(signature);
    // console.log(`\nExpected Tx Hash: ${expectedTxHash}`);
    return {
        signedTx: tx,
        blockHash: unsigned.blockHash.toString()
    };
}
exports.sign_tx = sign_tx;
//# sourceMappingURL=sovereinchainExample.js.map