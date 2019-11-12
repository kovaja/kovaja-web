import { RouteConfig } from "vue-router";
import Home from "../components/home/Home.vue";
import Projects from "../components/Projects.vue";

const routes: RouteConfig[] = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/Projects", component: Projects }
];

export default routes;
