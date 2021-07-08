import { Metadata } from '@polkadot/metadata';
import { TypeRegistry } from '@polkadot/types';
import { getSpecTypes } from '@polkadot/types-known';

/**
 * Create a type registry for Polkadot.
 * Useful for creating types in order to facilitate testing.
 */
export function createSovereignRegistry(specVersion: number, metadataRpc?: string): TypeRegistry {
	const registry = new TypeRegistry();

	registry.register(getSpecTypes(registry, 'SovereignChain', 'sovereign-chain', specVersion));
	registry.setChainProperties(
		registry.createType('ChainProperties', {
			ss58Format: 0,
			tokenDecimals: 10,
			tokenSymbol: 'CSOV',
		})
	);

	registry.setMetadata(new Metadata(registry, metadataRpc));

	return registry;
}

// /**
//  * sovereignChainRegistry
//  */
// export const sovereignChainRegistry = createSovereignRegistry();
