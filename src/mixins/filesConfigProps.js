export default {
  emits: ['update:subtitle', 'update:movie'],
  props: {
    subtitle: {
      type: File,
      default: null,
    },
    movie: {
      type: File,
      default: null,
    },
  },
};
