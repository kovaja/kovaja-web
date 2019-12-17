<template>
  <ul>
    <li v-for="(article, index) of articles" :key="'article' + index">
      <img
        :src="article.image"
        alt="Article image"
        height="100px"
        width="100px"
      />
      <a :href="article.resolved_url" target="_blank">{{
        article.resolved_title
      }}</a>
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
