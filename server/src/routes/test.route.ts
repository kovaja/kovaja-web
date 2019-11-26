import { Request, Response, Router } from 'express';
import { TestController } from '../controllers/test.controller';
import { ApiUtility } from '../utilities/api.utility';

export class TestRoute {
  private controller: TestController;

  constructor(router: Router) {
    this.controller = new TestController();

    const subRouter = Router();

    router.use('/test', subRouter);

    subRouter.get('/init', this.handleTest.bind(this));
  }

  private handleTest(req: Request, res: Response): void {
    this.controller.testControllerMethod()
      .then(ApiUtility.handleResponse(res))
      .catch(ApiUtility.handleError(res));
  }
}