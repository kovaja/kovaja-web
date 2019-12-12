<template>
  <svg class="background-animation-svg">
    <rect
      width="300"
      height="100"
      style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BackgroundAnimation"
});
</script>

<style lang="scss" scoped>
.background-animation-svg {
  position: fixed;
  border: 1px solid red;
  width: 100%;
  top: 75px;
  height: calc(100% - 75px);
}
</style>
