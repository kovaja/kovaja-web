<template>
  <div class="row align-items-center justify-content-center">
    <div class="col-sm-12 col-md-6">
      <AboutMe />
    </div>
    <div class="com-sm-12 col-md-6">
      <div class="p-4 shadow">
        <GithubOverview v-if="false" />
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Mauris tincidunt sem sed arcu. Integer
          vulputate sem a nibh rutrum consequat. Aenean id metus id velit
          ullamcorper pulvinar. Nulla accumsan, elit sit amet varius semper,
          nulla mauris mollis quam, tempor suscipit diam nulla vel leo.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GithubOverview from "./github-overview/GithubOverview.vue";
import AboutMe from "./AboutMe.vue";

export default Vue.extend({
  name: "Home",
  components: {
    GithubOverview,
    AboutMe
  }
});
</script>
