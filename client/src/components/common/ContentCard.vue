<template>
  <div class="row m-0">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ContentCard"
});
</script>
