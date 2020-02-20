<template>
  <ContentCard class="title">
    <div class="title__overlay d-flex justify-content-center ">
      <div class="col-6 text-center text-white title__text">
        <div class="mt-2 px-2 pt-5 pb-1" style="border-bottom: 1px solid;">
          <h1>Hi, I'm Kuba</h1>
        </div>
        <p class="p-2 title__bio">And the code below is actually mine</p>
        <!-- TODO: fixuj obrazek at v tom nejsou typos :D -->
      </div>
    </div>
  </ContentCard>
</template>

<script lang="ts">
import Vue from "vue";
import ContentCard from "@/components/common/ContentCard.vue";

export default Vue.extend({
  name: "AppTitle",
  components: {
    ContentCard
  }
});
</script>
<style lang="scss" scoped>
.title {
  height: 50vh;
  /* TODO: replace image */
  background-image: url("../assets/title-image.png");
  background-size: cover;
  position: relative;
}

.title__overlay {
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.title__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title__bio {
  font-style: italic;
}
</style>
