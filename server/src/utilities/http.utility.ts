import * as request from 'request';

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


  public static getJSON(url: string, headers?: request.Headers): Promise<any> {
    const promiseExecutor = (resolve, reject): void => {

      const requestCallback = (error: any, res: request.Response, body: any): void => {
        if (error) {
          return reject(error);
        }

        if (HttpUtility.isFailResponse(res)) {
          const errorToThrow = new Error(HttpUtility.getErrorMessage(url, res));
          return reject(errorToThrow);
        }

        let data = undefined;

        try {
          data = JSON.parse(body);
        } catch (error) {
          return reject(error);
        }

        resolve(data);
      };

      const options = {
        url: url,
        headers: headers || {}
      };

      request(options, requestCallback);
    };

    return new Promise(promiseExecutor);
  }
}