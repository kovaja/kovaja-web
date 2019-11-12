<template>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand flex align-items-center" href="/">
      <img src="@/assets/logo.png" class="mr-4" alt="" />
      Kovaja
    </a>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <router-link class="nav-link text-light" to="/home">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-light" to="/favorites">What do I like</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-light" to="/projects"
          >Projects</router-link
        >
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
.navbar-brand {
  img {
    height: 50px;
    width: 50px;
  }
}
</style>
