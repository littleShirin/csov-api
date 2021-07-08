import { ApiPromise } from '@polkadot/api';
import { DeriveService } from '../../services';
import { DeriveRequest, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';


export class DeriveController extends AbstractController<DeriveService> {
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/construction/derive', 
		new DeriveService(csovApi, api));
		this.initRoutes();

	}


	protected initRoutes(): void {
		this.router.post(
			this.path,
			DeriveController.catchWrap(this.getAccountIdentifier)
		);
	}



	/**
	 * Get a block by its hash or number identifier.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private getAccountIdentifier: IPostRequestHandler<DeriveRequest> = async (
		{ body:{ mnemonic } },
		res
	): Promise<void> => {
		
		DeriveController.sanitizedSend(
			res,
			await this.service.fetchAccountIdentifier(mnemonic)
		);
	};
}