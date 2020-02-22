import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA9m7QYlzL105qJpyKCtwiX5NX623aGJdw",
  authDomain: "megamemo-1420f.firebaseapp.com",
  databaseURL: "https://megamemo-1420f.firebaseio.com",
  projectId: "megamemo-1420f",
  storageBucket: "megamemo-1420f.appspot.com",
  messagingSenderId: "836383038964",
  appId: "1:836383038964:web:f15303d87c079f58176da1",
  measurementId: "G-ZLE723HZ0B"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  axios,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
