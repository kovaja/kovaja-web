import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
import routes from './routing/routes';
import { storeOptions } from './store/store';
import './styles/styles.scss';
import Axios from 'axios';
import api from './config/api';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({ routes, mode: 'history' });
const store = new Vuex.Store(storeOptions);

const renderApp = () => {
  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app');
};

const url = api().admin().init();

Axios.get(url)
  .then(res => {
    console.log('Client initialized', res)
  })
  .then(renderApp);



