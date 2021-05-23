<template>
  <div :class="$style.icon" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'close',
    },
    size: {
      type: Number,
      default: 32,
    },
  },
  data() {
    return {
      svgContent: null,
    };
  },
  async mounted() {
    const { default: src } = await import(`../../assets/icons/${this.name}.svg`);
    const res = await fetch(src);
    const svgContent = await res.text();
    this.$el.innerHTML = svgContent;
  },
  style({ className, keyFrames }) {
    const { size } = this;
    return [
      keyFrames('loadingAnimation', {
        '0%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0,
        },
        '100%': {
          opacity: 1,
        },
      }),
      className('icon', {
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        verticalAlign: 'middle',
        marginBottom: `${this.size / 8}px`,
        '&:empty': {
          '&::before': {
            content: '"-"',
            animationName: keyFrames('loadingAnimation'),
            animationDuration: '0.6s',
            fontWeight: 'bold',
            animationIterationCount: 'infinite',
          },
          borderRadius: '100%',
        },
        '& > svg': {
          width: '100%',
          height: '100%',
        },
      }),
    ];
  },
};
</script>
