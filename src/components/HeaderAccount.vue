<template>
  <div class="account">
    <div class="account__message">
      {{ headerMessage }}!
    </div>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          large
          target="_blank"
          v-on="on"
        >
          <v-icon large>mdi-account-cog</v-icon>
        </v-btn>
      </template>
      <span>Settings</span>
    </v-tooltip>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          large
          target="_blank"
          v-on="on"
          @click="signOut"
        >
          <v-icon large>mdi-account-arrow-right</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: null
    }
  },
  computed: {
    ...mapGetters({
      headerMessage: 'account/headerMessage'
    })
  },
  methods: {
    signOut() {
      this.$store.dispatch('account/logout')
    },
    
  }
}
</script>

<style lang="scss" scoped>
  .account {
    position: absolute;
    right: 120px;
    margin-right: 4%;
    display: flex;

    &__message {
      display: inline-block;
      line-height: 44px;
      margin-right: 10px;
    }
  }
</style>