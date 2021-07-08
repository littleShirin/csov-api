"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specs = void 0;
const confmgr_1 = require("confmgr");
const sidecar_config_1 = require("./types/sidecar-config");
const APPEND_SPEC_ERROR = 'Must create SpecFactory first.';
/**
 * Access a singleton specification for config enviroment variables that will
 * be initialized on first use.
 */
class Specs {
    static create() {
        this._specs = new confmgr_1.SpecsFactory({ prefix: 'SAS' });
        this.appendLogSpecs();
        this.appendSubstrateSpecs();
        this.appendExpressSpecs();
        return this._specs;
    }
    /**
     * Configurable enviroment variable specifications.
     */
    static get specs() {
        var _a;
        return ((_a = this._specs) === null || _a === void 0 ? void 0 : _a.getSpecs()) || this.create().getSpecs();
    }
    /**
     * EXPRESS module of the enviroment variable configuration specification.
     */
    static appendExpressSpecs() {
        if (!this._specs) {
            throw APPEND_SPEC_ERROR;
        }
        // HOST
        this._specs.appendSpec(sidecar_config_1.MODULES.EXPRESS, this._specs.getSpec(sidecar_config_1.CONFIG.BIND_HOST, 'Network interface we bind to. You *MUST* use 0.0.0.0 if you are using Docker.', {
            default: '127.0.0.1',
            type: 'string',
        }));
        // PORT
        this._specs.appendSpec(sidecar_config_1.MODULES.EXPRESS, this._specs.getSpec(sidecar_config_1.CONFIG.PORT, 'Network interface we bind to. You *MUST* use 0.0.0.0 if you are using Docker.', {
            default: 8080,
            type: 'number',
            regexp: /^\d{2,6}$/,
        }));
    }
    /**
     * SUBSTRATE module of the enviroment variable configuration specification.
     */
    static appendSubstrateSpecs() {
        if (!this._specs) {
            throw APPEND_SPEC_ERROR;
        }
        // CSOV_WS
        //TODO UPDATE TO THE BOOT NODE FROM CROWN STERLING FOR DEFAULT
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.CSOV_WS_URL, 'CSOV Websocket URL', {
            default: 'ws://127.0.0.1:9944',
            mandatory: true,
            regexp: /^wss?:\/\/.*(:\d{4,5})?$/,
        }));
        // WS
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.WS_URL, 'Websocket URL', {
            default: 'ws://127.0.0.1:9944',
            mandatory: true,
            regexp: /^wss?:\/\/.*(:\d{4,5})?$/,
        }));
        // TYPES_BUNDLE
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.TYPES_BUNDLE, 'absolute path to file with `typesBundle` type definitions for @polkadot/api', {
            default: '',
            mandatory: false,
        }));
        // TYPES_CHAIN
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.TYPES_CHAIN, 'absolute path to file with `typesChain` type definitions for @polkadot/api', {
            default: '',
            mandatory: false,
        }));
        // TYPES_SPEC
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.TYPES_SPEC, 'absolute path to file with `typesSpec` type definitions for @polkadot/api', {
            default: '',
            mandatory: false,
        }));
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.TYPES, 'absolute path to file with `typesSpec` type definitions for @polkadot/api', {
            default: '',
            mandatory: false,
        }));
    }
    /**
     * LOG module of the enviroment variable configuration specification.
     */
    static appendLogSpecs() {
        if (!this._specs) {
            throw APPEND_SPEC_ERROR;
        }
        // LEVEL
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.LEVEL, 'Log level', {
            default: 'info',
            regexp: /^error|warn|info|http|verbose|debug|silly$/,
        }));
        // JSON
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.JSON, 'Whether or not to format logs as JSON', {
            default: 'false',
            type: 'boolean',
            regexp: /^true|false$/,
        }));
        // FILTER_RPC
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.FILTER_RPC, 'Wether or not filter out API-WS RPC logging', {
            default: 'false',
            type: 'boolean',
            regexp: /^true|false$/,
        }));
        // STRIP_ANSI
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.STRIP_ANSI, 'Whether or not to strip ANSI characters', {
            default: 'false',
            type: 'boolean',
            regexp: /^true|false$/,
        }));
    }
}
exports.Specs = Specs;
//# sourceMappingURL=Specs.js.map