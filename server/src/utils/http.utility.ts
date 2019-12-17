import * as request from 'request';
import { Logger } from './logger';
import { AppError } from '../models/AppError';

export class HttpUtility {
  private static isFailResponse(res: request.Response): boolean {
    return res.statusCode < 200 || res.statusCode > 299;
  }

  private static getErrorMessage(url: string, res: request.Response): string {
    const message = `Failed to get ${url}: ${res.statusMessage} (${res.statusCode})`;
    let details = '';

    try {
      details =
        + '\n'
        + JSON.stringify(res.headers)
        + '\n'
        + JSON.stringify(res.body);
    } catch { }

    return message + details;
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

  public static get(url: string, headers?: request.Headers): Promise<request.Response> {
    const promiseExecutor = (resolve, reject): void => {

      const requestCallback = (error: any, res: request.Response): void => {
        if (error) {
          return reject(error);
        }

        resolve(res);
      };

      const options: request.OptionsWithUrl = {
        url: url,
        headers: headers || {}
      };

      request(options, requestCallback);
    };

    return new Promise(promiseExecutor);
  }

  public static post(url: string, body: any,  headers?: request.Headers): Promise<request.Response> {
    const promiseExecutor = (resolve, reject): void => {

      const requestCallback = (error: any, res: request.Response): void => {
        if (error) {
          return reject(error);
        }

        if (HttpUtility.isFailResponse(res)) {
          return reject(HttpUtility.readBodyFromResponse(res));
        }

        resolve(res);
      };

      const content = JSON.stringify(body);

      const options: request.OptionsWithUrl = {
        method: 'POST',
        headers: headers || {},
        body: content,
        url: url
      };

      request.post(options, requestCallback);
    };

    return new Promise(promiseExecutor);
  }
}