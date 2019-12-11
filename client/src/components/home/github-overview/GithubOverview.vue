<template>
  <div class="p-4 shadow w-100">
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
import TimeSince from "@/components/common/TimeSince.vue";
import RepoCarusel from "@/components/home/github-overview/RepoCarusel.vue";
import { IUserData, IRepository } from "../../../../../shared/api.schemas";
import { Actions, IState } from "@/store/store";
import { mapState } from "vuex";

export default Vue.extend({
  name: "GithubOverview",
  components: {
    TimeSince,
    RepoCarusel
  },
  props: {},
  computed: {
    ...mapState({ user: "user" }),
    hasUser: function(): boolean {
      return this.user !== null;
    }
  },
  created: function() {
    if (this.user !== null) {
      return;
    }

    this.$store.dispatch(Actions.GET_USER);
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
