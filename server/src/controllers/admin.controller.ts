// import { createConfiguration } from '../../env.local';
import { Logger } from '../utils/logger';

export class AdminController {
  public createConfiguration(): Promise<void> {
    // return createConfiguration().then((c) => Logger.log(c));
    return Promise.resolve();
  }
}
