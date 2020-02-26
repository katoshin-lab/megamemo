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
        <v-list dense>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-contact-mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
        />
      </v-app-bar>
      <v-content>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    :href="source"
                    icon
                    large
                    target="_blank"
                    v-on="on"
                  >
                    <v-icon large>mdi-code-tags</v-icon>
                  </v-btn>
                </template>
                <span>Source</span>
              </v-tooltip>

              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    large
                    href="https://codepen.io/johnjleider/pen/zgxeLQ"
                    target="_blank"
                    v-on="on"
                  >
                    <v-icon large>mdi-codepen</v-icon>
                  </v-btn>
                </template>
                <span>Codepen</span>
              </v-tooltip>
              <v-dialog
                v-model="dialog_signup"
                width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="secondary"
                    dark
                    v-on="on"
                  >
                    Signup
                  </v-btn>
                </template>
                <v-card>
                  <v-card-actions>
                    <signup></signup>
                  </v-card-actions>
                </v-card>
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
      <router-view />
      <Overlay v-if="this.$store.idToken === null"></Overlay>
    </v-app>
  </div>
</template>

<script>
  // import firebase from 'firebase/app';
  import HeaderAccount from './components/HeaderAccount';
  import Overlay from './components/Overlay';
  import Signup from './components/Signup';

  export default {
    components: {
      HeaderAccount,
      Overlay,
      Signup
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: false,
      dialog_signup: false,
      dialog_signin: false,
      dark: true,
      color: "indigo darken-4",
    }),
    created() {
      this.$store.dispatch('account/loginInfo')
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