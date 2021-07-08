"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockTransactionController = void 0;
const services_1 = require("../../services");
const AbstractController_1 = require("../AbstractController");
class BlockTransactionController extends AbstractController_1.default {
    constructor(csovApi, api) {
        super(csovApi, api, '/block/transaction', new services_1.BlockTransactionService(csovApi, api));
        /**
         * Get a block by its hash or number identifier.
         *
         * @param req Express Request
         * @param res Express Response
         */
        this.getBlockById = async ({ body: { block_identifier } }, res) => {
            BlockTransactionController.sanitizedSend(res, await this.service.fetchBlock(block_identifier.index, block_identifier.hash));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, BlockTransactionController.catchWrap(this.getBlockById));
    }
}
exports.BlockTransactionController = BlockTransactionController;
//# sourceMappingURL=BlockTransactionController.js.map