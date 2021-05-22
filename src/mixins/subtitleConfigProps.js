const getDefaultConfigPropValue = (name) => {
  try {
    return JSON.parse(localStorage.getItem(`config:${name}`));
  } catch {
    return null;
  }
};

export default {
  emits: ['update:subtitleLang', 'update:primaryLang', 'update:translatorService'],
  props: {
    subtitleLang: {
      type: String,
      default: getDefaultConfigPropValue('subtitleLang'),
    },
    primaryLang: {
      type: String,
      default: getDefaultConfigPropValue('primaryLang'),
    },
    translatorService: {
      type: String,
      default: getDefaultConfigPropValue('translatorService'),
    },
  },
  methods: {
    setSubtitleConfigProp(name, value) {
      localStorage.setItem(`config:${name}`, JSON.stringify(value));
      this.$emit(`update:${name}`, value);
    },
  },
};
