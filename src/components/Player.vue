<template>
  <div>
    <video
      ref="player"
      :class="$style.player"
      autoplay
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeUpdate"
    >
      <source
        :src="movieSrc"
        type="video/mp4"
      >
      <track
        ref="subtitleTrack"
        kind="subtitles"
        label="Subtitle"
        default
        :src="subtitleSrc"
        @load="onSubtitleTrackLoad"
        @cuechange="onCueChange"
      >
    </video>
    <Subtitle
      :class="$style.subtitle"
      :active-cues="activeCues"
      :subtitle-lang="subtitleLang"
      :primary-lang="primaryLang"
      :translator-service="translatorService"
    />
    <Controls
      :class="$style.controls"
      :all-cues="allCues"
      :active-cues="activeCues"
      :is-paused="isPaused"
      :current-time="currentTime"
      :duration="duration"
      @togglePlay="togglePlay"
      @updateTime="updateTime"
      @stop="stop"
    />
  </div>
</template>

<script>
import Subtitle from './Subtitle.vue';
import Controls from './Controls.vue';

export default {
  components: {
    Subtitle,
    Controls,
  },
  props: {
    movie: {
      type: File,
      required: true,
    },
    subtitle: {
      type: File,
      required: true,
    },
    subtitleLang: {
      type: String,
      required: true,
    },
    primaryLang: {
      type: String,
      required: true,
    },
    translatorService: {
      type: String,
      required: true,
    },
  },
  emits: ['stop'],
  data() {
    return {
      allCues: [],
      activeCues: [],
      isPaused: false,
      currentTime: 0,
      duration: 0,
    };
  },
  computed: {
    movieSrc() {
      return URL.createObjectURL(this.movie);
    },
    subtitleSrc() {
      return URL.createObjectURL(this.subtitle);
    },
  },
  methods: {
    onSubtitleTrackLoad(event) {
      this.allCues = Object.freeze([...event.target.track.cues]);
    },
    onCueChange(event) {
      const activeCues = Object.freeze([...event.target.track.activeCues]);
      this.activeCues = activeCues;
    },
    onTimeUpdate(event) {
      this.currentTime = event.target.currentTime;
    },
    onPlay() {
      const { player } = this.$refs;
      this.duration = player.duration;
      this.isPaused = false;
    },
    onPause() {
      this.isPaused = true;
    },
    stop() {
      this.$emit('stop');
    },
    togglePlay() {
      const { player } = this.$refs;
      if (!player.paused) {
        player.pause();
      } else {
        player.play();
      }
    },
    updateTime(newTime) {
      const { player } = this.$refs;
      player.currentTime = newTime;
    },
  },
  style({ className }) {
    return [
      className('player', {
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        background: '#000',
        '&::cue': {
          opacity: 0,
        },
      }),
      className('subtitle', {
        position: 'absolute',
        bottom: '120px',
      }),
      className('controls', {
        position: 'absolute',
        bottom: 0,
      }),
    ];
  },
};
</script>
