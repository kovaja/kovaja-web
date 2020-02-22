import { Request } from 'express';
import { Logger } from '../utils/logger';
import { AccessLog, IAccessLog } from '../database/access-log.schema';

export function logIndexAccess(request: Request): void {
  try {
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

    if (host.includes('localhost')) {
      Logger.log('[ACCESS LOG]', 'Localhost access', 'skip');
      return;
    }

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