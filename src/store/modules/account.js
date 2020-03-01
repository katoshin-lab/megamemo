import firebase from 'firebase/app';

const state = {
  name: null,
  idToken: null
};

const getters = {
  name: state => state.name
  headerMessage: state => {
    const now = new Date();
    const hours = now.getHours();
    var greeting = ""
    if (hours >= 3 && hours <= 10) {
      greeting = "Good morning";
    } else if (hours >= 11 && hours <= 17) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
    const messageName = ",\t" + state.name;
    const headerMessage = state.name ? greeting + messageName : greeting;
    // eslint-disable-next-line no-console
    console.log(headerMessage);
    return headerMessage;
  }
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
  logout({commit}) {
    firebase.auth().signOut();
    commit('updateIdToken', null);
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
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
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