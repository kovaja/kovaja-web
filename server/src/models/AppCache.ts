import { Logger } from '../utilities/logger';

interface ICacheData {
  resetTS: number;
  data: any;
}

export class AppCache {
  private data: Map<string, ICacheData>;

  constructor() {
    this.data = new Map();
  }

  public set<T>(key: string, data: T, resetTS: number): void {
    Logger.log('[CACHE]', 'set', key, resetTS);

    this.data.set(key, { data, resetTS });
  }

  public isValid(key: string): boolean {
    return this.data.has(key) && this.data.get(key).resetTS > new Date().getTime();
  }

  public get<T>(key: string): T | null {
    Logger.log('[CACHE]', 'get', key);

    return this.data.has(key) ? this.data.get(key).data : null;
  }
}