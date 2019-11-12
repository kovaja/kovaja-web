<template>
  <div id="app" class="vh-100">
    <div class="container-fluid d-flex flex-column h-100 p-0">
      <Header class="flex-shrink-0"/>
      <main class="container-fluid flex-grow-1 d-flex flex-column align-items-center">
        <div class="flex-grow-1 d-flex">
          <router-view></router-view>
        </div>
      </main>
    </div>
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
