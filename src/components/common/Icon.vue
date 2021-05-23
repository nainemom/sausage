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
      iconSrc: null,
      svgContent: null,
    };
  },
  computed: {
    className() {
      return `mdi mdi-${this.name}`;
    },
  },
  async mounted() {
    const { default: src } = await import(`../../assets/icons/${this.name}.svg`);
    const res = await fetch(src);
    const svgContent = await res.text();
    this.$el.innerHTML = svgContent;
  },
  style({ className }) {
    const { size } = this;
    return [
      className('icon', {
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        verticalAlign: 'middle',
        marginBottom: `${this.size / 8}px`,
        '& > svg': {
          width: '100%',
          height: '100%',
        },
      }),
    ];
  },
};
</script>
