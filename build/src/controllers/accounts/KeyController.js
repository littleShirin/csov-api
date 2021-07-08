"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyController = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class KeyController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/account/key', new services_1.KeyService(csovApi, api));
        this.getKey = async (_req, res) => {
            KeyController.sanitizedSend(res, await this.service.fetchKey());
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.path, KeyController.catchWrap(this.getKey));
    }
}
exports.KeyController = KeyController;
//# sourceMappingURL=KeyController.js.map