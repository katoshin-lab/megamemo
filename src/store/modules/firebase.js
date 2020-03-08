import firebase from 'firebase/app';
import account from './account'
import { db } from '@/main'
// import db from '@/plugins/firebase_config';

const state = {
  category: "Home"
};

const getters = {

};

const mutations = {
  updateCategory(state, category) {
    state.category = category;
  }
};

const actions = {
  createTodo({state}, todo) {
    const uid = account.state.uid
    const path = db.collection('users').doc(uid).collection('category').doc(state.category).collection('todo')
    // eslint-disable-next-line no-console
    console.log(path, todo);
    path.add({
      title: todo.title,
      detail: todo.detail,
      date: todo.date,
      time: todo.time,
      estTime: todo.estimatedTime,
      priority: todo.priority,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(response => {
      // eslint-disable-next-line no-console
      console.log(response);
    })
    .catch(error => {
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