<template>
  <footer class="p-3 bg-dark">
    <!-- TODO: better icons, or images -->
    <div class="footer__links">
      <a :href="github" target="_blank">
        <svg-icon name="github" bright filled medium />
      </a>
      <a :href="twitter" target="_blank">
        <svg-icon name="twitter" bright filled medium />
      </a>
      <a :href="linkedin" target="_blank">
        <svg-icon name="linkedin" bright medium />
      </a>
    </div>


    <div class="footer__version text-muted">Version: {{ version }}</div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import SvgIcon from "./common/SvgIcon.vue";

interface IComponentData {
  github: string;
  twitter: string;
  linkedin: string;
}

export default Vue.extend({
  name: "AppFooter",
  components: {
    SvgIcon
  },
  data(): IComponentData {
    return {
      github: 'https://github.com/kovaja',
      twitter: 'https://twitter.com/norddick',
      linkedin: 'https://www.linkedin.com/in/kovarikjakub/'
    };
  },
  computed: {
    ...mapState(['version'])
  }
});
</script>

<style lang="scss">
footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.footer__links {
  a {
    &:not(:last-child) {
      margin-right: 1em;
    }
  }
}
</style>
