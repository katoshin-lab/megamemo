<template>
  <div>
    <v-system-bar
      height="30px"
    >
      <span>Category: {{ selectedCategory }}</span>
    </v-system-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters ('firebase', ['selectedCategory'])
  }
}
</script>