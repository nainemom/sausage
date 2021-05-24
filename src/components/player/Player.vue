<template>
  <div>
    <video
      ref="player"
      :class="$style.player"
      @play="onPlayerStateUpdate"
      @pause="onPlayerStateUpdate"
      @timeupdate="onPlayerStateUpdate"
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
    <Subtitle :class="$style.subtitle" />
    <Controls :class="$style.controls" />
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
  provide() {
    return {
      $player: this,
    };
  },
  inject: ['$app'],
  emits: ['stop'],
  data() {
    return {
      allCues: [],
      activeCues: [],
      lockedCues: [],
      isPaused: false,
      duration: 0,
      currentTime: 0,
    };
  },
  computed: {
    movieSrc() {
      return URL.createObjectURL(this.$app.movie);
    },
    subtitleSrc() {
      return URL.createObjectURL(this.$app.subtitle);
    },
  },
  mounted() {
    this.play();
    const lastSavedCurrentTime = window[`${this.$app.movie.name}`];
    if (typeof lastSavedCurrentTime === 'number') {
      this.$nextTick(() => {
        this.setCurrentTime(lastSavedCurrentTime);
      });
    }
  },
  methods: {
    onSubtitleTrackLoad(event) {
      this.allCues = Object.freeze([...event.target.track.cues]);
    },
    onCueChange(event) {
      const activeCues = Object.freeze([...event.target.track.activeCues]);
      this.activeCues = activeCues;
    },
    onPlayerStateUpdate() {
      const { player } = this.$refs;
      if (player) {
        this.isPaused = player.paused;
        this.currentTime = player.currentTime;
        this.duration = player.duration;
        window[`${this.$app.movie.name}`] = player.currentTime;
      }
    },
    stop() {
      this.$emit('stop');
    },
    play() {
      const { player } = this.$refs;
      if (player.paused) {
        player.play();
        return true;
      }
      return false;
    },
    pause() {
      const { player } = this.$refs;
      if (!player.paused) {
        player.pause();
        return true;
      }
      return false;
    },
    togglePlay() {
      const isPlayed = this.play();
      if (!isPlayed) {
        this.pause();
      }
    },
    setCurrentTime(newTime) {
      this.$refs.player.currentTime = newTime; // this will cause onPlayerStateUpdate
    },
    lockCues() {
      this.lockedCues = this.activeCues;
    },
    unlockCues() {
      this.lockedCues = [];
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
