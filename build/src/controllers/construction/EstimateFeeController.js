"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimateFeeController = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class EstimateFeeController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/construction/estimateFee', new services_1.EstimateFeeService(csovApi, api));
        this.getCombine = async ({ body: { sender, receiver, amount } }, res) => {
            EstimateFeeController.sanitizedSend(res, await this.service.fetchTransactionFee(sender, receiver, amount));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, EstimateFeeController.catchWrap(this.getCombine));
    }
}
exports.EstimateFeeController = EstimateFeeController;
//# sourceMappingURL=EstimateFeeController.js.map