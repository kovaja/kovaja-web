import { Request, Response } from 'express';
import { Headers } from 'request';
import { ISpotifyTrack } from '../../../shared/api.schemas';
import { Images } from '../constants/images';
import { Configuration, IConfiguration } from '../database/configuration.schema';
import { AppCache } from '../models/AppCache';
import { Http } from '../utils/http';
import { Logger } from '../utils/logger';
import { getServerUrl } from '../utils/network';

interface ITokenBody {
  grant_type: 'authorization_code';
  code: string;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
}

interface ITokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number; // seconds
  refresh_token: string;
  scope: string;
}

const FOLLOW_SCOPE = 'user-follow-read';
const RECENTLY_PLAYED_SCOPE = 'user-read-recently-played';
const ACCESS_TOKEN_CACHE_KEY = 'spotify-access-token';
const REFRESH_TOKEN_CACHE_KEY = 'spotify-refresh-token';

const SPOTIFY_REDIRECT_URL = getServerUrl('api/spotify/redirect');

export class SpotifyController {
  private cache: AppCache;

  private spotifyClientId: string;
  private spotifyClientSecret: string;
  private spotifyRefreshToken: string;
  private authorizeHash: string;

  private get accountsUrl(): string {
    return 'https://accounts.spotify.com';
  }

  private get apiMeUrl(): string {
    return 'https://api.spotify.com/v1/me';
  }

  constructor(configuration: IConfiguration) {
    this.cache = new AppCache();

    this.spotifyClientId = configuration.spotify.keys.clientId;
    this.spotifyClientSecret = configuration.spotify.keys.clientSecret;
    this.spotifyRefreshToken = configuration.spotify.keys.refreshToken;
  }

  private setSpotifyTokens(response: ITokenResponse): Promise<void> {
    const validTime = new Date().getTime() + response.expires_in * 1000 - 2;
    this.cache.set(ACCESS_TOKEN_CACHE_KEY, response.access_token, validTime);

    return Configuration.update({ 'spotify.keys.refreshToken': response.refresh_token })
      .then(() => Logger.log('Spotify refresh token updated'));
  }

  private getSpotifyLoginUrl(authorizeHash: string): string {
    const redirectURI = global.encodeURIComponent(SPOTIFY_REDIRECT_URL);
    const scopes = global.encodeURIComponent([FOLLOW_SCOPE, RECENTLY_PLAYED_SCOPE].join(' '));

    return `${this.accountsUrl}/authorize`
      + `?client_id=${this.spotifyClientId}`
      + `&response_type=code`
      + `&redirect_uri=${redirectURI}`
      + `&scope=${scopes}`
      + `&state=${authorizeHash}`;
  }

  private getSpotifyTokens(code: string): Promise<void> {
    const url = `${this.accountsUrl}/api/token`;

    const body: ITokenBody = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URL,
      client_id: this.spotifyClientId,
      client_secret: this.spotifyClientSecret
    };

    return Http.post(url, Http.urlEncodeObject(body), Http.formEncodedHeaders)
      .then(Http.readBodyFromResponse)
      .then(Http.readJsonBody)
      .then(d => this.setSpotifyTokens(d));
  }

  public loginToSpotify(res: Response): Promise<void> {
    this.authorizeHash = Math.random().toString(36).substring(2);
    const url = this.getSpotifyLoginUrl(this.authorizeHash);

    Logger.log('Redirecting user to ', url);
    res.redirect(url);

    return Promise.resolve();
  }

  public handleSpotifyCallback(req: Request): Promise<string> {
    const { code, state } = req.query;

    if (typeof code !== 'string') {
      Logger.error('No code retrieved from spotify');
      return Promise.reject('Spotify authorization failed');
    }

    if (state !== this.authorizeHash) {
      Logger.error('Spotify authorization hash does not match', state);
      return Promise.reject('Spotify authorization failed');
    }

    return this.getSpotifyTokens(code)
      .then(() => 'Spotify authenticated');
  }

  public getRecentlyPlayed(): Promise<ISpotifyTrack[]> {
    // we have to have refresh token
    if (typeof this.spotifyRefreshToken !== 'string') {
      Logger.error('Cannot get recently played songs, no refresh token');
      return Promise.resolve([]);
    }

    let logToSpotify = Promise.resolve();
    if (this.cache.isValid(ACCESS_TOKEN_CACHE_KEY) === false) {
      Logger.log('Spotify: requesting new access token');
      logToSpotify = this.getSpotifyTokens(this.spotifyRefreshToken);
    }

    const url = this.apiMeUrl + '/player/recently-played';
    const headers: Headers = {
      'Authorization': 'Bearer ' + this.cache.get(ACCESS_TOKEN_CACHE_KEY)
    };

    const getAlbumImage = (album: any): string => {
      const imageData = album.images.find(i => i.height === 300);
      return imageData ? imageData.url : Images.DEFAULT_ARTICLE;
    };

    const buildResponse = (item: any): ISpotifyTrack => {
      const track = item.track;

      return {
        name: track.name,
        album: track.album ? track.album.name : null,
        image: track.album ? getAlbumImage(track.album) : Images.DEFAULT_ARTICLE,
        played_at: item.played_at,
        artists: Array.isArray(track.artists) ? track.artists.map(a => a.name) : [],
        url: track.external_urls ? track.external_urls.spotify : null
      };
    };

    // Note: rate limiting. Spotify will return 429
    // With retry-after header
    // https://developer.spotify.com/documentation/web-api/
    // But I wasn't able to reproduce. So for now, no rate limiting
    // Will solve it once it happens
    return logToSpotify
      .then(() => Http.get(url, headers))
      .then(Http.readBodyFromResponse)
      .then(Http.readJsonBody)
      .then(body => body.items.map(buildResponse));
  }
}
