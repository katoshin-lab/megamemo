<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
    >
      <div class="dialog">You required to sign in!</div>
      <v-btn @click="signIn">
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
    padding-right: 15px;
  }
</style>