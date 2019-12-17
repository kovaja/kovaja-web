import { Request, Response, Router } from 'express';
import { GithubController } from '../controllers/github.controller';
import { Api } from '../utils/api';

export class GithubRoute {
  private controller: GithubController;

  constructor(router: Router) {
    this.controller = new GithubController();

    const subRouter = Router();

    router.use('/github', subRouter);

    subRouter.get('/user', this.handleUser.bind(this));
    subRouter.get('/repos', this.handleRepos.bind(this));
  }

  private handleUser(req: Request, res: Response): void {
    this.controller.getUserData()
      .then(Api.handleResponse(res))
      .catch(Api.handleError(res));
  }

  private handleRepos(req: Request, res: Response): void {
    this.controller.getReposData()
      .then(Api.handleResponse(res))
      .catch(Api.handleError(res));
  }
}
