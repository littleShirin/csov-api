import { ApiPromise } from '@polkadot/api';
import { IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';
import { AccountsBalanceService } from '../../services/accounts';
import { AccountBalanceRequest } from '../../types/requests';

export class AccountsBalanceController extends AbstractController<AccountsBalanceService>{
    constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/account/balance', 
		new AccountsBalanceService(csovApi,api));
		this.initRoutes();
	} 

    protected initRoutes(): void {
		this.router.post(
			this.path,
			AccountsBalanceController.catchWrap(this.getAccountBalance)
		);
	}
    /**
	 * Submit a serialized transaction to the transaction queue.
	 *
	 * @param req Sidecar TxRequest
	 * @param res Express Response
	 */
	private getAccountBalance: IPostRequestHandler<AccountBalanceRequest> = async (
		{ body: {addresses} },
		res
	): Promise<void> => {
		
		if(addresses.length < 1){
			throw Error('Addresses array must include at least one address!')	  
		}
		
		AccountsBalanceController.sanitizedSend(
			res,
			await this.service.fetchAccountBalance(addresses)
		);
	};
 }