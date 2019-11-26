import { ITestResponse } from '../../../shared/api.schemas';

export class GithubController {
  public getUserData(): Promise<ITestResponse> {

    const testData: ITestResponse = {
      message: 'This is your response from test API: ' + new Date().toLocaleString()
    };

    return Promise.resolve(testData);
  }

  public getReposData(): Promise<ITestResponse> {

    const testData: ITestResponse = {
      message: 'This is your response from test API: ' + new Date().toLocaleString()
    };

    return Promise.resolve(testData);
  }
}