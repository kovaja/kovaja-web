<template>
  <div class="row align-items-center">
    <div class="col-md-12 col-lg-6">
      <ContentCard>
        <h1>Articles</h1>
        <p>
          Articles I am currently reading
        </p>
        <Articles />
      </ContentCard>
    </div>
    <div class="col-md-12 col-lg-6">
      <ContentCard>
        <h1>Podcasts</h1>
        <p>
          Music I am currently listening
        </p>
        <Tracks />
      </ContentCard>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ContentCard from "@/components/common/ContentCard.vue";
import Articles from "@/components/favorites/Articles.vue";
import Tracks from "@/components/favorites/Tracks.vue";

export default Vue.extend({
  name: "Favorites",
  components: {
    ContentCard,
    Articles,
    Tracks
  }
});
</script>
