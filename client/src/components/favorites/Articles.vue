<template>
  <ul class="list-group list-group-flush list-group-articles">
    <li
      v-for="(article, index) of articles"
      :key="'article' + index"
      class="list-group-item"
    >
      <div class="card border-0" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-2 d-flex align-items-center">
            <img :src="article.image" class="card-img" alt="Article image" />
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <h5 class="card-title">
                <a :href="article.resolved_url" target="_blank">
                  {{ article.resolved_title }}
                </a>
              </h5>
              <p class="card-text">
                <small>
                  {{ article.excerpt }}
                </small>
              </p>
              <p class="card-text">
                <small class="text-muted">{{ article.shortened_url }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
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

<style scoped lang="scss">
.list-group-articles {
  max-height: 500px;
  overflow-y: auto;
}
</style>
