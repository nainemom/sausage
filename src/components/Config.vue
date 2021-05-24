<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div
    :class="$style.setupForm"
    @dragover.prevent
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div class="header">
      <div>
        <Icon
          :size="48"
          name="logo"
        />
      </div>
      <div>
        <h1> Sausage </h1>
        <p> Learn Foreign Languages via Movies Subtitle </p>
      </div>
    </div>
    <div
      class="form"
      :class="[dragEnter && 'drag-enter']"
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
            <Icon
              :size="22"
              name="folder-outline"
            /> {{ movieFile ? miniFileNames.movie : 'Browse...' }}
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
            <Icon
              :size="22"
              name="folder-outline"
            /> {{ subtitleFile ? miniFileNames.subtitle : 'Browse...' }}
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
            @input="setSubtitleConfigProp('subtitleLang', $event.target.value)"
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
            @input="setSubtitleConfigProp('primaryLang', $event.target.value)"
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
            @input="setSubtitleConfigProp('translatorService', $event.target.value)"
          >
            <option value="google">
              Google
            </option>
            <option value="bing">
              Bing
            </option>
          </select>
        </div>
      </div>
      <div class="line" />
      <div class="form-element last">
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
      <div class="drag-enter-text">
        <Icon
          :size="36"
          name="upload"
        /> Drop Files Here
      </div>
    </div>
    <div class="github">
      Github Repo: <a
        href="https://github.com/nainemom/sausage"
        target="__blank"
      > Sausage </a>
    </div>
  </div>
</template>

<script>
import Icon from './common/Icon.vue';
import filesConfigProps from '../mixins/filesConfigProps';
import subtitleConfigProps from '../mixins/subtitleConfigProps';

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
  mixins: [
    filesConfigProps,
    subtitleConfigProps,
  ],
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
  emits: ['done'],
  data() {
    return {
      files: Object.freeze([]),
      dragEnter: false,
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
      this.setFilesConfigProp('movie', movie);
    },
    subtitleFile(subtitle) {
      this.setFilesConfigProp('subtitle', subtitle);
    },
  },
  created() {
    if (!this.primaryLang) {
      this.setSubtitleConfigProp('primaryLang', 'fa');
    }
    if (!this.subtitleLang) {
      this.setSubtitleConfigProp('subtitleLang', 'en');
    }
    if (!this.translatorService) {
      this.setSubtitleConfigProp('translatorService', 'google');
    }
  },
  methods: {
    openFileSelectorDialog() {
      this.$refs.file.click();
    },
    onFileSelect(event) {
      this.addFiles([...event.target.files]);
    },
    onDragEnter() {
      this.dragEnter = true;
    },
    onDragLeave(e) {
      if (!e.clientX && !e.clientY) {
        this.dragEnter = false;
      }
    },
    onDrop(event) {
      this.dragEnter = false;
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        background: '#eee',
        '& .github': {
          position: 'fixed',
          right: 0,
          bottom: 0,
          padding: '16px',
          '& a': {
            textDecoration: 'underline',
          },
        },
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
            fill: '#888',
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
        '& > .header': {
          width: '360px',
          maxWidth: '360px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: '8px',
          '& > div:first-child': {
            marginRight: '8px',
          },
          '& > div:last-child': {
            flexGrow: 1,
          },
          '& h1': {
            fontSize: '1.3rem',
            marginBottom: '3px',
          },
          '& p': {
            fontSize: '0.9rem',
            color: '#555',
          },
        },
        '& > .form': {
          background: '#fff',
          border: 'solid 1px #ccc',
          overflow: 'hidden',
          width: '360px',
          padding: '16px 0',
          position: 'relative',
          '&.drag-enter': {
            border: 'dotted 1px #ccc',
            '& > *:not(.drag-enter-text)': {
              visibility: 'hidden',
            },
            '& > .drag-enter-text': {
              fontSize: '1.4rem',
              display: 'block',
              width: '100%',
              textAlign: 'center',
              position: 'absolute',
              color: '#444',
              fill: '#444',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          },
          '& > .drag-enter-text': {
            display: 'none',
          },
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
            '&:not(.last)': {
              marginBottom: '16px',
            },
            '& > .title': {
              color: '#444',
              fill: '#444',
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
