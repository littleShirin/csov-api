"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultControllers = void 0;
/**
 * Controllers that Sidecar will always default to. This will always be
 * the optimal controller selection for Polkadot and Kusama.
 */
exports.defaultControllers = {
    controllers: {
        AccountsBalanceController: true,
        BlockTransactionController: true,
        SignController: true,
        DeriveController: true,
        SubmitController: true,
        KeyController: true,
        UnsignedController: true,
        NetworkStatus: true,
        TransactionFeeController: true,
    },
    options: {
        finalizes: true,
    },
};
//# sourceMappingURL=defaultControllers.js.map