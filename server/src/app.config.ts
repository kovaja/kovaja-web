// TODO: introduce better solution

let prefix = '../../';

if (process.env.NODE_ENV === 'production') {
  prefix += '../';
}

export const AppConfig = {
  CLIENT_BUILD_PATH: prefix + 'client/dist'
};