<template>
  <div>
    <v-toolbar
      class="main-bar"
      color="secondary"
    >
      <v-toolbar-title class="main-bar__title">Check</v-toolbar-title>
      <v-divider
        inset
        vertical
      ></v-divider>
      <v-toolbar-title class="main-bar__title">Task</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text>
          Limit
        </v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-btn text>
          Estimated Time
        </v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-btn text class="main-bar__btn">
          priority
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-divider 
      class="divider"
      filled
    ></v-divider>
    <todo-card />
  </div>
</template>

<script>
import TodoCard from './Main/TodoCard';

export default {
  components: {
    TodoCard
  },
  data: () => ({
  }),
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .main-bar {
    &__title {
      display: inline-block;
      margin: 0 2%;
    }
    &__btn {
      width: 120px;
    }
  }

  .divider {
    margin: 10px 0;
  }
  
</style>
