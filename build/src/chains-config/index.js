"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControllersForSpec = void 0;
const controllers_1 = require("../controllers");
const defaultControllers_1 = require("./defaultControllers");
const dockMainnetControllers_1 = require("./dockMainnetControllers");
const dockTestnetControllers_1 = require("./dockTestnetControllers");
const kulupuControllers_1 = require("./kulupuControllers");
const mandalaControllers_1 = require("./mandalaControllers");
const specToControllerMap = {
    kulupu: kulupuControllers_1.kulupuControllers,
    mandala: mandalaControllers_1.mandalaControllers,
    'dock-testnet': dockTestnetControllers_1.dockTestnetControllers,
    'dock-main-runtime': dockMainnetControllers_1.dockMainnetControllers,
};
/**
 * Return an array of instantiated controller instances based off of a `specName`.
 *
 * @param api ApiPromise to inject into controllers
 * @param implName
 */
function getControllersForSpec(csovApi, api, specName) {
    if (specToControllerMap[specName]) {
        return getControllersFromConfig(csovApi, api, specToControllerMap[specName]);
    }
    // If we don't have the specName in the specToControllerMap we use the default
    // contoller config
    return getControllersFromConfig(csovApi, api, defaultControllers_1.defaultControllers);
}
exports.getControllersForSpec = getControllersForSpec;
/**
 * Return an array of instantiated controller instances based off of a
 * `ControllerConfig`.
 *
 * @param api ApiPromise to inject into controllers
 * @param config controller mount configuration object
 */
function getControllersFromConfig(csovApi, api, config) {
    // If we don't typecast here, tsc thinks its just [string, any][]
    const controllersToInclude = Object.entries(config.controllers);
    return controllersToInclude.reduce((acc, [controllerName, shouldMount]) => {
        if (shouldMount) {
            acc.push(new controllers_1.controllers[controllerName](csovApi, api));
            // acc.push(new controllers[controllerName]( csovApi, config.options));
        }
        return acc;
    }, []);
}
//# sourceMappingURL=index.js.map