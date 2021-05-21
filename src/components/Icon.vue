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
    border: {
      type: Boolean,
    },
  },
  computed: {
    className() {
      return `mdi mdi-${this.name}`;
    },
  },
  style({ className }) {
    const { size, border } = this;
    return [
      className('icon', {
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        textAlign: 'center',
        border: 'solid 2px',
        ...(border ? {
          borderRadius: `${size}px`,
          background: 'rgba(0, 0, 0, 0.1)',
        } : {
          borderColor: 'transparent',
        }),
        '& > span': {
          fontSize: `${size / 1.9}px`,
          lineHeight: 0,
          '&:before': {
            verticalAlign: 'middle',
          },
        },
      }),
    ];
  },
};
</script>
