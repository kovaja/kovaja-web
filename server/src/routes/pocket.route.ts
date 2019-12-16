import { Request, Response, Router } from 'express';
import { PocketController } from '../controllers/pocket.controller';
import { ApiUtility } from '../utilities/api.utility';

export class PocketRoute {
  private controller: PocketController;

  constructor(router: Router) {
    this.controller = new PocketController();

    const subRouter = Router();

    router.use('/pocket', subRouter);

    subRouter.get('/login', this.handleLogin.bind(this));
    subRouter.get('/redirect', this.handleRedirect.bind(this));
    subRouter.get('/articles', this.handleArticles.bind(this));
  }

  private handleLogin(req: Request, res: Response): void {
    this.controller.loginToPocket(res)
      .catch(ApiUtility.handleError(res));
  }

  private handleRedirect(req: Request, res: Response): void {
    this.controller.handlePocketCallback()
      .then(ApiUtility.handleResponse(res))
      .catch(ApiUtility.handleError(res));
  }

  private handleArticles(req: Request, res: Response): void {
    this.controller.getArticles()
      .then(ApiUtility.handleResponse(res))
      .catch(ApiUtility.handleError(res));
  }
}