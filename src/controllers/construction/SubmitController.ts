import { ApiPromise } from '@polkadot/api';
import { SubmitService } from '../../services';
import { SubmitRequest, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';




export class SubmitController extends AbstractController<SubmitService> {
	
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/construction/submit', 
		new SubmitService(csovApi, api));
		this.initRoutes();
	}
	

	
	protected initRoutes(): void {
		this.router.post(
			this.path,
			SubmitController.catchWrap(this.getCombine)
		);
	}




	private getCombine: IPostRequestHandler<SubmitRequest> = async (
		{ body:{signed_transaction} },
		res
	): Promise<void> => {
		console.log()
        SubmitController.sanitizedSend(
			res,
			await this.service.fetchSubmit(signed_transaction)
		);
	};
}