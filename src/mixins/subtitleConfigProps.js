export default {
  emits: ['update:subtitleLang', 'update:primaryLang', 'update:translatorService'],
  props: {
    subtitleLang: {
      type: String,
      default: null,
    },
    primaryLang: {
      type: String,
      default: null,
    },
    translatorService: {
      type: String,
      default: null,
    },
  },
};
