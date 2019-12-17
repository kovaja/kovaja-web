import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { AppConfig } from '../app.config';
import { GithubRoute } from './github.route';
import { PocketRoute } from './pocket.route';
import { AdminRoute } from './admin.route';

function serveIndex(req: express.Request, res: express.Response): void {
  const indexPath = path.join(__dirname, AppConfig.CLIENT_BUILD_PATH, 'index.html');

  res.sendFile(indexPath);
}

export function initRoutes(app: express.Application): void {
  app.use(bodyParser.json());

  const router = express.Router();

  new GithubRoute(router);
  new PocketRoute(router);
  new AdminRoute(router);

  app.use('/api', router);
}

export function initStaticRoutes(app: express.Application): void {
  const staticPath = path.join(__dirname, AppConfig.CLIENT_BUILD_PATH);
  app.use(express.static(staticPath));
  app.get('/*', serveIndex);
}
