import { Application, Router } from 'express';
import { TestRoute } from './test.route';

export class Routes {
  public static initRoutes(app: Application): void {
    const router = Router();

    new TestRoute(router);

    app.use('/api', router);
  }
}