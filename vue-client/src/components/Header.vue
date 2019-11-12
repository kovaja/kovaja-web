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
        <router-link class="nav-link" to="/home">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/projects">Projects</router-link>
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
