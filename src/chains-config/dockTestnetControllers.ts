import { ControllerConfig } from '../types/chains-config';

/**
 * Controllers for Dock's test network.
 */
export const dockTestnetControllers: ControllerConfig = {
	controllers: {
		AccountsBalanceController: true,
		BlockTransactionController: true,
		SignController: true,
		DeriveController: true,
		SubmitController: true, 
		KeyController: true,
		UnsignedController: true,
		NetworkStatus: true, 
	},
	options: {
		finalizes: true,
	},
};
