import { Response } from 'express';
import { Headers } from 'request';
import { IArticle } from '../../../shared/api.schemas';
import { Configuration, IConfiguration } from '../database/configuration.schema';
import { promiseTap } from '../utils/commons';
import { Http } from '../utils/http';
import { Logger } from '../utils/logger';

interface IRequestToken {
  code: string;
}

interface IAccessToken {
  access_token: string;
  username: string;
}

interface IRequestTokenBody {
  consumer_key: string;
  redirect_uri: string;
}

interface IArticlesBody {
  consumer_key: string;
  access_token: string;
  sort: 'newest' | 'oldest';
  detailType: 'complete' | 'simple';
}

interface IAuthorizeBody {
  consumer_key: string;
  code: string;
}

// TODO: remove localhost, use actual hostname
const POCKET_REDIRECT_URL = 'http://localhost:8000/api/pocket/redirect';

export class PocketController {
  private baseUrl: string;
  private requestToken: string;

  private get v3Api(): string {
    return this.baseUrl + '/v3';
  }

  private get oauthApi(): string {
    return this.v3Api + '/oauth';
  }

  private pocketConsumerKey: string;
  private pocketAccessKey: string;

  constructor() {
    this.baseUrl = 'https://getpocket.com';
    this.requestToken = null;

    Configuration.read()
      .then(this.setKeys.bind(this))
      .then(() => Logger.log('Pocket keys were set'));
  }

  private setKeys(c: IConfiguration): void {
    this.pocketAccessKey = c.pocketAccessKey;
    this.pocketConsumerKey = c.pocketConsumerKey;
  }

  private getPocketLoginUrl(requestToken: string) {
    const redirectURI = global.encodeURIComponent(POCKET_REDIRECT_URL);
    return `${this.baseUrl}/auth/authorize?request_token=${requestToken}&redirect_uri=${redirectURI}`;
  }

  private authorizeUser(requestToken: string): Promise<string> {
    const url = this.oauthApi + '/authorize';

    const storeToken = (data: IAccessToken): void => {
      // Note: here you will get your access token
    };

    const headers: Headers = {
      ...Http.jsonHeaders,
      'X-Accept': 'application/json'
    };

    const body: IAuthorizeBody = {
      consumer_key: this.pocketConsumerKey,
      code: requestToken
    };

    return Http.post(url, body, headers)
      .then(Http.readBodyFromResponse)
      .then(Http.readJsonBody)
      .then(promiseTap(storeToken))
      .then((data: IAccessToken) => {
        Logger.log('Pocket authorised with ' + data.access_token);
        return 'Authorized in Pocket as ' + data.username;
      });
  }

  private getRequestToken(): Promise<IRequestToken> {
    const url = this.oauthApi + '/request';

    const headers: Headers = {
      ...Http.jsonHeaders,
      'X-Accept': 'application/json'
    };

    const body: IRequestTokenBody = {
      consumer_key: this.pocketConsumerKey,
      redirect_uri: POCKET_REDIRECT_URL
    };

    return Http.post(url, body, headers)
      .then(Http.readBodyFromResponse)
      .then(Http.readJsonBody);
  }

  public loginToPocket(res: Response): Promise<void> {
    const storeToken = (data: IRequestToken): void => {
      this.requestToken = data.code;
    };

    const redirect = (data: IRequestToken): void => {
      const url = this.getPocketLoginUrl(data.code);
      Logger.log('Redirecting user to', url);

      res.redirect(url);
    };

    return this.getRequestToken()
      .then(promiseTap(storeToken))
      .then(redirect);
  }

  public handlePocketCallback(): Promise<string> {
    Logger.log('Callback from pocket');

    if (typeof this.requestToken !== 'string') {
      return Promise.reject('Do not have request token for Pocket');
    }

    return this.authorizeUser(this.requestToken);
  }

  public getArticles(): Promise<IArticle[]> {
    const url = this.v3Api + '/get';

    const headers: Headers = {
      ...Http.jsonHeaders
    };

    const body: IArticlesBody = {
      consumer_key: this.pocketConsumerKey,
      access_token: this.pocketAccessKey,
      sort: 'oldest',
      detailType: 'complete'
    };

    const getListOfArticles = (body: { list: any }): any[] => {
      return Object.keys(body.list).map(k => body.list[k]);
    };

    const buldArticle = (data: any): IArticle => {
      return {
        resolved_title: data.resolved_title,
        excerpt: data.excerpt,
        image: data.image ? data.image.src : null,
        time_added: Number(data.time_added)
      };
    };

    const byAddedTime = (a: IArticle, b: IArticle): number => {
      return a.time_added > b.time_added ? -1 : 1;
    };

    const buildResponse = (dataArr: any[]): IArticle[] => {
      return dataArr
        .map(buldArticle)
        .sort(byAddedTime);
    };

    return Http.post(url, body, headers)
      .then(Http.readBodyFromResponse)
      .then(Http.readJsonBody)
      .then(getListOfArticles)
      .then(buildResponse);
  }

}