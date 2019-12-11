import { Application, Router } from 'express';
import { GithubRoute } from './github.route';

export class Routes {
  public static initRoutes(app: Application): void {
    const router = Router();

    new GithubRoute(router);

    app.use('/api', router);
  }
}