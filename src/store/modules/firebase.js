import firebase from 'firebase/app';
import account from './account'
import { db } from '@/main'

const state = {
  category: "Home",
  todos: "",
  selectedTodo: null,
  selectedTodoIndex: 0,
  loading: false
};

const getters = {
  todos: state => state.todos,
  selectedTodo: state => state.selectedTodo,
  selectedTodoIndex: state => state.selectedTodoIndex
};

const mutations = {
  updateCategory(state, category) {
    state.category = category;
  },
  updateTodos(state, todoArray) {
    state.todos = todoArray; 
  },
  removeTodo(state, index) {
    state.todos.splice(index, 1);
  },
  selectedTodo(state, selectedTodo) {
    state.selectedTodo = selectedTodo;
  },
  updateSelectedTodoIndex(state, selectedTodoIndex) {
    state.selectedTodoIndex = selectedTodoIndex;
  },
  toggleLoading(state, loading) {
    state.loading = loading
  }
};

const actions = {
  getTodo({state, commit}, uid) {
    const todoPath = db.collection('users').doc(uid).collection('category').doc(state.category).collection('todo');
    todoPath.get()
    .then(snapshot => {
      commit('toggleLoading', true);
      const todoArray = [];
      snapshot.forEach(doc => {
        todoArray.unshift(doc.data());
      })
      commit('updateTodos', todoArray);
    })
  },
  createTodo({state, dispatch}, todo) {
    const uid = account.state.uid
    const date = new Date();
    const docId = "id" + String(date.getTime());
    const docPath = db.collection('users').doc(uid).collection('category').doc(state.category).collection('todo');
    const todoObj = {
      id: docId,
      title: todo.title,
      detail: todo.detail,
      date: todo.date,
      time: todo.time,
      estTime: todo.estimatedTime,
      priority: todo.priority,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }
    docPath.doc(docId).set(todoObj)
    .then((response) => {
      dispatch('getTodo', uid);
      // eslint-disable-next-line no-console
      console.log(response);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    })
  },
  updateTodo({state, dispatch}, todo) {
    const uid = account.state.uid;
    const docPath = db.collection('users').doc(uid).collection('category').doc(state.category).collection('todo');
    const id = state.selectedTodo.id;
    docPath.doc(id).update({
      title: todo.title,
      detail: todo.detail,
      date: todo.date,
      time: todo.time,
      estTime: todo.estimatedTime,
      priority: todo.priority,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      dispatch('getTodo', uid)
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    })
  },
  deleteTodo({state, commit}, index) {
    const uid = account.state.uid;
    const docPath = db.collection('users').doc(uid).collection('category').doc(state.category).collection('todo');
    const id = state.todos[index].id;
    docPath.doc(id).delete();
    commit('removeTodo', index);
  },
  selectedTodo({state, commit}, index) {
    const selectedTodo = state.todos[index];
    commit('selectedTodo', selectedTodo);
    commit('updateSelectedTodoIndex', index);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}