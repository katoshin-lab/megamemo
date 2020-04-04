import { messaging } from '@/main';

const state = {
};

const getters = {

};

const mutations = {

};

const actions = {
  tokenRefresh() {
    messaging.getToken().then((currentToken) => {
      console.log(currentToken);
    })
    .catch((error) => {
      console.log('Unable to refresh token', error);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
