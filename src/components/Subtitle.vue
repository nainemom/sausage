<template>
  <div
    v-show="parsedContent"
    :class="$style.subtitle"
    @mouseup="onMouseUp"
  >
    <div
      class="translated"
      v-text="translatedText"
    />
    <div
      class="content"
      v-text="parsedContent"
    />
  </div>
</template>

<script>
const translate = (x) => Promise.resolve(x);

export default {
  props: {
    activeCues: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['select'],
  data() {
    return {
      selectedText: null,
      translatedText: null,
    };
  },
  computed: {
    parsedContent() {
      const textContent = this.activeCues.map((cue) => cue.text).join('\n');
      if (!/\w/g.test(textContent)) return '';
      return textContent
        .replace(/<[^>]+>/g, '');
    },
  },
  watch: {
    parsedContent() {
      this.selectedText = null;
    },
    selectedText(selectedText) {
      if (!selectedText) {
        this.translatedText = null;
        return;
      }
      this.translatedText = '...';
      translate(selectedText).then((res) => {
        this.translatedText = res;
      });
    },
  },
  methods: {
    onMouseUp(event) {
      this.translatedText = null;
      this.selectedText = null;
      if (event.which === 3) {
        const text = window.getSelection().toString().trim();
        this.selectedText = text;
        this.$emit('select', text);
      }
    },
  },
  style({ className }) {
    return [
      className('subtitle', {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:empty, & *:empty': {
          display: 'none',
        },
        '& > *': {
          whiteSpace: 'pre-line',
          padding: '15px',
          width: 'auto',
          textShadow: '0 1px #000',
          lineHeight: '2.5rem',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        '& > .translated': {
          background: 'rgba(0, 0, 0, 0.4)',
          color: '#3eff3d',
        },
        '& > .content': {
          background: 'rgba(0, 0, 0, 0.4)',
          color: '#fff',
          '&, & *': {
            userSelect: 'text',
          },
          '& > div': {
            lineHeight: 1.6,
          },
        },
      }),
    ];
  },
};
</script>
