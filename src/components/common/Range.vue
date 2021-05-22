<template>
  <div
    :class="$style.range"
    @mouseup="onMouseUp"
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
  props: {
    value: {
      type: Number,
      default: 0,
    },
    length: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
    },
  },
  emits: ['input'],
  computed: {
    progressStyle() {
      const value = (this.value / this.length) * 100;
      return {
        transform: `translateX(${-1 * (100 - value)}%)`,
      };
    },
  },
  methods: {
    onMouseUp(event) {
      if (this.disabled) {
        return;
      }
      const newValue = (event.x / event.currentTarget.offsetWidth) * this.length;
      this.$emit('input', newValue);
    },
  },
  style({ className }) {
    return [
      className('range', {
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
