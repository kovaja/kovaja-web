<template>
  <transition name="fade">
    <div class="carousel slide" v-if="hasRepositories">
      <ol class="carousel-indicators">
        <li
          v-for="(repo, index) of repositories"
          :key="'nav-' + repo.id"
          :class="{ active: activeIndex === index }"
          :title="repo.name"
          @click="activateRepo(index)"
        ></li>
      </ol>
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(repo, index) of repositories"
          :key="'inner-' + repo.id"
          :class="{ active: activeIndex === index }"
        >
          <RepoCaruselItem :repository="repo" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
interface ICaruselData {
  repositories: IRepository[];
  activeIndex: number;
  intervalRef: number;
}

import Vue from "vue";
import axios from "axios";
import Api from "@/config/api";
import RepoCaruselItem from "./RepoCaruselItem.vue";
import { IUserData, IRepository } from "@/interfaces/user-data.interface";

export default Vue.extend({
  name: "RepoCarusel",
  components: {
    RepoCaruselItem
  },
  data: function(): ICaruselData {
    return {
      repositories: [],
      activeIndex: 0,
      intervalRef: 0
    };
  },
  computed: {
    hasRepositories: function(): boolean {
      return this.repositories.length > 0;
    }
  },
  methods: {
    incrementActive: function() {
      let newActive = this.activeIndex + 1;

      if (newActive >= this.repositories.length) {
        newActive = 0;
      }

      this.activateRepo(newActive);
    },
    startCarusel: function() {
      this.intervalRef = window.setInterval(() => this.incrementActive(), 3000);
    },
    setRepositories: function(repos: IRepository[]) {
      this.repositories = repos;
      this.startCarusel();
    },
    downloadRepositories: function() {
      const url = Api()
        .github()
        .repos();

      axios.get(url).then(res => this.setRepositories(res.data));
    },
    activateRepo: function(repo: number) {
      this.activeIndex = repo;
    }
  },
  mounted: function() {
    this.downloadRepositories();
  },
  beforeDestroy: function() {
    window.clearInterval(this.intervalRef);
  }
});
</script>

<style scoped lang="scss">
.repo-avatar {
  border: 1px solid transparent;
  border-radius: 50%;
  height: 100px;
}
</style>
