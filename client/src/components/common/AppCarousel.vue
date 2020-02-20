<template>
  <div class="px-5 d-flex flex-column position-relative">
    <div
      class="swipe-wrapper"
      v-for="(item, index) of data"
      :key="'swipe-item' + index"
      :class="{ active: index === activeIndex }"
    >
      <slot name="item" :item="item" />
    </div>

    <a
      class="swipe__button-move prev btn btn-light"
      role="button"
      href="#"
      @click.prevent="moveItem(-1)"
      ><svg-icon name="chevron-left" stroke-width="7px"
    /></a>

    <a
      class="swipe__button-move next btn btn-light"
      role="button"
      href="#"
      @click.prevent="moveItem(+1)"
      ><svg-icon name="chevron-right" stroke-width="7px"
    /></a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";

interface IComponentData {
  activeIndex: number;
}

export default Vue.extend({
  name: "AppCarousel",
  components: {
    SvgIcon
  },
  props: {
    data: Array
  },
  data(): IComponentData {
    return {
      activeIndex: 0
    }
  },
  methods: {
    moveItem(diff: number) {
      const maxIndex = this.data.length - 1;
      let newActive = this.activeIndex + diff;

      if (newActive < 0) {
        newActive = maxIndex
      } else if (newActive > maxIndex) {
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
  top: calc(40% - 50px);
  height: 100px;
  display: flex;
  align-items: center;

  &.prev {
    left: -10px;
  }

  &.next {
    right: -10px;
  }
}
</style>
