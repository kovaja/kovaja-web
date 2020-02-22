import { Logger } from './utils/logger';
import { createApp } from './app';
import { Application } from 'express';
import { getPort, getHost, getProtocol } from './utils/network';

const PORT = process.env.PORT || 8000;

function onAppListening(): void {
  const network = {
    protocol: getProtocol(),
    host: getHost(),
    port: getPort()
  };

  Logger.log('Server si running');
  Logger.log(network);
}

function onAppCreated(app: Application): void {
  app.listen(PORT, onAppListening);
}

createApp()
  .then(onAppCreated)
  .catch((e) => Logger.error(e));
