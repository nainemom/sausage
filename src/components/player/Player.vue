<template>
  <div>
    <video
      ref="player"
      :class="$style.player"
      autoplay
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeUpdate($event.target.currentTime)"
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
import filesConfigProps from '../../mixins/filesConfigProps';
import subtitleConfigProps from '../../mixins/subtitleConfigProps';

export default {
  components: {
    Subtitle,
    Controls,
  },
  mixins: [
    filesConfigProps,
    subtitleConfigProps,
  ],
  props: {
    currentTime: {
      type: Number,
      default: 0,
    },
  },
  emits: ['stop', 'update:currentTime'],
  data() {
    return {
      allCues: [],
      activeCues: [],
      isPaused: false,
      duration: 0,
      started: false,
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
  mounted() {
    this.updateTime(this.currentTime);
    this.started = true;
  },
  methods: {
    onSubtitleTrackLoad(event) {
      this.allCues = Object.freeze([...event.target.track.cues]);
    },
    onCueChange(event) {
      const activeCues = Object.freeze([...event.target.track.activeCues]);
      this.activeCues = activeCues;
    },
    onTimeUpdate(newCurrentTime) {
      if (this.started) {
        this.$emit('update:currentTime', newCurrentTime);
      }
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
