<template>
  <div>
    <v-card>
      <v-app-bar
        absolute
        elevate-on-scroll
        class="main-bar"
        color="secondary"
        scroll-target="#todo-cards"
      >
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
        <v-toolbar-title class="main-bar__check">Check</v-toolbar-title>
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
      </v-app-bar>
      <v-sheet
        id="todo-cards"
        max-height="74vh"
        class="cards overflow-y-auto"
      >
        <div
          v-for="(todo, index) in todos"
          :key="todo.index"
        >
          <todo-card
            :todo="todo"
            :index="index"
          ></todo-card>
        </div>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
import TodoCard from './Main/TodoCard';
import { mapGetters } from 'vuex';

export default {
  components: {
    TodoCard,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters('firebase', ['todos'])
  },
  methods: {
    newTodoDialog() {
      this.$store.commit('toggleNewTodoDialog', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-bar {
    &__check {
      display: inline-block;
      margin-left: 25px;
      margin-right: 32px;
    }
    &__title {
      margin-left: 2%;
    }
    &__btn {
      width: 120px;
    }
    &__new {
      position: absolute;
      top: 4px;
      left: -70px;
    }
  }

  .cards {
    padding-top: 80px;
  }
</style>
