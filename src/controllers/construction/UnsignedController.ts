import { ApiPromise } from '@polkadot/api';
import { UnsignedService } from '../../services/construction/UnsignedService';
import { PayloadsRequestV2, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';


export class UnsignedController extends AbstractController< UnsignedService> {
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/construction/unsigned', 
		new  UnsignedService(csovApi, api));
		this.initRoutes();

	}


	protected initRoutes(): void {
		this.router.post(
			this.path,
			UnsignedController.catchWrap(this.getPayloads)
		);
	}

	private getPayloads: IPostRequestHandler<PayloadsRequestV2> = async (
		{ body:{accountSender,accountReceiver,amount} },
		res
	): Promise<void> => {
		//can we validate accountSender and account Receiver 
		//can we validate amount 
		// const accountSender = operations.map(el => el.accountSender)!
		// const accountReceiver = operations.map(el => el.accountReceiver)!
		// const value = operations.map(el => el.amount.value)!
		UnsignedController.sanitizedSend(
			res,
			await this.service.fetchUnsigned(accountSender,accountReceiver, amount)
		);
	};
}