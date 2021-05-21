<template>
  <div :class="$style.app">
    <Home />
  </div>
</template>

<script>
import Home from './pages/Home.vue';

export default {
  components: {
    Home,
  },
  data() {
    return {
      title: undefined,
    };
  },
  style({ className, custom }) {
    return [
      className('app', {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }),
      custom('html, body, #app', {
        fontFamily: 'sans-serif',
        width: '100%',
        height: '100%',
        minHeight: '100%',
        maxWidth: '100%',
      }),
      custom('*, *:after, &:before', {
        bixSizing: 'content-box',
        touchAction: 'none !important',
      }),
      custom('*', {
        touchAction: 'none !important',
        userSelect: 'none',
        fontFamily: 'inherit',
        padding: 0,
        margin: 0,
        listStyle: 'none',
        borderStyle: 'solid',
        borderWidth: '0px',
        verticalAlign: 'baseline',
        backfaceVisibility: 'hidden',
        color: 'inherit',
        borderColor: 'inherit',
        backgroundColor: 'transparent',
        borderSpacing: 0,
        font: 'unset',
        '-webkitOverflowScrolling': 'touch',
        '-webkitTapHighlightColor': 'rgba(0, 0, 0, 0)',
        boxSizing: 'border-box',
        '&::-moz-focus-inner': {
          border: 0,
        },
        '&:focus': {
          outline: 'none',
        },
      }),
      custom('a, a:hover, a:visited', {
        textDecoration: 'none',
      }),
    ];
  },
};
</script>
