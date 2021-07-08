
import { ApiPromise } from '@polkadot/api';
import { NetworkStatusService } from '../../services';
import AbstractController from '../AbstractController';
import { RequestHandler } from 'express';


export class NetworkStatus extends AbstractController<NetworkStatusService> {
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/network/status', 
		new NetworkStatusService(csovApi, api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		
		this.router.get(
			this.path,
			NetworkStatus.catchWrap(this.getNetworkStatus)
		);
	}

	
	/**
	 * Submit a serialized transaction to the transaction queue.
	 *
	 * @param req Sidecar TxRequest
	 * @param res Express Response
	 */


	private getNetworkStatus: RequestHandler= async (_req, res): Promise<void> => {
		
		NetworkStatus.sanitizedSend(
			res,
			await this.service.fetchNetwork()
		);
	};
}
