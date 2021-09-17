"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricFeeController = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class HistoricFeeController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/construction/historicFee', new services_1.HistoricFeeService(csovApi, api));
        this.getCombine = async ({ body: { blockHash, txHash } }, res) => {
            console.log();
            HistoricFeeController.sanitizedSend(res, await this.service.fetchHistoricFee(blockHash, txHash));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, HistoricFeeController.catchWrap(this.getCombine));
    }
}
exports.HistoricFeeController = HistoricFeeController;
//# sourceMappingURL=HistoricFeeController.js.map