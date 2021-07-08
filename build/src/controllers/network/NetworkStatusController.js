"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkStatus = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class NetworkStatus extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/network/status', new services_1.NetworkStatusService(csovApi, api));
        /**
         * Submit a serialized transaction to the transaction queue.
         *
         * @param req Sidecar TxRequest
         * @param res Express Response
         */
        this.getNetworkStatus = async (_req, res) => {
            NetworkStatus.sanitizedSend(res, await this.service.fetchNetwork());
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.path, NetworkStatus.catchWrap(this.getNetworkStatus));
    }
}
exports.NetworkStatus = NetworkStatus;
//# sourceMappingURL=NetworkStatusController.js.map