import { Logger } from './utilities/logger';
import { createApp } from './app';
import { Application } from 'express';

const PORT = process.env.PORT || 8000;

function onAppListnening(): void {
  Logger.log('Server listening on port', PORT);
}

function onAppCreated(app: Application): void {
  app.listen(PORT, onAppListnening);
}

createApp()
  .then(onAppCreated);
