<template>
  <Config
    v-show="!isPlaying"
    v-model:movie="movie"
    v-model:subtitle="subtitle"
    v-model:subtitle-lang="subtitleLang"
    v-model:primary-lang="primaryLang"
    v-model:translator-service="translatorService"
    :class="$style.home"
    @done="isPlaying = true"
  />
  <Player
    v-if="isPlaying"
    :class="$style.home"
    :movie="movie"
    :subtitle="subtitle"
    :subtitle-lang="subtitleLang"
    :primary-lang="primaryLang"
    :translator-service="translatorService"
    @stop="isPlaying = false"
  />
</template>

<script>
import Config from '../components/Config.vue';
import Player from '../components/player/Player.vue';

export default {
  components: {
    Config,
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
