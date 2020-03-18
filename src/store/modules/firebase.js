import firebase from 'firebase/app';
import account from './account'
import { db } from '@/main'

const state = {
  category: "Home",
  todos: "",
  selectedTodo: "",
  selectedTodoIndex: 0,
  categories: "",
  selectedCategory: "Home",
  selectedCategoryIndex: 0,
  loading: false
};

const getters = {
  todos: state => state.todos,
  selectedTodo: state => state.selectedTodo,
  selectedTodoIndex: state => state.selectedTodoIndex,
  categories: state => state.categories,
};

const mutations = {
  addTodo(state, todoObj) {
    state.todos.unshift(todoObj);
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
  updateSelectedCategory(state, selectedCategory) {
    state.selectedCategory = selectedCategory;
  },
  updateSelectedCategoryIndex(state, selectedCategoryIndex) {
    state.selectedCategoryIndex = selectedCategoryIndex;
  },
  addCategory(state, category) {
    state.categories.push(category);
  },
  updateCategory(state, categoryArray) {
    state.categories = categoryArray;
  },
  toggleLoading(state, loading) {
    state.loading = loading
  },

};

const actions = {
  getTodo({state, commit}, uid) {
    const todoPath = db.collection('users').doc(uid).collection('category').doc(state.selectedCategory).collection('todo');
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
  createTodo({state, commit}, todo) {
    const date = new Date();
    const docId = "id" + String(date.getTime());
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
    commit('addTodo', todoObj);
    const uid = account.state.uid
    const docPath = db.collection('users').doc(uid).collection('category').doc(state.selectedCategory).collection('todo');
    docPath.doc(docId).set(todoObj)
    .then(() => {
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    })
  },
  updateTodo({state, dispatch}, todo) {
    const uid = account.state.uid;
    const docPath = db.collection('users').doc(uid).collection('category').doc(state.selectedCategory).collection('todo');
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
    const docPath = db.collection('users').doc(uid).collection('category').doc(state.selectedCategory).collection('todo');
    const id = state.todos[index].id;
    docPath.doc(id).delete();
    commit('removeTodo', index);
  },
  selectedTodo({state, commit}, index) {
    const selectedTodo = state.todos[index];
    commit('selectedTodo', selectedTodo);
    commit('updateSelectedTodoIndex', index);
  },
  getCategory({commit}, uid) {
    const docPath = db.collection('users').doc(uid).collection('settings').doc('category').collection('labels');
    docPath.get()
    .then(snapshot => {
      const categoryArray = ['Home'];
      snapshot.forEach(doc => {
        categoryArray.push(doc.data().label)
      })
      commit('updateCategory', categoryArray);
      // eslint-disable-next-line no-console
      console.log(categoryArray);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    })
  },
  addCategory({commit}, category) {
    commit('addCategory', category);
    const uid = account.state.uid;
    const docPath = db.collection('users').doc(uid).collection('settings').doc('category').collection('labels');
    docPath.add({label: category})
    .then(r => {
      // eslint-disable-next-line no-console
      console.log(r);
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.log(e);
    })
  },
  selectedCategory({state, commit, dispatch}, index) {
    const selectedCategory = state.categories[index];
    if (selectedCategory !== state.selectedCategory) {
      const uid = account.state.uid
      commit('updateSelectedCategory', selectedCategory);
      commit('updateSelectedCategoryIndex', index);
      dispatch('getTodo', uid);
    }
  },
  deleteCategory({state, commit}) {
    // 一つ上のカテゴリーを選択
    if (state.selectedCategoryIndex !== 0) {
      const newIndex = state.selectedCategoryIndex - 1;
      const newCategory = state.categories[newIndex];
      commit('updateSelectedCategory', newCategory);
      commit('updateSelectedCategoryIndex', newIndex);
    }
    // 配列から削除
    // firestoreから削除
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
