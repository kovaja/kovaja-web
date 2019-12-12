<template>
  <div class="p-4 shadow bg-white">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ContentCard"
});
</script>
