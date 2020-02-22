// TODO: introduce better solution, it probably doesnt work on local
import * as path from 'path';
import { Logger } from './utils/logger';

let prefix = '../../';

if (process.env.NODE_ENV === 'production') {
  prefix += '../';
}

export const AppConfig = {
  CLIENT_BUILD_PATH: prefix + 'client/dist',
  ROOT_PACKAGE_JSON_PATH: path.resolve(__dirname, prefix, 'package.json')
};

Logger.log('[APP CONFIG]', AppConfig);