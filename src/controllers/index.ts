import {AccountsBalanceController, KeyController,} from './accounts';
import { BlockTransactionController } from './blocks';
import { NetworkStatus} from './network';

import {
	DeriveController, UnsignedController, SignController, SubmitController} from './construction';
/**
 * Object containing every controller class definition.
 */
export const controllers = {
	BlockTransactionController,
	AccountsBalanceController,
	SignController,
	DeriveController,
	KeyController,
	UnsignedController,
	SubmitController,
	NetworkStatus,
};
