<template>
  <div id="app">
    <RepoOverview />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RepoOverview from "./components/RepoOverview.vue";

export default Vue.extend({
  name: "app",
  components: {
    RepoOverview
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
