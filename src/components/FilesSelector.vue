<template>
  <div :class="$style.setupForm">
    <div
      class="form"
      @dragover.prevent
      @drop.prevent="onDrop"
    >
      <input
        ref="file"
        type="file"
        @input="onFileSelect"
      >
      <div class="form-element">
        <div class="title">
          <Icon
            :size="22"
            name="movie-outline"
          /> Video File:
        </div>
        <div class="content">
          <button
            @click="openFileSelectorDialog"
          >
            {{ movieFile ? miniFileNames.movie : 'Browse...' }}
          </button>
        </div>
      </div>
      <div class="form-element">
        <div class="title">
          <Icon
            :size="22"
            name="subtitles-outline"
          /> Subtitle File:
        </div>
        <div class="content">
          <button
            @click="openFileSelectorDialog"
          >
            {{ subtitleFile ? miniFileNames.subtitle : 'Browse...' }}
          </button>
        </div>
      </div>

      <div class="form-element">
        <div class="title">
          <Icon
            :size="22"
            name="web"
          /> Subtitle Language:
        </div>
        <div class="content">
          <input
            :value="subtitleLang"
            @input="$emit('update:subtitleLang', $event.target.value)"
          >
        </div>
      </div>

      <div class="form-element">
        <div class="title">
          <Icon
            :size="22"
            name="account-voice"
          /> My Primary Language:
        </div>
        <div class="content">
          <input
            :value="primaryLang"
            @input="$emit('update:primaryLang', $event.target.value)"
          >
        </div>
      </div>

      <div class="form-element">
        <div class="title">
          <Icon
            :size="22"
            name="translate"
          /> Translator Service:
        </div>
        <div class="content">
          <select
            :value="translatorService"
            @input="$emit('update:translatorService', $event.target.value)"
          >
            <option value="google">
              Google Translate
            </option>
            <option value="bing">
              Bing Translate
            </option>
          </select>
        </div>
      </div>
      <div class="line" />
      <div class="form-element">
        <div class="title" />
        <div class="content">
          <button
            :disabled="!isReadyToDone"
            @click="done"
          >
            <Icon
              :size="22"
              name="play"
            /> Play
          </button>
        </div>
      </div>
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
  emits: ['update:subtitle', 'update:movie', 'update:subtitleLang', 'update:primaryLang', 'update:translatorService', 'done'],
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
    miniFileNames() {
      const mini = (str) => (str.length > 19 ? `${str.substr(0, 8)}...${str.substr(-8)}` : str);
      return {
        movie: this.movieFile ? mini(this.movieFile.name) : null,
        subtitle: this.subtitleFile ? mini(this.subtitleFile.name) : null,
      };
    },
    isReadyToDone() {
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
  },
  created() {
    if (!this.primaryLang) {
      this.$emit('update:primaryLang', 'fa');
    }
    if (!this.subtitleLang) {
      this.$emit('update:subtitleLang', 'en');
    }
    if (!this.translatorService) {
      this.$emit('update:translatorService', 'google');
    }
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
    done() {
      if (this.isReadyToDone) {
        this.$emit('done');
      }
    },
  },
  style({ className }) {
    return [
      className('setupForm', {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        background: '#eee',
        '& input[type="file"]': {
          display: 'none',
        },
        '& button, & input, & select': {
          border: 'solid 1px #ccc',
          height: '36px',
          padding: '0 12px',
          lineHeight: '36px',
          appearance: 'none',
        },
        '& button': {
          cursor: 'pointer',
          '&:not(:disabled):hover, &:not(:disabled):focus': {
            background: 'rgba(0, 0, 0, 0.05)',
          },
          '&:not(:disabled):active': {
            background: 'rgba(0, 0, 0, 0.1)',
          },
          '&:disabled': {
            cursor: 'not-allowed',
            color: '#888',
          },
        },
        '& select': {
          cursor: 'pointer',
          '&:not(:disabled):hover, &:not(:disabled):focus': {
            background: 'rgba(0, 0, 0, 0.05)',
          },
        },
        '& input': {
          width: '76px',
        },
        '& > .form': {
          background: '#fff',
          border: 'solid 1px #ccc',
          overflow: 'hidden',
          minWidth: '360px',
          padding: '16px 0',
          '& > .line': {
            height: '1px',
            background: '#ccc',
            marginBottom: '16px',
          },
          '& > .form-element': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0 16px',
            '&:not(:last-child)': {
              marginBottom: '16px',
            },
            '& > .title': {
              color: '#555',
              flexGrow: 1,
            },
            '& > .content': {
              paddingLeft: '16px',
            },
          },
        },
      }),
    ];
  },
};
</script>
