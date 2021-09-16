"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitController = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class SubmitController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/construction/submit', new services_1.SubmitService(csovApi, api));
        this.getCombine = async ({ body: { signed_transaction, blockHash } }, res) => {
            console.log();
            SubmitController.sanitizedSend(res, await this.service.fetchSubmit(signed_transaction, blockHash));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, SubmitController.catchWrap(this.getCombine));
    }
}
exports.SubmitController = SubmitController;
//# sourceMappingURL=SubmitController.js.map