import { Request, Response, Router } from 'express';
import { SpotifyController } from '../controllers/spotify.controller';
import { Api } from '../utils/api';
import { IConfiguration } from '../database/configuration.schema';

export class SpotifyRoute {
  private controller: SpotifyController;

  constructor(router: Router, configuration: IConfiguration) {
    this.controller = new SpotifyController(configuration);

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
