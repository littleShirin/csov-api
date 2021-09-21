import { ApiPromise } from '@polkadot/api';
import { ParseService } from '../../services';
import { ParseRequest, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';




export class ParseController extends AbstractController<ParseService> {
	
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/construction/parse', 
		new ParseService(csovApi, api));
		this.initRoutes();
	}
	

	
	protected initRoutes(): void {
		this.router.post(
			this.path,
			ParseController.catchWrap(this.getCombine)
		);
	}




	private getCombine: IPostRequestHandler<ParseRequest> = async (
		{ body:{transaction, signed} },
		res
	): Promise<void> => {
		
        ParseController.sanitizedSend(
			res,
			await this.service.fetchParse(transaction, signed)
		);
	};
}