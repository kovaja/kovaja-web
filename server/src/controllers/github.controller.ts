import { IUserData } from '../../../shared/api.schemas';
import { HttpUtility } from '../utilities/http.utility';


export class GithubController {

  private githubUser: string;

  constructor() {
    this.githubUser = 'kovaja';
  }

  public getUserData(): Promise<IUserData> {
    const url = 'https://api.github.com/users/' + this.githubUser;


    const buildResponse = (data: any): IUserData => {
      return {
        avatar_url: data.avatar_url,
        login: data.login,
        created_at: data.created_at,
        public_repos: data.public_repos
      };
    };

    return HttpUtility.getJSON(url, { 'User-Agent': this.githubUser })
      .then(buildResponse);
  }

  public getReposData(): Promise<any> {

    const testData: any = {
      message: 'This is your response from test API: ' + new Date().toLocaleString()
    };

    return Promise.resolve(testData);
  }
}