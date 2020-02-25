<template>
  <div id="app">
    <main class="container-fluid p-0">
      <app-title />
      <about-me class="bg-light" />
      <my-reads />
      <my-music class="bg-light"  />
    </main>
    <app-footer />
    <app-icons />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppTitle from "./components/AppTitle.vue";
import AboutMe from "./components/AboutMe.vue";
import MyReads from "./components/MyReads.vue";
import MyMusic from "./components/MyMusic.vue";
import AppIcons from "./components/common/AppIcons.vue";
import AppFooter from "./components/AppFooter.vue";

// TODO: doresit texty (title, subtitle, intro)
// TODO: doresit articles/spotify title + text + icona
// TODO: dodelat list s githubem
// TODO: initial loading indicator
// TODO: launch chrome with spotify api login after build ?

export default Vue.extend({
  name: "app",
  components: { AppTitle, AboutMe, MyReads, MyMusic, AppIcons, AppFooter }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
