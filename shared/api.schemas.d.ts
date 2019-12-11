export interface IErrorResponse {
  error: string;
}

export interface IUserData {
  avatar_url: string;
  login: string;
  created_at: string;
  public_repos: number;
}

export interface IRepository {
  id: number;
  name: string;
  description: string;
  size: number;
  created_at: string;
  pushed_at: string;
  html_url: string;
}
