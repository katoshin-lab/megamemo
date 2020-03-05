import Vue from 'vue';
import Vuex from 'vuex';
// import getters from './getters';
// import mutations from './mutations';
import actions from './actions';
import account from './modules/account';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    priprity: ""
  },
  getters: {
    priority: state => state.priprity
  },
  mutations: {
    updatePriority(state, priprity) {
      state.priprity = priprity
    }
  },
  actions,
  modules: {
    account,
  }
})