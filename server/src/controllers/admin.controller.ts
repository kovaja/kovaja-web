// import { createConfiguration } from '../../env.local';
import { Logger } from '../utils/logger';
import { IClientConfig } from '../../../shared/api.schemas';
import { Request } from 'express';
import { logIndexAccess } from '../models/AccessLog';

export class AdminController {
  public createConfiguration(): Promise<void> {
    // return createConfiguration().then((c) => Logger.log(c));
    return Promise.resolve();
  }

  public initialize(req: Request): Promise<IClientConfig> {
    logIndexAccess(req);

    const config: IClientConfig = {
      timestamp: new Date().toISOString()
    };

    return Promise.resolve(config);
  }
}
