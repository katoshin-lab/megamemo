const state = {
  idToken: null
}

const getters = {
  idToken: state => state.ideToken
}

const mutation = {
  updateIdToken(state, idToken) {
    state.idToken = idToken;
  }
}

const actions = {
  register()
}

export default {
  namespaced: true,
  state,
  getters,
  mutation,
  actions
}