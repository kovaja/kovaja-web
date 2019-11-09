<template>
  <div class="repo-overview-container">
    <h1 class="text-align-center">Github</h1>
    <div class="flex space-between" v-if="hasUser">
      <div>
        <img :src="user.avatar_url" alt="repo-avatar" />
      </div>
      <div>
        <h2>User Info</h2>
        <ul class="padding-sm">
          <li>From: {{user.location}}</li>
          <li>At github for <TimeSince :since="user.created_at"/></li>
          <li>Number of repositories: {{user.public_repos}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TimeSince from "./TimeSince.vue";
import { Constants } from "../config/constants";
import { IUserData } from "../interfaces/user-data.interface";
import Api from "../config/api";
import axios from "axios";

export default Vue.extend({
  name: "RepoOverview",
  components: {
    TimeSince
  },
  props: {},
  data: function(): { user: IUserData | null } {
    return {
      user: null
    };
  },
  computed: {
    hasUser: function(): boolean {
      return this.user !== null;
    }
  },
  methods: {
    readUserInfo: function(data: IUserData) {
      console.log(data);

      this.user = data;
    },
    downloadUserInfo: function() {
      const url = Api()
        .github()
        .users(Constants.userName);

      axios.get(url).then(res => this.readUserInfo(res.data));
    }
  },
  mounted: function() {
    this.downloadUserInfo();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.repo-overview-container {
  border: 1px solid #494949;
}
</style>
