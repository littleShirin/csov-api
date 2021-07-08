"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignController = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class SignController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/construction/sign', new services_1.SignService(csovApi, api));
        this.getCombine = async ({ body: { unsigned_transaction, unsigned, mnemonic } }, res) => {
            console.log();
            SignController.sanitizedSend(res, await this.service.fetchSign(unsigned_transaction, unsigned, mnemonic));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, SignController.catchWrap(this.getCombine));
    }
}
exports.SignController = SignController;
//# sourceMappingURL=SignController.js.map