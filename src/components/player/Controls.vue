<template>
  <div
    :class="$style.controls"
  >
    <div class="buttons">
      <button
        :disabled="!!$player.lockedCues.length"
        @click="prevCue"
      >
        <Icon
          :size="42"
          name="arrow-left"
        />
      </button>
      <button
        :disabled="!!$player.lockedCues.length"
        @click="$player.togglePlay"
      >
        <Icon
          v-show="$player.isPaused"
          :size="42"
          name="play"
        />
        <Icon
          v-show="!$player.isPaused"
          :size="42"
          name="pause"
        />
      </button>
      <button
        :disabled="!$player.activeCues.length"
        @click="toggleLock"
      >
        <Icon
          :size="42"
          name="lock-reset"
        />
      </button>
      <button
        :disabled="!!$player.lockedCues.length"
        @click="nextCue"
      >
        <Icon
          :size="42"
          name="arrow-right"
        />
      </button>
      <div class="line" />
      <button
        @click="$player.stop"
      >
        <Icon
          :size="42"
          name="close"
        />
      </button>
    </div>
    <div class="progress">
      <Seek />
    </div>
  </div>
</template>

<script>
import Seek from './Seek.vue';
import Icon from '../common/Icon.vue';

export default {
  components: {
    Seek,
    Icon,
  },
  inject: ['$player'],
  computed: {
    formattedCurrentTime() {
      return Math.floor(this.$player.currentTime).toString().padStart(4, 0);
    },
    formattedDuration() {
      return Math.floor(this.$player.duration).toString().padStart(4, 0);
    },
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    '$player.currentTime'(currentTime) {
      if (this.$player.lockedCues.length) {
        const startTime = Math.max(...this.$player.lockedCues.map((cue) => cue.startTime));
        const endTime = Math.min(...this.$player.lockedCues.map((cue) => cue.endTime));
        if (currentTime + 1 >= endTime) {
          setTimeout(() => {
            this.$player.setCurrentTime(startTime);
          }, (endTime - currentTime - 0.1) * 1000);
        }
      }
    },
  },
  methods: {
    nextCue() {
      const nextCue = this.$player.allCues.find((cue) => cue.startTime >= this.$player.currentTime);
      if (nextCue) {
        this.$player.setCurrentTime(nextCue.startTime);
      }
    },
    prevCue() {
      const nextCueIndex = this.$player.allCues
        .findIndex((cue) => cue.startTime >= this.$player.currentTime);
      if (nextCueIndex > 0 && this.$player.allCues[nextCueIndex - 2]) {
        this.$player.setCurrentTime(this.$player.allCues[nextCueIndex - 2].startTime);
      }
    },
    toggleLock() {
      if (this.$player.lockedCues.length) {
        this.$player.unlockCues();
      } else {
        this.$player.lockCues();
      }
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
        fill: '#fff',
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
            background: 'rgba(0, 0, 0, 0.5)',
            textShadow: '0px 0 2px #000',
            borderBottom: 'solid 1px transparent',
            '&:not(:disabled):hover': {
              background: 'rgba(0, 0, 0, 1)',
              borderBottom: 'solid 1px #fff',
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
