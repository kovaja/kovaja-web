<template>
  <ContentCard class="justify-content-center">
    <div class="col-12 col-md-8">
      <h3 class="m-0 pt-5 pb-2 px-5">What I like to read</h3>
      <p class="px-5">Do you know the Pocket app? I usually save interesting articles for later.</p>

      <div v-if="articles.length === 0" class="px-5 py-2">
        <p>
          <i>Either (and very unlikely) I have no articles to read or Pocket is not
          responsing</i> 😢
        </p>
      </div>
      <div v-else class="px-5 py-2 d-flex flex-column position-relative">
        <div
          v-for="(article, index) of articles"
          :key="'article-item' + index"
          class="row article__card shadow align-items-center"
          :class="{ active: index === activeArticle }"
        >
          <div class="col-12 col-md-4 p-0 p-md-4 article__image-wrapper">
            <img
              :src="article.image"
              class="d-block float-left mr-4 article__image"
              alt="Article image"
            />
          </div>
          <div class="col-12 col-md-8 p-4">
            <h4>
              {{ article.resolved_title }}
              <a :href="article.resolved_url" target="_blank" class="d-inline"
                >💻</a
              >
            </h4>

            <p>
              {{ article.excerpt }}
            </p>
          </div>
        </div>

        <div class="p-4 d-flex justify-content-center">
          <template v-if="articles.length <= 15">
            <div class="d-flex justify-content-between">
              <span
                v-for="(article, index) of articles"
                :key="'article-indicator' + index"
                class="article__indicator"
                :class="{ active: index === activeArticle }"
              ></span>
            </div>
          </template>
          <template v-else>
            <div class="articles-swipe-hint">
              Swipe to browse articles
              <!-- TODO, resolve how to handle too many carusel items -->
            </div>
          </template>
        </div>

        <!-- TODO: ugly ugly ugly -->
        <a
          class="article__button-move prev btn btn-secondary"
          role="button"
          href="#"
          @click.prevent="moveArticle(-1)"
          >&lt;</a
        >
        <a
          class="article__button-move next btn btn-secondary"
          role="button"
          href="#"
          @click.prevent="moveArticle(+1)"
          >&gt;</a
        >
      </div>
    </div>
  </ContentCard>
</template>

<script lang="ts">
import Vue from "vue";
import ContentCard from "@/components/common/ContentCard.vue";
import { mapState } from 'vuex';
import { Actions } from '../store/store';

interface IComponentData {
  activeArticle: number;
}

export default Vue.extend({
  name: "MyReads",
  components: {
    ContentCard
  },
  data(): IComponentData {
    return {
      activeArticle: 2
    }
  },
  computed: {
    ...mapState({ articles: "articles" })
  },
  created: function () {
    if (this.articles.length > 0) {
      return;
    }

    this.$store.dispatch(Actions.GET_ARTICLES);
  },
  methods: {
    moveArticle(diff: number) {
      let newActive = this.activeArticle + diff;

      if (newActive < 0) {
        newActive = this.articles.length - 1;
      } else if (newActive > this.articles.length - 1) {
        newActive = 0;
      }

      this.activeArticle = newActive;
    }
  }
});
</script>

<style lang="scss" scoped>
.article__card {
  display: none;

  &.active {
    display: flex;
    flex-wrap: wrap;
  }
}

.article__image {
  width: 100%;
}

.article__indicator {
  border: 1px solid transparent;
  border-radius: 5px;
  height: 10px;
  width: 10px;
  background-color: rgba(0, 0, 0, 0.3);

  &.active {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.articles-swipe-hint {
  font-style: italic;
}

.article__button-move {
  position: absolute;
  top: 30%;

  &.prev {
    left: 5px;
  }

  &.next {
    right: 5px;
  }
}
</style>
