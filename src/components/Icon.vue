<template>
  <div :class="$style.icon">
    <span :class="className" />
    <!-- <i :class="name" /> -->
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'fa fa-user',
    },
    size: {
      type: Number,
      default: 32,
    },
  },
  computed: {
    className() {
      return `mdi mdi-${this.name}`;
    },
  },
  style({ className }) {
    const { size } = this;
    return [
      className('icon', {
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        textAlign: 'center',
        '& > span': {
          fontSize: `${size}px`,
          lineHeight: `${size}px`,
          verticalAlign: 'middle',
          '&:before': {
            verticalAlign: 'baseline',
          },
        },
      }),
    ];
  },
};
</script>
