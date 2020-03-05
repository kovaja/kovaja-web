
import * as express from 'express';

import { initRoutes, initStaticRoutes } from './routes/routes';
import { initalizeDatabase } from './database/database';
import { Logger } from './utils/logger';
import { promiseMapTo } from './utils/commons';

export function createApp(): Promise<express.Application> {
  const app = express();

  return initalizeDatabase()
    .then(() => Logger.log('Database connected'))
    .then(() => initRoutes(app))
    .then(() => initStaticRoutes(app))
    .then(() => Logger.log('Routes initialized'))
    .then(promiseMapTo(app));
}
