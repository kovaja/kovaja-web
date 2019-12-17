import { Request, Response, Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { Api } from '../utils/api';

export class AdminRoute {
  private controller: AdminController;

  constructor(router: Router) {
    this.controller = new AdminController();

    const subRouter = Router();

    router.use('/admin', subRouter);

    subRouter.get('/createConfig', this.handleUser.bind(this));
  }

  private handleUser(req: Request, res: Response): void {
    this.controller.createConfiguration()
      .then(Api.handleResponse(res))
      .catch(Api.handleError(res));
  }
}