<template>
  <div class="row align-items-center justify-content-center">
    <UnderConstruction />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UnderConstruction from "@/components/common/UnderConstruction.vue";

export default Vue.extend({
  name: "Projects",
  components: { UnderConstruction }
});
</script>
