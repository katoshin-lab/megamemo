import Vue from 'vue';
import Vuex from 'vuex';
// import getters from './getters';
// import mutations from './mutations';
import actions from './actions';
import account from './modules/account';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    priority: [
      { label: 'Right Now', color: 'red accent-3' },
      { label: 'High', color: 'orange accent-3' },
      { label: 'Middle', color: 'lime accent-3' },
      { label: 'Low', color: 'green accent-3' },
      { label: 'Any Time', color: 'light-blue accent-3' }
    ],
    todoDialog: false
  },
  getters: {
    todoDialog: state => state.todoDialog
  },
  mutations: {
    toggleTodoDialog(state, toggle) {
      state.todoDialog = toggle
    }
  },
  actions,
  modules: {
    account,
  }
})