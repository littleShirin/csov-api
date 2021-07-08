#!/usr/bin/env node
"use strict";
// Copyright 2017-2020 Parity Technologies (UK) Ltd.
// This file is part of Substrate API Sidecar.
//
// Substrate API Sidecar is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@polkadot/api");
const apps = require("@polkadot/apps-config/api");
const rpc_provider_1 = require("@polkadot/rpc-provider");
const express_1 = require("express");
const App_1 = require("./App");
const chains_config_1 = require("./chains-config");
const consoleOverride_1 = require("./logging/consoleOverride");
const Log_1 = require("./logging/Log");
const middleware = require("./middleware");
const SidecarConfig_1 = require("./SidecarConfig");
const { logger } = Log_1.Log;
const { config } = SidecarConfig_1.SidecarConfig;
async function main() {
    // Overide console.{log, error, warn, etc}
    consoleOverride_1.consoleOverride(logger);
    const { TYPES_BUNDLE, TYPES_SPEC, TYPES_CHAIN, TYPES } = config.SUBSTRATE;
    // Instantiate a web socket connection to the node and load types
    const csovApi = await api_1.ApiPromise.create({
        provider: new rpc_provider_1.WsProvider(config.SUBSTRATE.CSOV_WS_URL),
        /* eslint-disable @typescript-eslint/no-var-requires */
        typesBundle: TYPES_BUNDLE
            ? require(TYPES_BUNDLE)
            : apps.typesBundle,
        typesChain: TYPES_CHAIN
            ? require(TYPES_CHAIN)
            : apps.typesChain,
        typesSpec: TYPES_SPEC
            ? require(TYPES_SPEC)
            : undefined,
        types: TYPES ? require(TYPES) : undefined,
        /* eslint-enable @typescript-eslint/no-var-requires */
    });
    // Instantiate a web socket connection to the node and load types
    const api = await api_1.ApiPromise.create({
        provider: new rpc_provider_1.WsProvider(config.SUBSTRATE.WS_URL),
        /* eslint-disable @typescript-eslint/no-var-requires */
        typesBundle: TYPES_BUNDLE
            ? require(TYPES_BUNDLE)
            : apps.typesBundle,
        typesChain: TYPES_CHAIN
            ? require(TYPES_CHAIN)
            : apps.typesChain,
        typesSpec: TYPES_SPEC
            ? require(TYPES_SPEC)
            : undefined,
        types: TYPES ? require(TYPES) : undefined,
        /* eslint-enable @typescript-eslint/no-var-requires */
    });
    // Gather some basic details about the node so we can display a nice message
    const [chainName, { implName, specName }] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.state.getRuntimeVersion(),
    ]);
    startUpPrompt(
    // config.SUBSTRATE.CSOV_WS_URL,
    config.SUBSTRATE.WS_URL, chainName.toString(), implName.toString());
    // Create our App
    const app = new App_1.default({
        preMiddleware: [express_1.json(), middleware.httpLoggerCreate(logger)],
        controllers: chains_config_1.getControllersForSpec(csovApi, api, specName.toString()),
        postMiddleware: [
            middleware.txError,
            middleware.httpError,
            middleware.error,
            middleware.legacyError,
            middleware.internalError,
        ],
        port: config.EXPRESS.PORT,
        host: config.EXPRESS.HOST,
    });
    // Start the server
    app.listen();
}
process.on('SIGINT', function () {
    console.log('Caught interrupt signal, exiting...');
    process.exit(0);
});
main().catch(console.log);
/**
 * Prompt the user with some basic info about the node and the network they have
 * connected Sidecar to.
 * @param wsUrl websocket url of the node Sidecar is connected to
 * @param chainName chain name of the network Sidecar is connected to
 * @param implName implementation name of the node Sidecar is connected to
 */
function startUpPrompt(wsUrl, chainName, implName) {
    /**
     * Best effort list of known public nodes that do not encourage high traffic
     * sidecar installations connecting to them for non - testing / development purposes.
     */
    const publicWsUrls = [
        'wss://rpc.polkadot.io',
        'wss://cc1-1.polkadot.network',
        'wss://kusama-rpc.polkadot.io',
        'wss://cc3-5.kusama.network',
        'wss://fullnode.centrifuge.io',
        'wss://crab.darwinia.network',
        'wss://mainnet-node.dock.io',
        'wss://mainnet1.edgewa.re',
        'wss://rpc.kulupu.corepaper.org/ws',
        'wss://main1.nodleprotocol.io',
        'wss://rpc.plasmnet.io/',
        'wss://mainnet-rpc.stafi.io',
        'wss://rpc.subsocial.network',
    ];
    logger.info(`Connected to CSOV ${chainName} on the ${implName} client at ${config.SUBSTRATE.CSOV_WS_URL}`);
    logger.info(`Connected to chain ${chainName} on the ${implName} client at ${config.SUBSTRATE.WS_URL}`);
    const isPublicUrl = publicWsUrls.includes(wsUrl);
    if (isPublicUrl) {
        logger.info(`${wsUrl} is a public node. Too many users will overload this public endpoint. Switch to a privately hosted node when possible.`);
    }
    // Split the Url to check for 2 things. Secure connection, and if its a local IP.
    const splitUrl = wsUrl.split(':');
    // If its 'ws' its not a secure connection.
    const isSecure = splitUrl[0] === 'wss';
    // Check if its a local IP.
    const isLocal = splitUrl[1] === '//127.0.0.1' || splitUrl[1] === '//localhost';
    if (!isSecure && !isLocal) {
        logger.warn(`Using unencrypted connection to a public node (${wsUrl}); All traffic is sent over the internet in cleartext.`);
    }
}
//# sourceMappingURL=main.js.map