"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseController = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class ParseController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/construction/parse', new services_1.ParseService(csovApi, api));
        this.getCombine = async ({ body: { transaction, signed } }, res) => {
            console.log();
            ParseController.sanitizedSend(res, await this.service.fetchParse(transaction, signed));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, ParseController.catchWrap(this.getCombine));
    }
}
exports.ParseController = ParseController;
//# sourceMappingURL=ParseController.js.map