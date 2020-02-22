import Vue from 'vue';
import Router from 'vue-router';
// import Overlay from './components/Overlay';
// import Signup from './components/Signup.vue';
// import Signin from './components/Signin.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // routes: [
  //   { path: '/window', component: Overlay ,
  //     children: [
  //       {
  //         path: 'signup',
  //         component: Signup
  //       },
  //       {
  //         path: 'signin',
  //         component: Signin
  //       }
  //     ]
  //   }
  // ]
})