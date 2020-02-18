<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <a class="navbar-brand flex" href="/">
      Kovaja
    </a>

    <button
      class="navbar-toggler"
      type="button"
      @click="toggleMenu"
      aria-controls="navbar-toggler"
      aria-expanded="false"
      aria-label="toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      :class="{ show: isMenuVisible }"
      class="collapse navbar-collapse justify-content-end"
      id="navbar-toggler"
    >
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link text-dark" href="/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" href="/favorites">What do I like</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" href="/projects">Projects</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

interface IComponentData {
  isMenuVisible: boolean;
}

export default Vue.extend({
  name: "Header",
  data(): IComponentData {
    return {
      isMenuVisible: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    }
  }
});
</script>

<style lang="scss" scoped>
.navbar-collapse {
  &.show {
    .nav {
      flex-direction: column;
      align-items: flex-end;
    }
  }
}
</style>