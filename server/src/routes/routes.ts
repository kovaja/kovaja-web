import { Application, Router } from 'express';
import { GithubRoute } from './github.route';
import { PocketRoute } from './pocket.route';

export class Routes {
  public static initRoutes(app: Application): void {
    const router = Router();

    new GithubRoute(router);
    new PocketRoute(router);

    app.use('/api', router);
  }
}