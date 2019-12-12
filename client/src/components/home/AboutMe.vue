<template>
  <ContentCard>
    <h1 class="mb-4">Hi, I'm Kuba</h1>
    <p class="lead">
      A Frontend developer, based in Prague. Suspendisse nisl. Nunc auctor. Cras
      pede libero, dapibus nec, pretium sit amet, tempor quis. Duis ante orci,
      molestie vitae vehicula venenatis, tincidunt ac pede. Proin mattis lacinia
      justo. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas
      nulla, et sollicitudin sem purus in lacus. Maecenas aliquet accumsan leo.
      Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Nullam
      rhoncus aliquam metus. Praesent in mauris eu tortor porttitor accumsan.
      Aenean placerat. Mauris dolor felis, sagittis at, luctus sed, aliquam non,
      tellus.
    </p>
  </ContentCard>
</template>

<script lang="ts">
import Vue from "vue";
import ContentCard from "@/components/common/ContentCard.vue";

export default Vue.extend({
  name: "AboutMe",
  components: {
    ContentCard
  }
});
</script>
