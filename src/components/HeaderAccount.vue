<template>
  <div class="account">
    <div class="account__message">
      {{ msg }}{{ name }}!
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
        >
          <v-icon large>mdi-account-arrow-right</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    }
  },
  computed: {
    msg() {
      const now = new Date();
      const hours = now.getHours();
      if (hours >= 3 && hours <= 10) {
        return "Good morning";
      } else if (hours >= 11 && hours <= 17) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    }
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