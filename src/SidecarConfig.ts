import { ConfigManager } from 'confmgr';

import { Specs } from './Specs';
import { CONFIG, ISidecarConfig, MODULES } from './types/sidecar-config';

function hr(): string {
	return Array(80).fill('━').join('');
}

/**
 * Access a singleton config object that will be intialized on first use.
 */
export class SidecarConfig {
	private static _config: ISidecarConfig | undefined;
	/**
	 * Gather env vars for config and make sure they are valid.
	 */
	private static create(): ISidecarConfig {
		// Instantiate ConfigManager which is used to read in the specs
		const config = ConfigManager.getInstance(Specs.specs).getConfig();

		if (!config.Validate()) {
			config.Print({ compact: false });
			console.log('Invalid config, we expect something like:');
			console.log(hr());
			console.log(config.GenEnv().join('\n'));
			console.log(hr());
			console.log(
				'You may copy the snippet above in a .env.foobar file, then use it with:'
			);
			console.log('    NODE_ENV=foobar yarn start\n');
			console.log('Invalid config, exiting...');
			process.exit(1);
		} else {
			config.Print({ compact: true });
		}

		this._config = {
			EXPRESS: {
				HOST: config.Get(MODULES.EXPRESS, CONFIG.BIND_HOST) as string,
				PORT: config.Get(MODULES.EXPRESS, CONFIG.PORT) as number,
			},
			SUBSTRATE: {
				CSOV_WS_URL: config.Get(MODULES.SUBSTRATE, CONFIG.CSOV_WS_URL) as string,
				WS_URL: config.Get(MODULES.SUBSTRATE, CONFIG.WS_URL) as string,
				TYPES_BUNDLE: config.Get(
					MODULES.SUBSTRATE,
					CONFIG.TYPES_BUNDLE
				) as string,
				TYPES_CHAIN: config.Get(
					MODULES.SUBSTRATE,
					CONFIG.TYPES_CHAIN
				) as string,
				TYPES_SPEC: config.Get(
					MODULES.SUBSTRATE,
					CONFIG.TYPES_SPEC
				) as string,
				TYPES: config.Get(MODULES.SUBSTRATE, CONFIG.TYPES) as string,
			},
			LOG: {
				LEVEL: config.Get(MODULES.LOG, CONFIG.LEVEL) as string,
				JSON: config.Get(MODULES.LOG, CONFIG.JSON) as boolean,
				FILTER_RPC: config.Get(
					MODULES.LOG,
					CONFIG.FILTER_RPC
				) as boolean,
				STRIP_ANSI: config.Get(
					MODULES.LOG,
					CONFIG.STRIP_ANSI
				) as boolean,
			},
		};

		return this._config;
	}

	/**
	 * Sidecar's configuaration.
	 */
	static get config(): ISidecarConfig {
		return this._config || this.create();
	}
}
