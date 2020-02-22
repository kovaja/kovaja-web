import Axios, { AxiosResponse } from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import { IClientConfig } from '../../shared/api.schemas';
import App from './App.vue';
import api from './config/api';
import { Actions, storeOptions } from './store/store';
import './styles/styles.scss';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store(storeOptions);

const renderApp = (res: AxiosResponse<IClientConfig>) => {
  store.dispatch(Actions.SET_CLIENT_CONFIG, res.data);

  new Vue({
    render: h => h(App),
    store
  }).$mount('#app');
};

const url = api().admin().init();

Axios.get<IClientConfig>(url)
  .then(renderApp);



