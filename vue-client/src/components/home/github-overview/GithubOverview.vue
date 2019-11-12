<template>
  <div class="container">
    <transition name="fade">
      <div class="row align-items-center" v-if="hasUser">
        <div class="col-sm-4 text-align-center">
          <img
            class="github-icon"
            src="@/assets/github.png"
            alt="github-icon"
          />
        </div>
        <div class="col-sm-8">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <!-- <img
                class="repo-avatar mr-1"
                :src="user.avatar_url"
                alt="repo-avatar"
              /> -->
              <a :href="user.html_url" target="_blank">
                <img
                  class="repo-avatar mr-1"
                  :src="user.avatar_url"
                  alt="repo-avatar"
                />
                {{ user.login }}
              </a>
            </li>
            <li class="list-group-item">
              On github for
              <TimeSince :since="user.created_at" />
            </li>
            <li class="list-group-item">
              <span>Number of repositories: {{ user.public_repos }}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="row">
      <div class="col-sm-12">
        <RepoCarusel />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import TimeSince from "@/components/common/TimeSince.vue";
import RepoCarusel from "@/components/home/github-overview/RepoCarusel.vue";
import { IUserData, IRepository } from "@/interfaces/user-data.interface";
import Api from "@/config/api";

export default Vue.extend({
  name: "GithubOverview",
  components: {
    TimeSince,
    RepoCarusel
  },
  props: {},
  data: function(): { user: IUserData | null; repositories: IRepository[] } {
    return {
      user: null,
      repositories: []
    };
  },
  computed: {
    hasUser: function(): boolean {
      return this.user !== null;
    },
    hasRepositories: function(): boolean {
      return this.repositories.length > 0;
    }
  },
  methods: {
    setUser: function(data: IUserData) {
      this.user = data;
    },
    downloadUserInfo: function() {
      const url = Api()
        .github()
        .user();

      axios.get(url).then(res => this.setUser(res.data));
    }
  },
  mounted: function() {
    this.downloadUserInfo();
  }
});
</script>

<style scoped lang="scss">
img {
  border: 1px solid transparent;
  border-radius: 50%;

  &.github-icon {
    height: 100px;
  }

  &.repo-avatar {
    height: 25px;
  }
}
</style>
