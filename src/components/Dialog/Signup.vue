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
  </v-container>
</template>

<script>
export default {
  methods: {
    signIn() {
      this.$store.dispatch('account/login', {root: true})
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