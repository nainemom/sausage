<template>
  <Config
    v-show="!isPlaying"
    :class="$style.home"
    @done="isPlaying = true"
  />
  <Player
    v-if="isPlaying"
    :class="$style.home"
    @stop="isPlaying = false"
  />
</template>

<script>
import Config from '../components/Config.vue';
import Player from '../components/player/Player.vue';

const getSubtitlesConfigValue = (name) => {
  try {
    return JSON.parse(localStorage.getItem(`config:${name}`));
  } catch {
    return null;
  }
};

export default {
  components: {
    Config,
    Player,
  },
  provide() {
    return {
      $app: this,
    };
  },
  data() {
    return {
      movie: undefined,
      subtitle: undefined,
      subtitleLang: getSubtitlesConfigValue('subtitleLang') || 'en',
      primaryLang: getSubtitlesConfigValue('primaryLang') || 'fa',
      translatorService: getSubtitlesConfigValue('translatorService') || 'google',
      isPlaying: false,
    };
  },
  watch: {
    subtitleLang(value) {
      localStorage.setItem('config:subtitleLang', JSON.stringify(value));
    },
    primaryLang(value) {
      localStorage.setItem('config:primaryLang', JSON.stringify(value));
    },
    translatorService(value) {
      localStorage.setItem('config:translatorService', JSON.stringify(value));
    },
  },
  methods: {
    setSubtitleConfigProp(name, value) {
      if (!['subtitleLang', 'primaryLang', 'translatorService'].includes(name)) return;
      localStorage.setItem(`subtitle-config:${name}`, JSON.stringify(value));
      this[name] = value;
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
