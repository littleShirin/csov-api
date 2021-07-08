"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsignedController = void 0;
const UnsignedService_1 = require("../../services/construction/UnsignedService");
const AbstractController_1 = require("../AbstractController");
class UnsignedController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/construction/unsigned', new UnsignedService_1.UnsignedService(csovApi, api));
        this.getPayloads = async ({ body: { accountSender, accountReceiver, amount } }, res) => {
            //can we validate accountSender and account Receiver 
            //can we validate amount 
            // const accountSender = operations.map(el => el.accountSender)!
            // const accountReceiver = operations.map(el => el.accountReceiver)!
            // const value = operations.map(el => el.amount.value)!
            UnsignedController.sanitizedSend(res, await this.service.fetchUnsigned(accountSender, accountReceiver, amount));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, UnsignedController.catchWrap(this.getPayloads));
    }
}
exports.UnsignedController = UnsignedController;
//# sourceMappingURL=UnsignedController.js.map