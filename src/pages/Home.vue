<template>
  <FilesSelector
    v-show="!isPlaying"
    v-model:movie="movie"
    v-model:subtitle="subtitle"
    v-model:subtitle-lang="subtitleLang"
    v-model:primary-lang="primaryLang"
    v-model:translator-service="translatorService"
    :class="$style.home"
    @done="togglePlay"
  />
  <Player
    v-if="isPlaying"
    :class="$style.home"
    :movie="movie"
    :subtitle="subtitle"
    :subtitle-lang="subtitleLang"
    :primary-lang="primaryLang"
    :translator-service="translatorService"
    @stop="togglePlay"
  />
  <div>
    {{ subtitleLang }}
    {{ primaryLang }}
    {{ translatorService }}
  </div>
</template>

<script>
import FilesSelector from '../components/FilesSelector.vue';
import Player from '../components/Player.vue';

export default {
  components: {
    FilesSelector,
    Player,
  },
  data() {
    return {
      movie: undefined,
      subtitle: undefined,
      subtitleLang: undefined,
      primaryLang: undefined,
      translatorService: undefined,
      isPlaying: false,
    };
  },
  methods: {
    togglePlay() {
      this.isPlaying = !this.isPlaying;
    },
  },
  style({ className }) {
    return [
      className('home', {
        width: '100%',
        height: '100%',
        maxHeight: '100%',
      }),
    ];
  },
};
</script>
