import firebase from 'firebase/app';

const state = {
  name: null,
  uid: null
};

const getters = {
  name: state => state.name,
  uid: state => state.uid,
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
    return headerMessage;
  }
};

const mutations = {
  updateUserName(state, name) {
    state.name = name;
  },
  updateUserUid(state, uid) {
    state.uid = uid
  }
};

const actions = {
  login() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider);
  },
  loginGuest({commit}, guest) {
    console.log(guest.email, guest.password);
    firebase.auth().signInWithEmailAndPassword(guest.email, guest.password)
    .then((res) => {
      const name = "Guest";
      commit('updateUserName', name);
      commit('updateUserUid', res.user.uid);
    })
    .catch(function(error) {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  },
  logout({commit}) {
    firebase.auth().signOut();
    commit('updateUserUid', null);
  },
  loginInfo({commit}) {
    firebase.auth().getRedirectResult().then((result) => {
      if (result.credential) {
        commit('updateUserName', result.user.displayName);
        commit('updateUserUid', result.user.uid);
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