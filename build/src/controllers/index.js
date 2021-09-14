"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const accounts_1 = require("./accounts");
const blocks_1 = require("./blocks");
const network_1 = require("./network");
const construction_1 = require("./construction");
/**
 * Object containing every controller class definition.
 */
exports.controllers = {
    BlockTransactionController: blocks_1.BlockTransactionController,
    AccountsBalanceController: accounts_1.AccountsBalanceController,
    SignController: construction_1.SignController,
    DeriveController: construction_1.DeriveController,
    KeyController: accounts_1.KeyController,
    UnsignedController: construction_1.UnsignedController,
    SubmitController: construction_1.SubmitController,
    NetworkStatus: network_1.NetworkStatus,
    TransactionFeeController: construction_1.TransactionFeeController
};
//# sourceMappingURL=index.js.map