import { isProduction } from './commons';

const HOSTS = {
  local: 'localhost',
  heroku: 'kovaja-web.herokuapp.com'
};

export function getPort(): string {
  return process.env.PORT || '8000';
}

export function getHost(): string {
  return isProduction() ? HOSTS.heroku : `${HOSTS.local}:${getPort()}`;
}

export function getProtocol(): string {
  return isProduction() ? 'https' : 'http';
}

export function getServerUrl(path: string): string {
  return `${getProtocol()}://${getHost()}/${path}`;
}