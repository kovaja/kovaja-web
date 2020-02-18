import Favorites from "@/components/favorites/Favorites.vue";
import Home from "@/components/home/Home.vue";
import Projects from "@/components/Projects.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/favorites", component: Favorites },
  { path: "/projects", component: Projects }
];

export default routes;
