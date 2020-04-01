import Vue from 'vue';
import Vuex from 'vuex';
// import getters from './getters';
// import mutations from './mutations';
import actions from './actions';
import account from './modules/account';
import firebase from './modules/firebase';
import messaging from './modules/messaging';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    priority: [
      { label: 'Any Time', color: 'light-blue accent-3' },
      { label: 'Low', color: 'green accent-3' },
      { label: 'Middle', color: 'lime accent-3' },
      { label: 'High', color: 'orange accent-3' },
      { label: 'Right Now', color: 'red accent-3' },
    ],
    newTodoDialog: false,
    todoDetailDialog: false,
  },
  getters: {
    newTodoDialog: state => state.newTodoDialog,
    todoDetailDialog: state => state.todoDetailDialog
  },
  mutations: {
    toggleNewTodoDialog(state, bool) {
      state.newTodoDialog = bool
    },
    toggleTodoDetailDialog(state, bool) {
      state.todoDetailDialog = bool
    }
  },
  actions,
  modules: {
    account,
    firebase,
    messaging
  }
})