import * as mongoose from 'mongoose';
import { Logger } from '../utils/logger';
import { Constants } from '../constants/constants';
import { promiseMapTo } from '../utils/commons';

export function initalizeDatabase(): Promise<void> {
  if (!Constants.DB_USERNAME || !Constants.DB_PWD || !Constants.DB_HOST || !Constants.DB_PORT) {
    Logger.error('Database init, uknown database credentials');
    return Promise.reject('Unknown DB credentials');
  }
  const connectionURL = `mongodb://${Constants.DB_USERNAME}:${Constants.DB_PWD}@${Constants.DB_HOST}:${Constants.DB_PORT}/kovaja-web`;
  const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  return mongoose
    .connect(connectionURL, options)
    .then(promiseMapTo(undefined))
    .catch((err) => {
      Logger.error('Database init error: ', err);
      throw err;
    });
}
