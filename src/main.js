import { createApp } from 'vue';
import VueComponentStyle from 'vue-component-style';
import App from './App.vue';

createApp(App)
  .use(VueComponentStyle)
  .mount('#app');
