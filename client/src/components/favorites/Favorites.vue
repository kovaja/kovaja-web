<template>
  <div class="row align-items-center">
    <div class="col-md-12 col-lg-4">
      <ContentCard>
        <h1>Articles</h1>
        <p>
          Articles I am currently reading
        </p>
        <Articles />
      </ContentCard>
    </div>
    <div class="col-md-12 col-lg-4">
      <ContentCard>
        <h1>Podcasts</h1>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Nullam lectus justo,
          vulputate eget mollis sed, tempor sed magna. Phasellus rhoncus.
          Aliquam id dolor.
        </p>
      </ContentCard>
    </div>
    <div class="col-md-12 col-lg-4">
      <ContentCard>
        <h1>Sports</h1>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Nullam lectus justo,
          vulputate eget mollis sed, tempor sed magna. Phasellus rhoncus.
          Aliquam id dolor.
        </p>
      </ContentCard>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ContentCard from "@/components/common/ContentCard.vue";
import Articles from "@/components/favorites/articles/Articles.vue";

export default Vue.extend({
  name: "Favorites",
  components: {
    ContentCard,
    Articles
  }
});
</script>
