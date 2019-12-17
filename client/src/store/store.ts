import Api from "@/config/api";
import axios from "axios";
import { StoreOptions } from "vuex";
import {
  IRepository,
  IUserData,
  IArticle,
  ISpotifyTrack
} from "../../../shared/api.schemas";

export interface IState {
  userDataLoading: boolean;
  repositoriesLoading: boolean;
  articlesLoading: boolean;
  user: IUserData | null;
  repositories: IRepository[];
  articles: IArticle[];
  tracks: ISpotifyTrack[];
}

export enum Actions {
  GET_USER = "GET_USER",
  GET_REPOSITORIES = "GET_REPOSITORIES",
  GET_ARTICLES = "GET_ARTICLES",
  GET_TRACKS = "GET_TRACKS"
}

interface ILoadingData {
  loading: boolean;
  whatIsLoading: string;
}

function loadingFactory(
  whatIsLoading: string,
  loadingState: boolean
): ILoadingData {
  return {
    loading: loadingState,
    whatIsLoading: whatIsLoading
  };
}

export const storeOptions: StoreOptions<IState> = {
  state: {
    userDataLoading: false,
    repositoriesLoading: false,
    articlesLoading: false,
    user: null,
    repositories: [],
    articles: [],
    tracks: []
  },
  getters: {},
  mutations: {
    setLoading: (state: IState, data: ILoadingData) => {
      switch (data.whatIsLoading) {
        case "user":
          state.userDataLoading = data.loading;
          break;
        case "repositories":
          state.repositoriesLoading = data.loading;
          break;
      }
    },
    setUser: (state: IState, user: IUserData) => {
      state.user = user;
    },
    setRepositories: (state: IState, repos: IRepository[]) => {
      state.repositories = repos;
    },
    setArticles: (state: IState, articles: IArticle[]) => {
      state.articles = articles;
    },
    setTracks: (state: IState, tracks: ISpotifyTrack[]) => {
      state.tracks = tracks;
    }
  },
  actions: {
    [Actions.GET_USER]: ({ commit }) => {
      commit("setLoading", loadingFactory("user", true));

      const url = Api()
        .github()
        .user();

      axios.get(url).then(res => {
        commit("setLoading", loadingFactory("user", false));
        commit("setUser", res.data);
      });
    },
    [Actions.GET_REPOSITORIES]: ({ commit }) => {
      commit("setLoading", loadingFactory("repositories", true));

      const url = Api()
        .github()
        .repos();

      axios.get(url).then(res => {
        commit("setLoading", loadingFactory("repositories", false));
        commit("setRepositories", res.data);
      });
    },
    [Actions.GET_ARTICLES]: ({ commit }) => {
      commit("setLoading", loadingFactory("articles", true));

      const url = Api()
        .pocket()
        .articles();

      axios.get(url).then(res => {
        commit("setLoading", loadingFactory("articles", false));
        commit("setArticles", res.data);
      });
    },
    [Actions.GET_TRACKS]: ({ commit }) => {
      commit("setLoading", loadingFactory("tracks", true));

      const url = Api()
        .spotify()
        .played();

      axios.get(url).then(res => {
        commit("setLoading", loadingFactory("tracks", false));
        commit("setTracks", res.data);
      });
    }
  }
};
