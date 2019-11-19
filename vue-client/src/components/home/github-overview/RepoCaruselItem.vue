<template>
  <div class="card bg-dark text-white">
    <div class="card-body">
      <h5 class="card-title d-inline-flex justify-content-between w-100">{{ repository.name }}
        <a :href="repository.html_url" target="_blank" class="card-link">Visit</a>
      </h5>
      <h6 v-if="hasDescription" class="card-subtitle mb-2 text-muted text-truncate">
        {{ repository.description }}
      </h6>
      <h6 v-if="hasDescription === false" class="card-subtitle mb-2 text-muted">
        Without description
      </h6>
      <ul class="list-group list-group-flush p-2 pb-5">
        <li class="list-group-item bg-dark text-white">
          Created
          <TimeSince :since="repository.created_at" />ago
        </li>
        <li class="list-group-item bg-dark text-white">
          Last push
          <TimeSince :since="repository.pushed_at" />ago
        </li>
      </ul>

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
