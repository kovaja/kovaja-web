<template>
  <div class="row align-items-center justify-content-center">
    <div class="col-sm-12 col-md-6">
      <div style="background-color: #325fac; color: white;">
        MAIN CONTENT
      </div>
    </div>
    <div class="com-sm-12 col-md-6">
      <GithubOverview />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GithubOverview from "./github-overview/GithubOverview.vue";

export default Vue.extend({
  name: "Home",
  components: {
    GithubOverview
  }
});
</script>
