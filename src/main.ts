import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { dateFilter } from '@/filters/date.filter';
import { dateInput } from '@/filters/date-input.filter';

Vue.config.productionTip = false;

Vue.filter('date', dateFilter);

Vue.filter('dateInput', dateInput);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
