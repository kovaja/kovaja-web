<template>
  <span>{{sinceValue}}</span>
</template>

<script lang="ts">
import Vue from "vue";
import {getSinceTime} from "../utilities/common.utility";

export default Vue.extend({
  name: "TimeSince",
  props: {
    since: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      intervalRef: 0,
      sinceValue: ""
    };
  },
  methods: {
    updateSinceValue: function() {
      this.sinceValue = getSinceTime(this.since);
    }
  },
  mounted: function() {
    this.updateSinceValue();
    this.intervalRef = window.setInterval(() => {
      this.updateSinceValue();
    }, 1000 * 60);
  },
  beforeDestroy: function() {
    window.clearInterval(this.intervalRef);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
