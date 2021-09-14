import { ControllerConfig } from '../types/chains-config';

/**
 * Controllers for Dock's mainnet.
 */
export const dockMainnetControllers: ControllerConfig = {
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
