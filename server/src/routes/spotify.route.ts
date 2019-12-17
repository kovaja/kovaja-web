import { Request, Response, Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { SpotifyController } from '../controllers/spotify.controller';
import { Api } from '../utils/api';

export class SpotifyRoute {
  private controller: SpotifyController;

  constructor(router: Router) {
    this.controller = new SpotifyController();

    const subRouter = Router();

    router.use('/spotify', subRouter);

    subRouter.get('/login', this.handleLogin.bind(this));
    subRouter.get('/redirect', this.handleRedirect.bind(this));
    subRouter.get('/played', this.handlePlayed.bind(this));
  }

  private handleLogin(req: Request, res: Response): void {
    this.controller.loginToSpotify(res)
      .catch(Api.handleError(res));
  }

  private handleRedirect(req: Request, res: Response): void {
    this.controller.handleSpotifyCallback(req)
      .then(Api.handleResponse(res))
      .catch(Api.handleError(res));
  }

  private handlePlayed(req: Request, res: Response): void {
    this.controller.getRecentlyPlayed()
      .then(Api.handleResponse(res))
      .catch(Api.handleError(res));
  }
}
