<template>
  <ul class="list-group list-group-flush list-group-articles">
    <li
      v-for="(track, index) of tracks"
      :key="'article' + index"
      class="list-group-item"
    >
      <div class="card border-0" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-2 d-flex align-items-center">
            <img :src="track.image" class="card-img" alt="Article image" />
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <h5 class="card-title">
                <a :href="track.url" target="_blank">
                  {{ track.name }}
                </a>
              </h5>
              <p class="card-text">
                <small>
                  {{ track.album }}
                </small>
              </p>
              <p class="card-text">
                <small class="text-muted">{{ track.artists.join(", ") }}</small>
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
  name: "Tracks",
  computed: {
    ...mapState({ tracks: "tracks" })
  },
  created: function() {
    if (this.tracks.length > 0) {
      return;
    }

    this.$store.dispatch(Actions.GET_TRACKS);
  }
});
</script>

<style scoped lang="scss">
.list-group-articles {
  max-height: 500px;
  overflow-y: auto;
}
</style>
