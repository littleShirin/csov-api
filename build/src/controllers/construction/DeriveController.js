"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeriveController = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class DeriveController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/construction/derive', new services_1.DeriveService(csovApi, api));
        /**
         * Get a block by its hash or number identifier.
         *
         * @param req Express Request
         * @param res Express Response
         */
        this.getAccountIdentifier = async ({ body: { mnemonic } }, res) => {
            DeriveController.sanitizedSend(res, await this.service.fetchAccountIdentifier(mnemonic));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, DeriveController.catchWrap(this.getAccountIdentifier));
    }
}
exports.DeriveController = DeriveController;
//# sourceMappingURL=DeriveController.js.map