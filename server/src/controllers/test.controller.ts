import { ITestResponse } from '../../../shared/api.schemas';

export class TestController {
  public testControllerMethod(): Promise<ITestResponse> {

    const testData: ITestResponse = {
      message: 'This is your response from test API: ' + new Date().toLocaleString()
    };

    return Promise.resolve(testData);
  }
}