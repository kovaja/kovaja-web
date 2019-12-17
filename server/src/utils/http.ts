import * as request from 'request';
import { Logger } from './logger';
import { AppError } from '../models/AppError';

export class Http {
  public static readonly jsonHeaders: request.Headers = {
    'Content-Type': 'application/json; charset=UTF-8'
  };

  public static readonly formEncodedHeaders: request.Headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  private static isFailResponse(res: request.Response): boolean {
    return res.statusCode < 200 || res.statusCode > 299;
  }

  private static getErrorMessage(url: string, res: request.Response): string {
    const message = `Failed request: ${url}: ${res.statusMessage} (${res.statusCode})`;
    let details = '';

    try {
      details =
        + '\n\n'
        + JSON.stringify(res.headers, null, 2)
        + '\n\n'
        + JSON.stringify(res.body, null, 2);
    } catch { }

    return message + details;
  }

  private static getResponseHandler(url, resolve, reject): (error: any, res: request.Response) => void {
    return (error: any, res: request.Response): void => {
      if (error) {
        return reject(error);
      }

      if (Http.isFailResponse(res)) {
        return reject(Http.getErrorMessage(url, res));
      }

      resolve(res);
    };
  }

  public static readJsonBody(data: string): any {
    let json;

    try {
      json = JSON.parse(data);
    } catch (error) {
      Logger.error(error);
    }

    if (typeof json !== 'object') {
      throw new AppError('Could not parse body');
    }

    return json;
  }

  public static readBodyFromResponse(response: request.Response): string {
    return response.body;
  }

  public static urlEncodeObject(obj: object): string {
    return Object.keys(obj).map(k => k + '=' + global.encodeURIComponent(obj[k])).join('&');
  }

  public static get(url: string, headers?: request.Headers): Promise<request.Response> {
    const promiseExecutor = (resolve, reject): void => {
      const options: request.OptionsWithUrl = {
        url: url,
        headers: headers || {}
      };

      request(options, Http.getResponseHandler(url, resolve, reject));
    };

    return new Promise(promiseExecutor);
  }

  public static post(url: string, body: any, headers?: request.Headers): Promise<request.Response> {
    const promiseExecutor = (resolve, reject): void => {
      const content = typeof body !== 'string' ? JSON.stringify(body) : body;

      const options: request.OptionsWithUrl = {
        method: 'POST',
        headers: headers || {},
        body: content,
        url: url
      };

      request.post(options, Http.getResponseHandler(url, resolve, reject));
    };

    return new Promise(promiseExecutor);
  }
}