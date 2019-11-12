<template>
  <div id="app" class="container-fluid p-0">
    <Header />
    <main class="container-fluid">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "./components/Header.vue";

export default Vue.extend({
  name: "app",
  components: { Header }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
