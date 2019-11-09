<template>
  <span>{{ sinceValue }}</span>
</template>

<script lang="ts">
import Vue from "vue";
import { getSinceTime } from "../../utilities/common.utility";

export default Vue.extend({
  name: "TimeSince",
  props: {
    since: {
      type: String,
      required: true
    }
  },
  computed: {
    sinceValue: function(): string {
      return getSinceTime(this.since);
    }
  }
});
</script>
