import { ControllerConfig } from '../types/chains-config';

/**
 * Controllers that Sidecar will always default to. This will always be
 * the optimal controller selection for Polkadot and Kusama.
 */
export const defaultControllers: ControllerConfig = {
	controllers: {
		AccountsBalanceController: true,
		BlockTransactionController: true,
		SignController: true,
		DeriveController: true,
		SubmitController: true, 
		KeyController: true,
		UnsignedController: true,
		NetworkStatus: true,
		HistoricFeeController: true,
		EstimateFeeController: true,
	},
	options: {
		finalizes: true,
	},
};
