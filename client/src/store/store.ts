import Api from "@/config/api";
import axios from "axios";
import { StoreOptions } from "vuex";
import { IRepository, IUserData } from "../../../shared/api.schemas";

export interface IState {
  userDataLoading: boolean;
  repositoriesLoading: boolean;
  user: IUserData | null;
  repositories: IRepository[];
}

export enum Actions {
  GET_USER = "GET_USER",
  GET_REPOSITORIES = "GET_REPOSITORIES"
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
    user: null,
    repositories: []
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
    }
  }
};
