<template>
  <div class="card bg-dark text-white">
    <div class="card-body">
      <h5 class="card-title">{{ repository.name }}</h5>
      <h6 v-if="hasDescription" class="card-subtitle mb-2 text-muted">
        {{ repository.description }}
      </h6>
      <h6 v-if="hasDescription === false" class="card-subtitle mb-2 text-muted">
        Without description
      </h6>
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-dark text-white">
          Created
          <TimeSince :since="repository.created_at" />ago
        </li>
        <li class="list-group-item bg-dark text-white">
          Last push
          <TimeSince :since="repository.pushed_at" />ago
        </li>
      </ul>
      <a :href="repository.html_url" target="_blank" class="card-link text-white">Visit</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import axios from "axios";
import TimeSince from "@/components/common/TimeSince.vue";
import { IUserData, IRepository } from "@/interfaces/user-data.interface";
import Api from "@/config/api";

export default Vue.extend({
  name: "RepoCaruselItem",
  components: { TimeSince },
  props: {
    repository: {
      type: Object as PropType<IRepository>,
      required: true
    }
  },
  computed: {
    hasDescription: function(): boolean {
      return typeof this.repository.description === "string";
    }
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
