import { types1 as crownSterlingDefinitions } from "./types/types";
import { RegistryTypes } from "@polkadot/types/types";
import { methods as substrateMethods } from '@substrate/txwrapper-substrate';
import {
	getRegistryBase,
	GetRegistryOptsCore,
	getSpecTypes,
	TypeRegistry,
  } from "@substrate/txwrapper-core";

// Export methods of pallets included in your chain's runtime.
// Note: you may also want to create methods for pallets specifc to your chain. In that case
// consult the CHAIN_BUILDER.md guide.
export const methods = {
	balances: substrateMethods.balances,
	utility: substrateMethods.utility,
	proxy: substrateMethods.proxy,
};

// Rexport all of txwrapper-core so users have access to utilities, construct functions,
// decode function, and types.
export * from '@substrate/txwrapper-core';

// Crown Sterling registry 

/**
 * `ChainProperties` for networks that txwrapper-cs supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
export const KNOWN_CHAIN_PROPERTIES = {
	SovereignChain: {
	  ss58Format: 0,
	  tokenDecimals: 12,
	  tokenSymbol: 'CSOV',
	}
  };
  
  // We override the `specName` property of `GetRegistryOptsCore` in order to get narrower type specificity,
// hopefully creating a better experience for users.
/**
 * Options for the `getRegistry` function.
 */
export interface GetRegistryOpts extends GetRegistryOptsCore {
	specName: keyof typeof KNOWN_CHAIN_PROPERTIES;
  }

  /**
 * Get a type registry for networks that txwrapper-cs supports.
 *
 * @param GetRegistryOptions specName, chainName, specVersion, and metadataRpc of the current runtime
 */
export function getRegistry({
	specName,
	chainName,
	specVersion,
	metadataRpc,
	properties,
  }: GetRegistryOpts): TypeRegistry {
	const registry = new TypeRegistry();
	registry.setKnownTypes({
	  types: (crownSterlingDefinitions as unknown) as RegistryTypes,
	});
  
	return getRegistryBase({
	  chainProperties: properties || KNOWN_CHAIN_PROPERTIES[specName],
	  specTypes: getSpecTypes(registry, chainName, specName, specVersion),
	  metadataRpc,
	});
  }

 

  export * from './sovereinchainExample';
  export * from './types/types';
  export * from './sovereinchainExample';
