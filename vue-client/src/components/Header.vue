<template>
  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="/">
      <img
        src="../assets/logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      />
      Kovaja
    </a>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a class="nav-link active" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Projects</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "Header"
});
</script>

<style scoped lang="scss">
</style>
