import { LocalConstants } from '../../env.local';

export const Constants = {
  APP_NAME: 'kovaja-web',
  POCKET_CONSUMER_KEY: process.env.POCKET_CONSUMER_KEY || LocalConstants.POCKET_CONSUMER_KEY,
  POCKET_ACCESS_KEY: process.env.POCKET_ACCESS_KEY || LocalConstants.POCKET_ACCESS_KEY
};