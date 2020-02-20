<template>
  <div class="row article__card shadow align-items-center">
    <div class="col-12 col-md-4 p-0 p-md-4 article__image-wrapper">
      <img
        :src="article.image"
        class="d-block float-left article__image"
        alt="Article image"
      />
    </div>
    <div class="col-12 col-md-8 p-4">
      <h5>
        <a :href="article.resolved_url" target="_blank" class="d-inline">
          {{ article.resolved_title }}
        </a>
      </h5>
      <p>
        {{ article.excerpt }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { IArticle } from "../../../shared/api.schemas";

export default Vue.extend({
  name: "ArticleCard",
  props: {
    article: Object as PropType<IArticle>
  }
});
</script>

<style lang="scss" scoped>
p {
  word-break: break-word;
}

.article__image {
  width: 100%;
  min-width: 50px;
  min-height: 50px;
}
</style>