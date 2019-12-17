<template>
  <ul>
    <li v-for="(article, index) of articles" :key="'article' + index">
      <img :src="article.image" alt="Article image" height="100px" width="100px" />
      <h3>{{ article.resolved_title }}</h3>
      <p>{{ article.excerpt }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Actions } from "@/store/store";
import { mapState } from "vuex";

export default Vue.extend({
  name: "Articles",
  computed: {
    ...mapState({ articles: "articles" })
  },
  created: function() {
    this.$store.dispatch(Actions.GET_ARTICLES);
  }
});
</script>
