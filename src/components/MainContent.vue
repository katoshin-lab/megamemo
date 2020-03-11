<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        elevate-on-scroll
        class="main-bar"
        color="secondary"
        scroll-target="#todo-cards"
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              fab
              class="main-bar__new"
              color="accent"
              v-on="on"
              @click="newTodoDialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>New Todo</span>
        </v-tooltip>
      </v-app-bar>
      <v-sheet
        id="todo-cards"
        max-height="650"
        class="cards overflow-y-auto"
      >
        <div
          v-for="todo in this.$store.state.firebase.todos"
          :key="todo.title"
        >
          <todo-card
            :todo="todo"
          ></todo-card>
        </div>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
import TodoCard from './Main/TodoCard';
import { mapState } from 'vuex'

export default {
  components: {
    TodoCard,
  },
  data: () => ({
  }),
  computed: {
    ...mapState({
      todos: 'firebase/todos',
    })
  },
  methods: {
    newTodoDialog() {
      this.$store.commit('toggleTodoDialog', true)
      // eslint-disable-next-line no-console
      console.log(this.$store.state.firebase.todos);
    }
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
    &__new {
      position: absolute;
      left: -70px;
    }
  }

  .cards {
    padding-top: 80px;
  }
</style>
