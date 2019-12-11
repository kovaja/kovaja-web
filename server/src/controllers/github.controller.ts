import { ITestResponse } from '../../../shared/api.schemas';
import { HttpUtility } from '../utilities/http.utility';


export class GithubController {

  private githubUser: string;

  constructor() {
    this.githubUser = 'kovaja';
  }

  public getUserData(): Promise<ITestResponse> {
    const url = 'https://api.github.com/users/' + this.githubUser;

    // TODO: reduce data to what is needed
    return HttpUtility.getJSON(url, { 'User-Agent': this.githubUser });
  }

  public getReposData(): Promise<ITestResponse> {

    const testData: ITestResponse = {
      message: 'This is your response from test API: ' + new Date().toLocaleString()
    };

    return Promise.resolve(testData);
  }
}