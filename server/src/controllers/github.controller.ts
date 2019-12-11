import { IUserData, IRepository } from '../../../shared/api.schemas';
import { HttpUtility } from '../utilities/http.utility';


export class GithubController {

  private githubUser: string;
  private baseUrl: string;

  constructor() {
    this.githubUser = 'kovaja';
    this.baseUrl = 'https://api.github.com/users/' + this.githubUser;
  }

  public getUserData(): Promise<IUserData> {
    const buildResponse = (data: any): IUserData => {
      return {
        avatar_url: data.avatar_url,
        login: data.login,
        created_at: data.created_at,
        public_repos: data.public_repos
      };
    };

    return HttpUtility
      .getJSON(this.baseUrl, { 'User-Agent': this.githubUser })
      .then(buildResponse);
  }

  public getReposData(): Promise<IRepository[]> {
    const url = this.baseUrl + '/repos';


    const buildResponse = (dataArr: any[]): IRepository[] => {
      return dataArr.map(data => {
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          size: data.size,
          created_at: data.created_at,
          pushed_at: data.pushed_at,
          html_url: data.html_url,
        };
      })
    };

    return HttpUtility
      .getJSON(url, { 'User-Agent': this.githubUser })
      .then(buildResponse);
  }
}