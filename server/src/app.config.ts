// TODO: introduce better solution, it probably doesnt work on local

let prefix = '../../';

if (process.env.NODE_ENV === 'production') {
  prefix += '../';
}

export const AppConfig = {
  CLIENT_BUILD_PATH: prefix + 'client/dist'
};