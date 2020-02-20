<template>
  <ContentCard class="justify-content-center">
    <div class="col-12 col-md-8">
      <h3 class="m-0 pt-5 pb-2 px-5">What I like to read</h3>
      <p class="px-5">
        Do you know the Pocket app? I usually save interesting articles for
        later.
      </p>

      <div v-if="articles.length === 0" class="px-5 py-2">
        <p>
          <i>
            Either (and very unlikely) I have no articles to read or Pocket is not responsing
          </i>😢
        </p>
      </div>

      <app-carousel v-else :data="articles" class="px-5 pt-2 pb-5">
        <template v-slot:item="{ item }">
          <article-card :article="item" />
        </template>
      </app-carousel>
    </div>
  </ContentCard>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from 'vuex';
import { Actions } from '../store/store';
import ArticleCard from './ArticleCard.vue';
import ContentCard from "./common/ContentCard.vue";
import AppCarousel from './common/AppCarousel.vue';

interface IComponentData {
  activeIndex: number;
}

export default Vue.extend({
  name: "MyReads",
  components: {
    ContentCard,
    AppCarousel,
    ArticleCard
  },
  data(): IComponentData {
    return {
      activeIndex: 2
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
    moveItem(diff: number) {
      let newActive = this.activeIndex + diff;

      if (newActive < 0) {
        newActive = this.articles.length - 1;
      } else if (newActive > this.articles.length - 1) {
        newActive = 0;
      }

      this.activeIndex = newActive;
    }
  }
});
</script>

<style lang="scss" scoped>
.swipe-wrapper {
  display: none;

  &.active {
    display: flex;
    flex-wrap: wrap;
  }
}

.swipe__button-move {
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
