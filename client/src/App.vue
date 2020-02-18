<template>
  <div id="app">
    <main class="container-fluid p-0">
      <app-title />
      <about-me class="bg-light" />
      <my-reads />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppTitle from "./components/AppTitle.vue";
import AboutMe from "./components/AboutMe.vue";
import MyReads from "./components/MyReads.vue";

export default Vue.extend({
  name: "app",
  components: { AppTitle, AboutMe, MyReads }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
