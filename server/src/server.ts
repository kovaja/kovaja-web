import { Logger } from './utils/logger';
import { createApp } from './app';
import { Application } from 'express';

const PORT = process.env.PORT || 8000;

function onAppListening(): void {
  Logger.log('Server listening on port', PORT);
}

function onAppCreated(app: Application): void {
  app.listen(PORT, onAppListening);
}

createApp()
  .then(onAppCreated)
  .catch((e) => Logger.error(e));

  // TODO: pre publish hook to increment version, then serve version to frontend
