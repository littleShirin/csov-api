
import { ApiPromise } from '@polkadot/api';
import { KeyService } from '../../services';
import AbstractController from '../AbstractController';
import { RequestHandler } from 'express';


export class KeyController extends AbstractController<KeyService> {
	constructor(csovApi: ApiPromise, api: ApiPromise) {
		super(csovApi, api, '/account/key', 
		new KeyService(csovApi, api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		
		this.router.get(
			this.path,
			KeyController.catchWrap(this.getKey)
		);
	}

	private getKey: RequestHandler= async (_req, res): Promise<void> => {
	
		KeyController.sanitizedSend(
			res,
			await this.service.fetchKey()
		);
	};
}
