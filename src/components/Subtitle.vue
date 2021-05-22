<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-show="parsedContent"
    :class="$style.subtitle"
    @contextmenu.prevent="onContextMenu"
  >
    <div
      class="content"
      v-html="parsedContent"
    />
  </div>
</template>

<script>
export default {
  props: {
    activeCues: {
      type: Array,
      default: () => [],
    },
    subtitleLang: {
      type: String,
      required: true,
    },
    primaryLang: {
      type: String,
      required: true,
    },
    translatorService: {
      type: String,
      required: true,
    },
  },
  emits: ['select'],
  data() {
    return {
      selectedText: '',
      translatorTab: null,
    };
  },
  computed: {
    parsedContent() {
      const textContent = this.activeCues.map((cue) => cue.text).join('\n');
      if (!/\w/g.test(textContent)) return '';
      return textContent
        .replace(/<[^>]+>/g, '')
        .split('\n')
        .map(
          (line) => line.split(' ').map(
            (word) => `<span>${word}</span>`,
          ).join(' '),
        ).join('\n');
    },
  },
  watch: {
    parsedContent() {
      this.selectedText = '';
    },
  },
  methods: {
    onContextMenu() {
      const text = window.getSelection().toString().trim();
      this.selectedText = text;
      this.translate(this.selectedText);
      this.$emit('select', text);
    },
    translate(text) {
      let url;
      if (this.translatorService === 'google') {
        url = `https://translate.google.com/?op=translate&sl=${this.subtitleLang}&tl=${this.primaryLang}&text=${encodeURI(text)}`;
      } else { // bing
        url = `https://bing.com/translator?from=${this.subtitleLang}&to=${this.primaryLang}&text=${text.split(' ').join('+')}`;
      }
      if (!window.translatorTab || window.translatorTab.closed) {
        window.translatorTab = window.open('', 'Translate', 'width=480,height=600,menubar=off,location=off,resizable=off,scrollbars=off,status=off');
      }
      window.translatorTab.location = url;
      window.translatorTab.focus();
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
