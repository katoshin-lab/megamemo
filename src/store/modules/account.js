import firebase from 'firebase/app';

const state = {
  name: null,
  idToken: null
};

const getters = {
  name: state => state.name
};

const mutations = {
  updateUserName(state, name) {
    state.name = name;
  },
  updateIdToken(state, idToken) {
    state.idToken = idToken
  }
};

const actions = {
  login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider);
  },
  loginInfo({commit}) {
    firebase.auth().getRedirectResult().then((result) => {
      if (result.credential) {
        // eslint-disable-next-line no-console
        console.log(result);
        commit('updateUserName', result.user.displayName);
        commit('updateIdToken', result.credential.idToken);
      }
    })
    .catch((result) => {
      // eslint-disable-next-line no-console
      console.log(result);
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}