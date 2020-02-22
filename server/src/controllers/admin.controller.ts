// import { createConfiguration } from '../../env.local';
import { Request } from 'express';
import { IClientConfig } from '../../../shared/api.schemas';
import { AppConfig } from '../app.config';
import { logIndexAccess } from '../models/AccessLog';
import { readFileAsObject } from '../utils/file';
import { Logger } from '../utils/logger';
import { AppCache } from '../models/AppCache';


export class AdminController {
  private appCache: AppCache;

  constructor() {
    this.appCache = new AppCache;
  }

  private readVersion(): Promise<string> {
    const cachekey = 'app-version';
    const cachedVersion = this.appCache.get(cachekey);

    if (typeof cachedVersion === 'string') {
      return Promise.resolve(cachedVersion);
    }

    return readFileAsObject(AppConfig.ROOT_PACKAGE_JSON_PATH)
      .then((packageObject: object) => {
        const version = packageObject['version'];

        if (!version) {
          throw new Error('Version not found in object');
        }

        this.appCache.set(cachekey, version);

        return version;
      });
  }

  private createConfig(version: string): IClientConfig {
    return {
      timestamp: new Date().toISOString(),
      version
    };
  }

  public createConfiguration(): Promise<void> {
    // return createConfiguration().then((c) => Logger.log(c));
    return Promise.resolve();
  }

  public initialize(req: Request): Promise<IClientConfig> {
    logIndexAccess(req);

    return this.readVersion()
      .catch((e) => {
        Logger.error('Read out of version has failed', e);
        return '';
      })
      .then((version: string): IClientConfig => this.createConfig(version));
  }
}
