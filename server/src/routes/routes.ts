import { Application, Router } from 'express';
import { GithubRoute } from './github.route';
import { TestRoute } from './test.route';

export class Routes {
  public static initRoutes(app: Application): void {
    const router = Router();

    new GithubRoute(router);
    new TestRoute(router);

    app.use('/api', router);
  }
}