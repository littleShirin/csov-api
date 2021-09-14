import { ApiPromise } from '@polkadot/api';
import { TransactionFeeService } from '../../services';
import { TransactionFeeRequest, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';




export class TransactionFeeController extends AbstractController<TransactionFeeService> {
	
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/construction/transactionFee', 
		new TransactionFeeService(csovApi, api));
		this.initRoutes();
	}
	

	
	protected initRoutes(): void {
		this.router.post(
			this.path,
			TransactionFeeController.catchWrap(this.getCombine)
		);
	}




	private getCombine: IPostRequestHandler<TransactionFeeRequest> = async (
		{ body:{blockHash, txHash} },
		res
	): Promise<void> => {
		console.log()
        TransactionFeeController.sanitizedSend(
			res,
			await this.service.fetchTransactionFee(blockHash, txHash)
		);
	};
}