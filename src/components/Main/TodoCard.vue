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
      <v-divider
          inset
          vertical
      ></v-divider>
      <v-toolbar-title class="bar__task">{{ todo.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
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
  props: ['todo'],
  computed: {
    ...mapState([
      'priority'
    ])
  },
  methods: {
    changePriority(input) {
      const selectedPriorityLabel = input.toElement.innerText;
      const selectedPriorityObj = this.$store.state.priority.find((v) => v.label === selectedPriorityLabel);
      this.selectedPriority = selectedPriorityObj;
    }
  },
}
</script>

<style lang="scss" scoped>
  .bar {
    cursor: pointer;
    margin-bottom: 10px;

    &__checkbox {
      margin: 20px 1.4% 0 2% !important;
    }
    &__task {
      display: inline-block;
      margin: 0 2%;
      text-align: initial;
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