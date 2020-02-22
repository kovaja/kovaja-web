import * as path from 'path';
import { Logger } from './utils/logger';

export const AppConfig = {
  CLIENT_BUILD_PATH: path.resolve('../', 'client', 'dist'),
  ROOT_PACKAGE_JSON_PATH: path.resolve('package.json')
};

Logger.log('[APP CONFIG]', AppConfig);