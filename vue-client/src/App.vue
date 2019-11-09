<template>
  <div id="app">
    <GithubOverview />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GithubOverview from "./components/github-overview/GithubOverview.vue";

export default Vue.extend({
  name: "app",
  components: {
    GithubOverview
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
