<template>
  <FilesSelector
    v-if="!isPlaying"
    v-model:movie="movie"
    v-model:subtitle="subtitle"
    :class="$style.home"
    @done="play"
  />
  <Player
    v-else
    :class="$style.home"
    :movie="movie"
    :subtitle="subtitle"
  />
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
      movie: null,
      subtitle: null,
      isPlaying: false,
    };
  },
  methods: {
    play() {
      this.isPlaying = true;
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
