import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { AppConfig } from './app.config';
import { Routes } from './routes/routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.initialize();
  }

  private serveIndex(req: express.Request, res: express.Response): void {
    const indexPath = path.join(__dirname, AppConfig.CLIENT_BUILD_PATH, 'index.html');

    res.sendFile(indexPath);
  }

  private initialize(): void {
    const staticPath = path.join(__dirname, AppConfig.CLIENT_BUILD_PATH);

    this.app.use(bodyParser.json());
    this.app.use(express.static(staticPath));
    this.app.get('/', this.serveIndex.bind(this));

    Routes.initRoutes(this.app);
  }
}

export default new App().app;