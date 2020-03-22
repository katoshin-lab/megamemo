<template>
  <div>
    <v-system-bar
      height="30px"
    >
      <v-container>
        <v-row>
          <v-col>
            <span>Category: {{ selectedCategory }}</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <span></span>
          </v-col>
        </v-row>
      </v-container>
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