import { createApp } from 'vue';
import VueComponentStyle from 'vue-component-style';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';

window.$app = createApp(App)
  .use(VueComponentStyle)
  .mount('#app');