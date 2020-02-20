<template>
  <svg
    :height="size"
    :width="size"
    fill="transparent"
    :stroke="color"
    :stroke-width="stokeWidth"
  >
    <use v-bind:xlink:href="'#i-' + name"></use>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    bright: {
      type: Boolean,
      required: false,
      default: false
    },
    stokeWidth: {
      type: String,
      required: false,
      default: '3px'
    }
  },
  computed: {
    color() {
      if (this.bright) {
        return '#ffffff'
      }

      // default dark
      return '#000000'
    },
    size() {
      // default small
      return 10
    }
  }
});
</script>
