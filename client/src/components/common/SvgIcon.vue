<template>
  <svg
    :height="size"
    :width="size"
    :fill="fill"
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
    },
    medium: {
      type: Boolean,
      required: false,
      default: false
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    },
    filled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    color(): string {
      if (this.bright) {
        return '#ffffff'
      }

      // default dark
      return '#000000'
    },
    size(): number {
      if (this.large) {
        return 30;
      }

      if (this.medium) {
        return 20;
      }

      // default small
      return 10
    },
    fill(): string {
      if (this.filled) {
        return this.color;
      }

      return 'transparent';
    }
  }
});
</script>
