<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-show="parsedContent"
    :class="$style.subtitle"
  >
    <div
      ref="content"
      class="content"
      @pointerdown="onPointerDown"
      v-html="parsedContent"
    />
  </div>
</template>

<script>
export default {
  inject: ['$player', '$app'],
  data() {
    return {
      selecting: false,
    };
  },
  computed: {
    parsedContent() {
      const textContent = this.$player.activeCues.map((cue) => cue.text).join('\n');
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
  methods: {
    onPointerDown(e) {
      this.selecting = true;
      this.firstSelectedWord = e.target;
      e.target.classList.add('hover');
      window.addEventListener('pointerup', this.onPointerUp, true);
      window.addEventListener('pointermove', this.onPointerMove, true);
      this.$player.lockCues();
    },
    onPointerMove(e) {
      if (!this.selecting) return;
      const children = [...this.$refs.content.children];
      if (!children.includes(e.target)) return;
      let add = false;
      let firstWord = this.firstSelectedWord;
      let lastWord = e.target;
      if (children.indexOf(firstWord) > children.indexOf(lastWord)) {
        const swapTmp = firstWord;
        firstWord = lastWord;
        lastWord = swapTmp;
      }

      children.forEach((child) => {
        if (child === firstWord) {
          add = true;
        }
        child.classList[add ? 'add' : 'remove']('hover');
        if (child === lastWord) {
          add = false;
        }
      });
    },
    onPointerUp(e) {
      const { content: contentRef } = this.$refs;
      window.removeEventListener('pointerup', this.onPointerUp, true);
      window.removeEventListener('pointermove', this.onPointerMove, true);
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
    translate(text) {
      let url;
      if (this.$app.translatorService === 'google') {
        url = `https://translate.google.com/?op=translate&sl=${this.$app.subtitleLang}&tl=${this.$app.primaryLang}&text=${encodeURI(text)}`;
      } else { // bing
        url = `https://bing.com/translator?from=${this.$app.subtitleLang}&to=${this.$app.primaryLang}&text=${text.split(' ').join('+')}`;
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
