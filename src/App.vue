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
                v-model="this.$store.state.todoDialog"
              >
                <todo-dialog />
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
      <v-footer
        app
        color="primary"
      >
        <span>&copy; 2019</span>
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
  import Signup from './components/Signup';
  import DrawerContent from './components/DrawerContent';
  import MainContent from './components/MainContent';
  import TodoDialog from './components/Main/NewTodo';

  export default {
    components: {
      HeaderAccount,
      Signup,
      DrawerContent,
      MainContent,
      TodoDialog
    },
    data: () => ({
      drawer: false,
      dialog: false,
      overlay: false,
      dark: true,
      color: "indigo darken-4",
    }),
    mounted() {
      this.overlay = true
      firebase.auth().onAuthStateChanged(async (user) => {
        // eslint-disable-next-line no-console
        console.log(user);
        if (user) {
          await this.$store.dispatch('firebase/getTodo', user.uid)
          this.$store.commit('account/updateUserName', user.displayName);
          this.$store.commit('account/updateUserUid', user.uid);
          this.overlay = false;
          this.dialog = false;
        } else {
          this.overlay = false;
          this.dialog = true;
        }
      });
      
      // firebase.auth().getRedirectResult().then((result) => {
      //   if (result.credential) {
      //     // eslint-disable-next-line no-console
      //     console.log(result);
      //     const userInfo = result.user
      //     this.$store.dispatch('account/updateUserName', userInfo, { root: true })
      //   }
      // })
      // .catch((result) => {
      //   // eslint-disable-next-line no-console
      //   console.log(result);
      // })
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