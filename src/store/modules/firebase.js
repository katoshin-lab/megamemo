import firebase from 'firebase/app';
import account from './account';
import { db } from '@/main';

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
  selectedCategory: state => state.selectedCategory,
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
  removeCategory(state, index) {
    state.categories.splice(index, 1);
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
    docPath.doc(category).set({label: category})
    .then(() => {
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
  deleteCategory({state, commit, dispatch}) {
    if (state.selectedCategoryIndex !== 0) {
      const uid = account.state.uid;
      const todoArray = state.todos;
      const idArray = [];
      todoArray.forEach(todo => {
        const id = todo.id;
        idArray.push(id);
      });
      idArray.forEach(id => {
        const path = db.collection('users').doc(uid).collection('category').doc(state.selectedCategory).collection('todo');
        path.doc(id).delete();
      })
      // firestoreから削除
      db.collection('users').doc(uid).collection('category').doc(state.selectedCategory).delete();
      db.collection('users').doc(uid).collection('settings').doc('category').collection('labels').doc(state.selectedCategory).delete();
      const newIndex = state.selectedCategoryIndex - 1;
      const newCategory = state.categories[newIndex];
      commit('removeCategory', state.selectedCategoryIndex);
      commit('updateSelectedCategory', newCategory);      // 一つ前のカテゴリーを選択状態に
      commit('updateSelectedCategoryIndex', newIndex);
      dispatch('getTodo', uid);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
