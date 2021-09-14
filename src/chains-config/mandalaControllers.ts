import { ControllerConfig } from '../types/chains-config';

/**
 * Controllers for mandala, acala's test network.
 */
export const mandalaControllers: ControllerConfig = {
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
