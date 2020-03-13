<template>
  <div>
    <v-toolbar class="bar">
      <v-checkbox
        v-model="isCompleted"
        messages="Completed!"
        class="bar__checkbox"
        color="success"
      >
      </v-checkbox>
      <template>
        <v-fab-transition>
          <v-btn
            v-show="isCompleted"
            color="red"
            fab
            small
            absolute
            left
            class="bar__minus"
            @click.stop="deleteTodo"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
      <template>
        <v-divider
          inset
          vertical
          class="bar__divider"
        ></v-divider>
        <v-toolbar-title class="bar__task" @click="todoDetailDialog">{{ todo.title }}</v-toolbar-title>
        <v-spacer @click="todoDetailDialog" class="bar__spacer"></v-spacer>
      </template>
      <v-toolbar-items>
        <v-btn class="bar__limit">{{ todo.date }} {{ todo.time }}</v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-btn class="bar__est">{{ todo.estTime }}{{ min }}</v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-menu transition="scroll-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              :color="priority[todo.priority].color"
              class="bar__btn"
            >{{ priority[todo.priority].label }}</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(p, i) in priority"
              :key="i"
              link
              @click="changePriority"
            >
              <v-list-item-title v-text="p.label"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    isCompleted: false,
    min: "\tmin"
  }),
  props: ['todo', 'index'],
  computed: {
    ...mapState([
      'priority'
    ])
  },
  methods: {
    todoDetailDialog(input) {
      // eslint-disable-next-line no-console
      console.log(input);
      this.$store.commit('toggleTodoDetailDialog', true);
    },
    changePriority(input) {
      const selectedPriorityLabel = input.toElement.innerText;
      const selectedPriorityObj = this.$store.state.priority.find((v) => v.label === selectedPriorityLabel);
      this.selectedPriority = selectedPriorityObj;
    },
    deleteTodo() {
      this.$store.dispatch('firebase/deleteTodo', this.index);
    },
  },
}
</script>

<style lang="scss" scoped>
  .bar {
    margin-bottom: 10px;

    &__checkbox {
      margin-top: 20px !important;
    }
    &__minus {
      left: 80px !important;
    }
    &__divider {
      margin-left: 50px;
    }
    &__task {
      display: inline-block;
      padding-left: 2%;
      width: 27vw;
      text-align: initial;
      font-size: 1.4rem;
      cursor: pointer;
    }
    &__spacer {
      cursor: pointer;
      height: 40px;
    }
    &__est {
      width: 162px;
    }
    &__btn {
      width: 120px;
    }
  }
  .v-select {
    width: 120px;
    margin-left: 16px;
    &__selections {
      display: inline-block;
      text-align: center;
    }
  }
</style>