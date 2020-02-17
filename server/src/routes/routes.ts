import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { AppConfig } from '../app.config';
import { AdminRoute } from './admin.route';
import { GithubRoute } from './github.route';
import { PocketRoute } from './pocket.route';
import { SpotifyRoute } from './spotify.route';

const staticPath = path.resolve(__dirname, '../', AppConfig.CLIENT_BUILD_PATH);

function serveIndex(req: express.Request, res: express.Response): void {
  const indexPath = path.join(staticPath, 'index.html');

  res.sendFile(indexPath);
}

export function initRoutes(app: express.Application): void {
  app.use(bodyParser.json());

  const router = express.Router();

  new GithubRoute(router);
  new PocketRoute(router);
  new AdminRoute(router);
  new SpotifyRoute(router);

  app.use('/api', router);
}

export function initStaticRoutes(app: express.Application): void {
  app.use(express.static(staticPath));
  app.get('/*', serveIndex);
}
