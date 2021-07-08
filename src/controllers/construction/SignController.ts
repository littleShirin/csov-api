import { ApiPromise } from '@polkadot/api';
import { SignService } from '../../services';
import { CombineRequestV2, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';

export class SignController extends AbstractController<SignService> {
	
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/construction/sign', 
		new SignService(csovApi, api));
		this.initRoutes();
	}
	protected initRoutes(): void {
		this.router.post(
			this.path,
			SignController.catchWrap(this.getCombine)
		);
	}

	private getCombine: IPostRequestHandler<CombineRequestV2> = async (
		{ body: {unsigned_transaction, unsigned, mnemonic} },
		res
	): Promise<void> => {
		console.log()
        SignController.sanitizedSend(
			res,
			await this.service.fetchSign(unsigned_transaction, unsigned, mnemonic)
		);
	};
}