import { LocalConstants } from '../../env.local';

export const Constants = {
  APP_NAME: 'kovaja-web',
  POCKET_CONSUMER_KEY: process.env.POCKET_CONSUMER_KEY || LocalConstants.POCKET_CONSUMER_KEY,
  POCKET_ACCESS_KEY: process.env.POCKET_ACCESS_KEY || LocalConstants.POCKET_ACCESS_KEY,
  DB_HOST: process.env.DB_HOST || LocalConstants.DB_HOST,
  DB_PORT: process.env.DB_PORT || LocalConstants.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME || LocalConstants.DB_LOGIN,
  DB_PWD: process.env.DB_PWD || LocalConstants.DB_PWD
};