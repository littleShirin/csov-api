import { ApiPromise } from '@polkadot/api';
import { BlockTransactionService } from '../../services';
import { BlockRequest, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';


export class BlockTransactionController extends AbstractController<BlockTransactionService> {
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/block/transaction', 
		new BlockTransactionService(csovApi, api));
		this.initRoutes();

	}


	protected initRoutes(): void {
		this.router.post(
			this.path,
			BlockTransactionController.catchWrap(this.getBlockById)
		);
	}



	/**
	 * Get a block by its hash or number identifier.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private getBlockById: IPostRequestHandler<BlockRequest> = async (
		{ body:{block_identifier } },
		res
	): Promise<void> => {
		


		BlockTransactionController.sanitizedSend(
			res,
			await this.service.fetchBlock( block_identifier.index, block_identifier.hash)
		);
	};
}