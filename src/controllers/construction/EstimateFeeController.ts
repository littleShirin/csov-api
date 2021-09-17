import { ApiPromise } from '@polkadot/api';
import { EstimateFeeService } from '../../services';
import { EstimateFeeRequest, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';




export class EstimateFeeController extends AbstractController<EstimateFeeService> {
	
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/construction/estimateFee', 
		new EstimateFeeService(csovApi, api));
		this.initRoutes();
	}
	

	
	protected initRoutes(): void {
		this.router.post(
			this.path,
			EstimateFeeController.catchWrap(this.getCombine)
		);
	}




	private getCombine: IPostRequestHandler<EstimateFeeRequest> = async (
		{body:{sender, receiver, amount}},
		res
	): Promise<void> => {
	
        EstimateFeeController.sanitizedSend(
			res,
			await this.service.fetchTransactionFee(sender,receiver, amount)
		);
	};
}