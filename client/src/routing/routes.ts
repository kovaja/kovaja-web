import Favorites from "@/components/Favorites.vue";
import Home from "@/components/home/Home.vue";
import Projects from "@/components/Projects.vue";
import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/favorites", component: Favorites },
  { path: "/projects", component: Projects }
];

export default routes;
