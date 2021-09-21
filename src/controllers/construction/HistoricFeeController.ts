import { ApiPromise } from '@polkadot/api';
import { HistoricFeeService } from '../../services';
import { HistoricFeeRequest, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';




export class HistoricFeeController extends AbstractController<HistoricFeeService> {
	
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/construction/historicFee', 
		new HistoricFeeService(csovApi, api));
		this.initRoutes();
	}
	

	
	protected initRoutes(): void {
		this.router.post(
			this.path,
			HistoricFeeController.catchWrap(this.getCombine)
		);
	}




	private getCombine: IPostRequestHandler<HistoricFeeRequest> = async (
		{ body:{blockHash, txHash} },
		res
	): Promise<void> => {
		
        HistoricFeeController.sanitizedSend(
			res,
			await this.service.fetchHistoricFee(blockHash, txHash)
		);
	};
}