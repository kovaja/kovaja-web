import * as bodyParser from 'body-parser';
import { ServeStaticOptions } from 'serve-static';
import * as express from 'express';
import * as path from 'path';
import { AppConfig } from '../app.config';
import { AdminRoute } from './admin.route';
import { GithubRoute } from './github.route';
import { PocketRoute } from './pocket.route';
import { SpotifyRoute } from './spotify.route';
import { IConfiguration, Configuration } from '../database/configuration.schema';

const staticPath = path.resolve(__dirname, '../', AppConfig.CLIENT_BUILD_PATH);

function serveIndex(req: express.Request, res: express.Response): void {
  const indexPath = path.join(staticPath, 'index.html');

  res.sendFile(indexPath);
}

export async function initRoutes(app: express.Application): Promise<void> {
  app.use(bodyParser.json());

  const router = express.Router();

  const configuration: IConfiguration = await Configuration.read();

  new GithubRoute(router);
  new PocketRoute(router, configuration);
  new AdminRoute(router);
  new SpotifyRoute(router, configuration);

  app.use('/api', router);
}

export function initStaticRoutes(app: express.Application): void {
  const staticOptions: ServeStaticOptions = {
    cacheControl: true,
    maxAge: '1y'
  };

  app.use(express.static(staticPath, staticOptions));
  app.get('/*', serveIndex);
}
