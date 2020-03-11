import firebase from 'firebase/app';
import account from './account'
import { db } from '@/main'

const state = {
  category: "Home",
  todoId: "",
  todos: "",
};

const getters = {

};

const mutations = {
  updateCategory(state, category) {
    state.category = category;
  },
  updateTodoId(state, idArray) {
    state.todoId = idArray;
  },
  updateTodos(state, todoArray) {
    state.todos = todoArray; 
  },
};

const actions = {
  getTodo({state, commit}, uid) {
    const todoPath = db.collection('users').doc(uid).collection('category').doc(state.category).collection('todo');
    todoPath.get()
    .then(snapshot => {
      const todoArray = [];
      const idArray = [];
      snapshot.forEach(doc => {
        idArray.push(doc.id);
        todoArray.push(doc.data());
      })
      commit('updateTodoId', idArray);
      commit('updateTodos', todoArray);
    })
  },
  createTodo({state, dispatch}, todo) {
    const uid = account.state.uid
    const docPath = db.collection('users').doc(uid).collection('category').doc(state.category).collection('todo');
    const todoObj = {
      title: todo.title,
      detail: todo.detail,
      date: todo.date,
      time: todo.time,
      estTime: todo.estimatedTime,
      priority: todo.priority,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }
    // eslint-disable-next-line no-console
    console.log(docPath, todo);
    docPath.add(todoObj)
    .then(response => {
      dispatch('getTodo', uid);
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