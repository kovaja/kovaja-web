import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from "./App.vue";
import routes from "./routing/routes";
import "./styles/styles.scss";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({ routes, mode: "history" });

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
