<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        hide-overlay
        absolute
        temporary
        app
      >
        <drawer-content />
      </v-navigation-drawer>
      <v-app-bar
        app
        color="primary"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Megamemo</v-toolbar-title>
        <HeaderAccount></HeaderAccount>
        <v-switch
          v-model="$vuetify.theme.dark"
          label="Darkmode"
          color="accent"
          class="toggleDark"
          name="toggleDark"
        />
      </v-app-bar>
      <v-content>
        <nav-bar />
        <v-container>
          <v-row
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <main-content />
              <v-dialog
                v-model="dialog"
                persistent
                width="500"
              >
                <v-card>
                  <v-card-actions>
                    <signup></signup>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                persistent
                width="60%"
                v-model="newTodoDialog"
              >
                <new-todo />
              </v-dialog>
              <v-dialog
                persistent
                width="60%"
                v-model="todoDetailDialog"
              >
                <todo-detail />
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
      <v-footer
        app
        color="primary"
      >
        <span>&copy; 2020</span>
      </v-footer>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-app>
  </div>
</template>

<script>
  import firebase from 'firebase/app';
  import HeaderAccount from './components/HeaderAccount';
  import DrawerContent from './components/DrawerContent';
  import MainContent from './components/MainContent';
  import NavBar from './components/NavBar';
  import Signup from './components/Dialog/Signup';
  import newTodo from './components/Dialog/NewTodo';
  import TodoDetail from './components/Dialog/TodoDetail';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      HeaderAccount,
      Signup,
      DrawerContent,
      MainContent,
      NavBar,
      newTodo,
      TodoDetail
    },
    data: () => ({
      drawer: false,
      dialog: false,
      overlay: false,
      dark: true,
      color: "indigo darken-4",
    }),
    computed: {
      ...mapGetters(['newTodoDialog', 'todoDetailDialog'])
    },
    mounted() {
      this.overlay = true
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.dispatch('firebase/getTodo', user.uid);
          this.$store.dispatch('firebase/getCategory', user.uid);
          this.$store.commit('account/updateUserName', user.displayName);
          this.$store.commit('account/updateUserUid', user.uid);
          const id = setInterval(() => {
            if (this.$store.state.firebase.loading) {
              this.$store.commit('firebase/toggleLoading', false)
              this.overlay = false;
              this.dialog = false;
              if (window.Notification) {
                const notificationPermission = Notification.permission;
                if (notificationPermission === "denied") {
                  console.log(notificationPermission);
                  return;
                }
                if (notificationPermission === "granted") {
                  this.$store.dispatch('messaging/tokenRefresh');
                  return;
                }
                Notification.requestPermission(() => {
                  // eslint-disable-next-line no-unused-vars
                  var notification = new Notification("Hi there!");
                  console.log(notification);
                })
              }
              clearInterval(id);
            }
          }, 200)
        } else {
          this.overlay = false;
          this.dialog = true;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .toggleDark {
    position: absolute;
    right: 2%;
    top: 30%;
  }
</style>