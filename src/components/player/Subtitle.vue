<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-show="parsedContent"
    :class="$style.subtitle"
    @contextmenu.prevent="onContextMenu"
  >
    <div
      ref="content"
      class="content"
      v-html="parsedContent"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
    />
  </div>
</template>

<script>
import subtitleConfigProps from '../../mixins/subtitleConfigProps';

export default {
  mixins: [
    subtitleConfigProps,
  ],
  props: {
    activeCues: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['select'],
  data() {
    return {
      selectedText: '',
      translatorTab: null,
      selecting: false,
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
          ).join(''),
        ).join('\n');
    },
  },
  watch: {
    parsedContent() {
      this.selectedText = '';
    },
  },
  methods: {
    onPointerDown(e) {
      this.selecting = true;
      this.firstSelectedWord = e.target;
      e.target.classList.add('hover');
      window.addEventListener('pointerup', this.onPointerUp, true);
    },
    onPointerMove(e) {
      if (this.selecting && this.$refs.content.contains(e.target)) {
        let add = false;
        [...this.$refs.content.children].forEach((child) => {
          if (child === this.firstSelectedWord) {
            add = true;
          }
          child.classList[add ? 'add' : 'remove']('hover');
          if (child === e.target) {
            add = false;
          }
        });
      }
    },
    onPointerUp(e) {
      const { content: contentRef } = this.$refs;
      window.removeEventListener('pointerup', this.onPointerUp, true);
      let text = '';
      [...contentRef.children].forEach((child) => {
        if (child.classList.contains('hover')) {
          text += `${child.innerText} `;
          child.classList.remove('hover');
        }
      });
      if (text && (e.target === contentRef || contentRef.contains(e.target))) {
        this.translate(text.trim());
      }
      this.selecting = false;
    },
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
          width: 'auto',
          textShadow: '0 1px #000',
          lineHeight: '2.5rem',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        '& > .content': {
          background: 'rgba(0, 0, 0, 0.4)',
          color: '#fff',
          '&:hover > span': {
            opacity: 0.4,
          },
          '& > span': {
            padding: '4px 8px',
            cursor: 'pointer',
            '&:hover, &.hover': {
              background: 'rgba(255, 255, 255, 0.2)',
              opacity: 1,
            },
            '&.hover': {
              textDecoration: 'underline',
            },
          },
        },
      }),
    ];
  },
};
</script>
