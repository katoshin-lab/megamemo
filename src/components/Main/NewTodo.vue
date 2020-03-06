<template>
  <div>
    <v-btn
      color="accent"
      text
      @click="closeTodoDialog"
    >CLOSE</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    closeTodoDialog() {
      this.$store.commit('toggleTodoDialog', false);
    }
  }
}
</script>