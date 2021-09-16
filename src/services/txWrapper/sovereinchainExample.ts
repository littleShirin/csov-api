/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @ignore Don't show this file in documentation.
 */

import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { TypeRegistry } from '@substrate/txwrapper-core'
import { construct, decode, deriveAddress, getRegistry, methods, UnsignedTransaction} from './index';
import { rpcToLocalNode, signWith } from './util';
import { getMetadata } from '../metadata';

//import { BalancesTransferArgs } from "@substrate/txwrapper-substrate/lib/methods/balances"


/**
 * Entry point of the script. This script assumes a SovereinChain node is running
 * locally on `http://localhost:9933`.
 */


const destBob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'; 
//const sendAlice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';



interface signedResponse {
	signedTx: string, 
	blockHash: string
}


interface unsignedResponse {
	unsigned: UnsignedTransaction, 
	unsignedTx: string, 
}


interface resMain {
	registry: TypeRegistry,
	signingPayload: string,
	signature: string,
	signedTx : string,
	unsigned: UnsignedTransaction, 
	decodedUnsigned: {},
	txInfo: {}, 
	senderAccount: string
}

 export async function main(value : string, dest: string, sender:string ): Promise<resMain> {

	// Wait for the promise to resolve async WASM
	await cryptoWaitReady();
	// Create a new keyring, and add an "Alice" account
	const keyring = new Keyring();
	
	// const senderSigner = keyring.addFromMnemonic('from body of request',{ name: 'Alice' }, 'sr25519');
	const alice = keyring.addFromUri('//Alice', { name: 'Alice' }, 'sr25519');
	console.log(
		"Alice's SS58-Encoded Address:",
		deriveAddress(alice.publicKey, 42) 
	);

	

	const aliceAccountId = deriveAddress(alice.publicKey, 42);
		console.log('aliceAccountId ----->>',aliceAccountId); 

	// To construct the tx, we need some up-to-date information from the node.
	// `txwrapper` is offline-only, so does not care how you retrieve this info.
	
	const { block } = await rpcToLocalNode('chain_getBlock');
	const blockHash = await rpcToLocalNode('chain_getBlockHash');
	const genesisHash = await rpcToLocalNode('chain_getBlockHash', [0]);
	const metadataRpc = await rpcToLocalNode('state_getMetadata');
	const accountNonce = await rpcToLocalNode('system_accountNextIndex',[sender]);
	const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
		'state_getRuntimeVersion'
	);
	console.log('block Hash:', blockHash);
 	console.log('accountNonce:',accountNonce);

	// Create SovereinChain type registry.
	const registry = getRegistry({
		chainName: 'SovereignChain',
		specName,
		specVersion,
		metadataRpc,
	});


	// Now we can create our `balances.transfer` unsigned tx. The following
	// function takes the above data as arguments, so can be performed offline
	// if desired.
	
	const unsigned: UnsignedTransaction  = methods.balances.transfer(
		{
			value: value,
			dest: dest, 
		},
		{
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
		},
		{
			metadataRpc,
			registry,
		}
	);

	// Decode an unsigned transaction.
	const decodedUnsigned = decode(unsigned, {
		metadataRpc,
		registry,
	});
    
	console.log(
		// Decoding the transfer amount
		`\n DecodedUnsigned Transaction\n  To: ${destBob}\n` + 
		`\n Amount: ${decodedUnsigned.method.args.value}`
	);

	// Construct the signing payload from an unsigned transaction.
	const signingPayload = construct.signingPayload(unsigned, { registry });
	console.log(`\nPayload to Sign: ${signingPayload}`);

	// Decode the information from a signing payload.
	const payloadInfo = decode(signingPayload, {
		metadataRpc,
		registry,
	});
	console.log(
		 // Decoded transaction of the transfer and providing the tx information
		`\nDecoded Transaction\n  To: ${destBob}\n` +
			`ADDRESS: ${payloadInfo.address}`
	);

	// Sign a payload. This operation should be performed on an offline device.
	const signature = signWith(alice, signingPayload, {
		metadataRpc,
		registry,
	});
	console.log(`\nSignature: ${signature}`);

	// Encode a signed transaction.
	const tx = construct.signedTx(unsigned, signature, {
		metadataRpc,
		registry,
	});
	console.log(` \nTransaction to Submit: ${tx}`);

	// Calculate the tx hash of the signed transaction offline.
	const expectedTxHash = construct.txHash(tx);
	console.log(`\nExpected Tx Hash: ${expectedTxHash}`);

	// Send the tx to the node. Since `txwrapper` is offline-only, this
	// operation should be handled externally. Here, we just send a JSONRPC
	// request directly to the node.
	// const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
	// console.log(`Actual Tx Hash: ${actualTxHash}`);

	// Decode a signed payload.
	const txInfo = decode(tx, {
		metadataRpc,
		registry,
	});
	console.log(
		// Decoded transaction of the transfer and providing the tx information
		`\nDecoded Transaction\n  To: ${destBob}\n` +
			`Amount: ${txInfo.method.args.value}\n`
	);
	return {
		registry: registry,
		signingPayload: signingPayload,
		signature: signature,
		signedTx : tx,
		unsigned: unsigned, 
		decodedUnsigned: decodedUnsigned,
		txInfo: txInfo,
		senderAccount: aliceAccountId, 

	}
}


