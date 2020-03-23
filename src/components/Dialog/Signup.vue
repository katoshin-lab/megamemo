<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
    >
      <div class="dialog" color="red">You required to sign in!</div>
      <v-btn @click="signIn">
        <v-icon class="dialog__google">mdi-google</v-icon>
        Access Your Google Account
      </v-btn>
    </v-row>
    <v-row>
      <v-col></v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn
          @click="show = !show"
        >
          <span>Guest</span>
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-text-field label="ID" :value="guest.email" readonly></v-text-field>
            <v-text-field label="Password" :value="guest.password" type="password" readonly></v-text-field>
            <v-btn @click="signInGuest">Submit</v-btn>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: false,
    guest: {
      email: "test@test.com",
      password: "password"
    }
  }),
  methods: {
    signIn() {
      this.$store.dispatch('account/login', {root: true});
    },
    signInGuest() {
      this.$store.dispatch('account/loginGuest', this.guest);
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog {
    padding: 15px;
    font-weight: bold;
    &__google {
      padding-right: 10px;
    }
  }
</style>