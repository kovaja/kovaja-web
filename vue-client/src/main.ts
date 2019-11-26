import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from "./App.vue";
import routes from "./routing/routes";
import { storeOptions } from "./store/store";
import "./styles/styles.scss";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({ routes, mode: "history" });
const store = new Vuex.Store(storeOptions);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
