<template>
  <div
    :class="$style.controls"
  >
    <div class="buttons">
      <button
        :disabled="!!lockedCues.length"
        @click="prevCue"
      >
        <Icon
          :size="42"
          name="arrow-left"
        />
      </button>
      <button
        :disabled="!!lockedCues.length"
        @click="togglePlay"
      >
        <Icon
          :size="42"
          :name="isPaused ? 'play' : 'pause'"
        />
      </button>
      <button
        :disabled="!activeCues.length"
        @click="toggleLock"
      >
        <Icon
          :size="42"
          name="lock-reset"
        />
      </button>
      <button
        :disabled="!!lockedCues.length"
        @click="nextCue"
      >
        <Icon
          :size="42"
          name="arrow-right"
        />
      </button>
      <div class="line" />
      <button
        @click="stop"
      >
        <Icon
          :size="42"
          name="close"
        />
      </button>
    </div>
    <div class="progress">
      <Range
        :disabled="!!lockedCues.length"
        :length="duration * 10"
        :value="currentTime * 10"
        @input="updateTime($event / 10)"
      />
    </div>
  </div>
</template>

<script>
import Range from '../common/Range.vue';
import Icon from '../common/Icon.vue';

export default {
  components: {
    Range,
    Icon,
  },
  props: {
    allCues: {
      type: Array,
      default: () => [],
    },
    activeCues: {
      type: Array,
      default: () => [],
    },
    isPaused: {
      type: Boolean,
    },
    currentTime: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  emits: ['togglePlay', 'updateTime', 'stop'],
  data() {
    return {
      lockedCues: [],
    };
  },
  computed: {
    formattedCurrentTime() {
      return Math.floor(this.currentTime).toString().padStart(4, 0);
    },
    formattedDuration() {
      return Math.floor(this.duration).toString().padStart(4, 0);
    },
  },
  watch: {
    currentTime(currentTime) {
      if (this.lockedCues.length) {
        const startTime = Math.max(...this.lockedCues.map((cue) => cue.startTime));
        const endTime = Math.min(...this.lockedCues.map((cue) => cue.endTime));
        if (currentTime + 1 >= endTime) {
          setTimeout(() => {
            this.$emit('updateTime', startTime);
          }, (endTime - currentTime - 0.1) * 1000);
        }
      }
    },
  },
  methods: {
    togglePlay() {
      this.$emit('togglePlay');
    },
    nextCue() {
      const nextCue = this.allCues.find((cue) => cue.startTime >= this.currentTime);
      if (nextCue) {
        this.$emit('updateTime', nextCue.startTime);
      }
    },
    prevCue() {
      const nextCueIndex = this.allCues.findIndex((cue) => cue.startTime >= this.currentTime);
      if (nextCueIndex > 0 && this.allCues[nextCueIndex - 2]) {
        this.$emit('updateTime', this.allCues[nextCueIndex - 2].startTime);
      }
    },
    toggleLock() {
      if (!this.activeCues.length) return;
      this.lockedCues = this.lockedCues.length ? [] : this.activeCues;
    },
    updateTime(newTime) {
      this.$emit('updateTime', newTime);
    },
    stop() {
      this.$emit('stop');
    },
  },
  style({ className }) {
    return [
      className('controls', {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        '& > .buttons': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          '& > .line': {
            width: '2px',
            height: '30px',
            background: '#333',
            margin: '0 6px',
          },
          '& > button': {
            margin: '0 4px',
            cursor: 'pointer',
            padding: '8px',
            '&:not(:disabled):hover': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
            '&:disabled': {
              cursor: 'not-allowed',
              opacity: 0.4,
            },
          },
        },
        '& > .progress': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: '20px',
          width: '100%',
          '& > input': {
            flexGrow: 1,
            background: 'transparent',
            margin: '0 8px',
          },
        },
      }),
    ];
  },
};
</script>
