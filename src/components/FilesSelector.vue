<template>
  <div
    :class="$style.filesSelector"
    @dragover.prevent
    @drop.prevent="onDrop"
    @click="openFileSelectorDialog"
  >
    <input
      ref="file"
      type="file"
      @input="onFileSelect"
    >
    <div>
      <Icon
        :size="48"
        name="movie-outline"
      /> {{ movieFile ? movieFile.name : '---' }}
    </div>
    <div>
      <Icon
        :size="48"
        name="subtitles-outline"
      /> {{ subtitleFile ? subtitleFile.name : '---' }}
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

const readSrtContent = (srtFile) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsText(srtFile);
  reader.onloadend = (event) => resolve(event.target.result);
  reader.onerror = (event) => reject(event);
});

const convertSrtContentToVttFile = (name, content) => {
  const blob = new Blob([`WEBVTT\n\n${content.split('\n').map(
    (srtLine) => {
      if (srtLine.match(/^\d+:\d+:\d+,\d+\s-->\s\d+:\d+:\d+,\d+/gm)) {
        return srtLine.split(',').join('.');
      }
      return srtLine;
    },
  ).join('\n')}`], {
    type: 'text/vtt',
  });
  return new File([blob], name, {
    type: 'text/vtt',
  });
};

export default {
  components: {
    Icon,
  },
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
  emits: ['update:subtitle', 'update:movie', 'done'],
  data() {
    return {
      files: Object.freeze([]),
    };
  },
  computed: {
    movieFile() {
      return this.files.find((file) => file.name.endsWith('.mp4') || file.name.endsWith('.mkv'));
    },
    subtitleFile() {
      const srt = this.files.find((file) => file.name.endsWith('.srt') || file.name.endsWith('.vtt'));
      if (srt && srt.name.endsWith('.vtt')) {
        return srt;
      }
      return this.files.find((file) => file.name.endsWith('.srt'));
    },
    readyToDone() {
      return this.movieFile && this.subtitleFile;
    },
  },
  watch: {
    movieFile(movie) {
      this.$emit('update:movie', movie);
    },
    subtitleFile(subtitle) {
      this.$emit('update:subtitle', subtitle);
    },
    readyToDone() {
      this.$emit('done');
    },
  },
  methods: {
    openFileSelectorDialog() {
      this.$refs.file.click();
    },
    onFileSelect(event) {
      this.addFiles([...event.target.files]);
    },
    onDrop(event) {
      this.addFiles([...event.dataTransfer.files]);
    },
    async addFiles(files) {
      const subtitles = files.filter((file) => file.type === 'text/vtt');
      const movies = files.filter((file) => ['video/x-matroska', 'video/mp4'].includes(file.type));

      const srtSubtitles = files.filter((file) => file.type === 'application/x-subrip');

      subtitles.push(
        ...(await Promise.all(
          srtSubtitles.map((srtFile) => readSrtContent(srtFile)),
        )).map(
          (srtFileContent, index) => convertSrtContentToVttFile(
            srtSubtitles[index].name,
            srtFileContent,
          ),
        ),
      );

      this.files = Object.freeze([
        ...subtitles,
        ...movies,
        ...this.files,
      ]);
    },
  },
  style({ className }) {
    return [
      className('filesSelector', {
        background: 'white',
        padding: '16px',
        '& > input[type="file"]': {
          display: 'none',
        },
      }),
    ];
  },
};
</script>
