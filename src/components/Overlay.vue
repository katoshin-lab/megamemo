<template>
  <v-overlay>
    <div class="box" color="primary">
      <router-view></router-view>
    </div>
  </v-overlay>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .box {
    height: 40vh;
    width: 30vw;

  }
</style>