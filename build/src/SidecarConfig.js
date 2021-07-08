"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidecarConfig = void 0;
const confmgr_1 = require("confmgr");
const Specs_1 = require("./Specs");
const sidecar_config_1 = require("./types/sidecar-config");
function hr() {
    return Array(80).fill('━').join('');
}
/**
 * Access a singleton config object that will be intialized on first use.
 */
class SidecarConfig {
    /**
     * Gather env vars for config and make sure they are valid.
     */
    static create() {
        // Instantiate ConfigManager which is used to read in the specs
        const config = confmgr_1.ConfigManager.getInstance(Specs_1.Specs.specs).getConfig();
        if (!config.Validate()) {
            config.Print({ compact: false });
            console.log('Invalid config, we expect something like:');
            console.log(hr());
            console.log(config.GenEnv().join('\n'));
            console.log(hr());
            console.log('You may copy the snippet above in a .env.foobar file, then use it with:');
            console.log('    NODE_ENV=foobar yarn start\n');
            console.log('Invalid config, exiting...');
            process.exit(1);
        }
        else {
            config.Print({ compact: true });
        }
        this._config = {
            EXPRESS: {
                HOST: config.Get(sidecar_config_1.MODULES.EXPRESS, sidecar_config_1.CONFIG.BIND_HOST),
                PORT: config.Get(sidecar_config_1.MODULES.EXPRESS, sidecar_config_1.CONFIG.PORT),
            },
            SUBSTRATE: {
                CSOV_WS_URL: config.Get(sidecar_config_1.MODULES.SUBSTRATE, sidecar_config_1.CONFIG.CSOV_WS_URL),
                WS_URL: config.Get(sidecar_config_1.MODULES.SUBSTRATE, sidecar_config_1.CONFIG.WS_URL),
                TYPES_BUNDLE: config.Get(sidecar_config_1.MODULES.SUBSTRATE, sidecar_config_1.CONFIG.TYPES_BUNDLE),
                TYPES_CHAIN: config.Get(sidecar_config_1.MODULES.SUBSTRATE, sidecar_config_1.CONFIG.TYPES_CHAIN),
                TYPES_SPEC: config.Get(sidecar_config_1.MODULES.SUBSTRATE, sidecar_config_1.CONFIG.TYPES_SPEC),
                TYPES: config.Get(sidecar_config_1.MODULES.SUBSTRATE, sidecar_config_1.CONFIG.TYPES),
            },
            LOG: {
                LEVEL: config.Get(sidecar_config_1.MODULES.LOG, sidecar_config_1.CONFIG.LEVEL),
                JSON: config.Get(sidecar_config_1.MODULES.LOG, sidecar_config_1.CONFIG.JSON),
                FILTER_RPC: config.Get(sidecar_config_1.MODULES.LOG, sidecar_config_1.CONFIG.FILTER_RPC),
                STRIP_ANSI: config.Get(sidecar_config_1.MODULES.LOG, sidecar_config_1.CONFIG.STRIP_ANSI),
            },
        };
        return this._config;
    }
    /**
     * Sidecar's configuaration.
     */
    static get config() {
        return this._config || this.create();
    }
}
exports.SidecarConfig = SidecarConfig;
//# sourceMappingURL=SidecarConfig.js.map