import { Request } from 'express';
import { Logger } from '../utils/logger';
import { AccessLog, IAccessLog } from '../database/access-log.schema';

export function logIndexAccess(request: Request): void {
  try {
    // TODO: register accepts header const isIndexRequest = request.accepts().includes('appli/html');

    // TODO: use some 3rd party to recognize device properly
    // TODO: consider using xhr from client once index is served

    const remoteAddress = request.connection.remoteAddress;
    let forwarded = request.headers['x-forwarded-for'];

    if (Array.isArray(forwarded)) {
      forwarded = forwarded.join(' | ');
    }

    const time = new Date().toISOString();
    const host = request.hostname;
    const url = request.url;
    const userAgent = request.headers['user-agent'];
    const ip = forwarded || remoteAddress;

    const log: IAccessLog = {
      time,
      host,
      ip,
      url,
      userAgent
    };

    AccessLog.create(log)
      .then((e) => Logger.log('[ACCESS LOG]', 'created', log))
      .catch((e) => Logger.error('[ACCESS LOG]', 'create', log));

  } catch (e) {
    Logger.error('[ACCESS LOG]', 'reading log', e);
  }
}