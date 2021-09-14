import { ControllerConfig } from '../types/chains-config';

export const kulupuControllers: ControllerConfig = {
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
		finalizes: false,
	},
};
