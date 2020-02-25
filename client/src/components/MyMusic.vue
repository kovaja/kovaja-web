<template>
  <ContentCard class="justify-content-center">
    <div class="col-12 col-md-8">
      <h3 class="m-0 pt-5 pb-2 px-5">What am I listening to</h3>
      <p class="px-5">
        There is no day without Spotify for me. Here is a list of the most
        recently played songs
        <!-- TODO is this good enough? -->
      </p>

      <div v-if="tracks.length === 0" class="px-5 py-2">
        <p>
          <i>
            Either (and very unlikely) there is no music I have been listening
            to or the Spotify is not responding </i
          >😢
        </p>
      </div>

      <div class="px-3">
        <ul class="list-group track-list shadow">
          <li
            class="list-group-item p-0"
            v-for="(track, index) of tracks"
            :key="'track-' + index"
          >
            <a
              :href="track.url"
              target="_blank"
              class="d-flex align-items-center justify-content-between text-dark text-decoration-none p-2"
            >
              <div class="d-flex align-items-center">
                <img
                  :src="track.image"
                  class="track-list__image mr-2"
                  :alt="'Song image ' + track.name"
                />
                <div class="d-flex flex-column">
                  <span>{{ track.name }}</span>
                  <small>{{ track.artists.join(", ") }}</small>

                  <small class="text-muted">
                    Played <time-since :since="track.played_at" /> ago
                  </small>
                </div>
              </div>
              <div class="px-2">
                <svg-icon name="external" medium />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </ContentCard>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from 'vuex';
import { Actions } from '../store/store';
import ContentCard from "./common/ContentCard.vue";
import TimeSince from './common/TimeSince.vue';
import SvgIcon from './common/SvgIcon.vue';

export default Vue.extend({
  name: "MyMusic",
  components: {
    ContentCard,
    TimeSince,
    SvgIcon
  },
  computed: {
    ...mapState({ tracks: "tracks" })
  },
  created: function () {
    if (this.tracks.length > 0) {
      return;
    }

    this.$store.dispatch(Actions.GET_TRACKS);
  }
});
</script>
<style lang="scss" scoped>
.track-list {
  max-height: 400px;
  overflow-y: auto;
}

.track-list__image {
  height: 80px;
}

.track-list__play-logo {
  height: 25px;
}

.track-list__play-label {
  font-size: 10px;
}
</style>
