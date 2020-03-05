import { Request, Response, Router } from 'express';
import { PocketController } from '../controllers/pocket.controller';
import { Api } from '../utils/api';
import { IConfiguration } from '../database/configuration.schema';

export class PocketRoute {
  private controller: PocketController;

  constructor(router: Router, configuration: IConfiguration) {
    this.controller = new PocketController(configuration);

    const subRouter = Router();

    router.use('/pocket', subRouter);

    subRouter.get('/login', this.handleLogin.bind(this));
    subRouter.get('/redirect', this.handleRedirect.bind(this));
    subRouter.get('/articles', this.handleArticles.bind(this));
  }

  private handleLogin(req: Request, res: Response): void {
    this.controller.loginToPocket(res)
      .catch(Api.handleError(res));
  }

  private handleRedirect(req: Request, res: Response): void {
    this.controller.handlePocketCallback()
      .then(Api.handleResponse(res))
      .catch(Api.handleError(res));
  }

  private handleArticles(req: Request, res: Response): void {
    this.controller.getArticles()
      .then(Api.handleResponse(res))
      .catch(Api.handleError(res));
  }
}
