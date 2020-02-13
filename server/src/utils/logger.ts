import { Constants } from '../constants/constants';

enum LogLevel {
  log = 'log',
  error = 'error'
}

// TODO: introduce flags for log levels (env vars or db runtime config)

export class Logger {

  private static out(level: LogLevel, ...args: any): void {
    /* tslint:disable-next-line:no-console */
    console[level](`[${Constants.APP_NAME}] - ${new Date().toISOString()}: `, ...args);
  }

  public static log(...args: any[]): void {
    this.out(LogLevel.log, ...args);
  }

  public static error(...args: any[]): void {
    this.out(LogLevel.error, ...args);
  }
}