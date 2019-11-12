<template>
  <div id="app" class="container-fluid p-0">
    <Header />
    <div class="container-fluid">
      <div class="row align-items-center justify-content-center">
        <div class="col-sm-12 col-md-6">
          <div
            style=" height: 600px; background-color: #325fac; color: white;"
          >
            MAIN CONTENT
          </div>
        </div>
        <div class="com-sm-12 col-md-6">
          <GithubOverview />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GithubOverview from "./components/github-overview/GithubOverview.vue";
import Header from "./components/Header.vue";

export default Vue.extend({
  name: "app",
  components: {
    GithubOverview,
    Header
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
