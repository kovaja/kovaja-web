import { Request } from 'express';
import { Logger } from '../utils/logger';
import { AccessLog, IAccessLog } from '../database/access-log.schema';

export function logIndexAccess(request: Request): void {
  try {
    const isIndexRequest = request.accepts().includes('text/html');

    if (isIndexRequest === false) {
      return;
    }

    const time = new Date().toISOString();
    const url = request.headers.referer;
    const userAgent = request.headers['user-agent'];
    const ip = request.ip;

    const log: IAccessLog = {
      time,
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