<template>
  <div
    ref="seek"
    :class="$style.seek"
    @pointerup="onPointerUp"
  >
    <div class="content">
      <div
        class="progress"
        :style="progressStyle"
      />
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$player'],
  computed: {
    progressStyle() {
      const value = (this.$player.currentTime / this.$player.duration) * 100;
      return {
        transform: `translateX(${-1 * (100 - value)}%)`,
      };
    },
  },
  methods: {
    onPointerUp(e) {
      if (this.disabled) {
        return;
      }
      const newValue = (e.x / this.$refs.seek.offsetWidth) * this.$player.duration;
      this.$player.setCurrentTime(Number((newValue).toFixed(2)));
    },
  },
  style({ className }) {
    return [
      className('seek', {
        height: '20px',
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          '& > .content': {
            height: '20px',
          },
        },
        '& > .content': {
          background: 'rgba(255, 255, 255, 0.1)',
          height: '4px',
          transition: 'height 0.1s',
          left: 0,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          overflow: 'hidden',
          '& > .progress': {
            transform: 'translateX(-100%)',
            background: '#ff0000',
            height: '100%',
            left: 0,
            position: 'absolute',
            boxShadow: '3px 0 2px #000',
            width: '100%',
          },
        },
      }),
    ];
  },
};
</script>