export async function unsigned_tx(value : string, dest: string, sender:string ): Promise<unsignedResponse> {
	const { block } = await rpcToLocalNode('chain_getBlock');
	const blockHash = await rpcToLocalNode('chain_getBlockHash');
	const genesisHash = await rpcToLocalNode('chain_getBlockHash', [0]);
	const metadataRpc = await getMetadata();;
	const accountNonce = await rpcToLocalNode('system_accountNextIndex',[sender]);
	const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
		'state_getRuntimeVersion'
	);

	// Create SovereinChain type registry.
	const registry = getRegistry({
		chainName: 'SovereignChain',
		specName,
		specVersion,
		metadataRpc,
	});

	
	// Now we can create our `balances.transfer` unsigned tx. The following
	// function takes the above data as arguments, so can be performed offline
	// if desired.
	const unsigned: UnsignedTransaction  = methods.balances.transfer(
		{
			value: value,
			dest: dest, 
		},
		{
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
		},
		{
			metadataRpc,
			registry,
		}
	);
		// Construct the signing payload from an unsigned transaction.
	const signingPayload = construct.signingPayload(unsigned, { registry });
	// console.log(`\nPayload to Sign: ${signingPayload}`);

	return {
		unsigned: unsigned, 
		unsignedTx: signingPayload,

	}
}


export async function sign_tx(unsigned: UnsignedTransaction, unsigned_tx : string, mnemonic: string ): Promise<signedResponse> {

	// Wait for the promise to resolve async WASM
	await cryptoWaitReady();
	// Create a new keyring, and add an "Alice" account
	const keyring = new Keyring();
	
	const alice = keyring.addFromMnemonic(mnemonic,{ name: 'Alice' }, 'sr25519');
	
	const metadataRpc = await rpcToLocalNode('state_getMetadata');
	// const accountNonce = await rpcToLocalNode('system_accountNextIndex',[sender]);
	const { specVersion, specName } = await rpcToLocalNode(
		'state_getRuntimeVersion'
	);
	
	// Create SovereinChain type registry.
	const registry = getRegistry({
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
	const signature = signWith(alice, unsigned_tx, {
		metadataRpc,
		registry,
	});
	// Encode a signed transaction.
	const tx = construct.signedTx(unsigned, signature, {
		metadataRpc,
		registry,
	});
	// console.log(` \nTransaction to Submit: ${tx}`);

	const decodedSignedTx = decode(unsigned, {
		metadataRpc,
		registry,
	});

	console.log('decodedSignedTx', decodedSignedTx);
	// Calculate the tx hash of the signed transaction offline.
	// const expectedTxHash = construct.txHash(tx);
	// console.log(`\nExpected Tx Hash: ${expectedTxHash}`);


	// Calculate the tx hash of the signed transaction offline.
	// const expectedTxHash = construct.txHash(signature);
	// console.log(`\nExpected Tx Hash: ${expectedTxHash}`);
	return {
		signedTx: tx,
		blockHash: unsigned.blockHash

	}
}
