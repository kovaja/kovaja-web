import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import { storeOptions } from './store/store';
import './styles/styles.scss';
import Axios from 'axios';
import api from './config/api';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store(storeOptions);

const renderApp = () => {
  new Vue({
    render: h => h(App),
    store
  }).$mount('#app');
};

const url = api().admin().init();

Axios.get(url)
  .catch((err) => {
    // eslint-disable-next-line
    console.log('Unable to init server', err)
  })
  .then(renderApp);



