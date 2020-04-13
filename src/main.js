import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import { firebaseConfig } from './plugins/firebaseConfig';
import { publicVapidKey } from './plugins/firebaseMessaging';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import './registerServiceWorker';

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export const messaging = firebase.messaging();
messaging.usePublicVapidKey(publicVapidKey);

new Vue({
  axios,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
