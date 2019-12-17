import { IUserData, IRepository } from '../../../shared/api.schemas';
import { HttpUtility } from '../utils/http.utility';
import { Response, Headers } from 'request';
import { Logger } from '../utils/logger';
import { AppCache } from '../models/AppCache';
import { promiseTap } from '../utils/commons';

const GITHUB_REMAINING_HITS = 'x-ratelimit-remaining';
const GITHUB_HITS_RESET = 'x-ratelimit-reset';
const CACHE_THRESHOLD = 30;

export class GithubController {

  private githubUser: string;
  private baseUrl: string;
  private cache: AppCache;

  constructor() {
    this.githubUser = 'kovaja';
    this.baseUrl = 'https://api.github.com/users/' + this.githubUser;
    this.cache = new AppCache();
  }

  private handleGithubLimit(key: string, response: Response): void {
    const headers: Headers = response.headers;
    const hitsRemaining = Number(headers[GITHUB_REMAINING_HITS]);
    const resetTS = Number(headers[GITHUB_HITS_RESET]) * 1000;
    const cannotHitGithub = isNaN(hitsRemaining) === false && hitsRemaining <= CACHE_THRESHOLD;

    Logger.log('Remaining hits:', key, hitsRemaining);

    if (cannotHitGithub) {
      this.cache.set<string>(key, response.body, resetTS);
    }
  }

  private getGithubData(url: string): Promise<any> {
    if (this.cache.isValid(url)) {
      return Promise.resolve(this.cache.get<string>(url))
        .then(HttpUtility.readJsonBody);
    }

    return HttpUtility
      .get(url, { 'User-Agent': this.githubUser })
      .then(
        promiseTap((r: Response) => this.handleGithubLimit(url, r))
      )
      .then(HttpUtility.readBodyFromResponse)
      .then(HttpUtility.readJsonBody);
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

    return this.getGithubData(this.baseUrl)
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
      });
    };

    return this.getGithubData(url)
      .then(buildResponse);
  }
}