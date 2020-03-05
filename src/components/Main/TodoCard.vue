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
      <v-toolbar-title class="bar__task">Sample Todo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn class="bar__limit">3/8 19:00</v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-btn class="bar__est">30min</v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-menu transition="scroll-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              :color="color"
              class="bar__btn"
            >{{ priority }}</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-model="selectPriority"
              v-for="(priority, i) in priorities"
              :key="i"
              link
              @click="changePriority"
            >
              <v-list-item-title v-text="priority.label"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    isCompleted: false,
    selectPriority: "",
    priorities: [
      {label: 'Right Now'},
      {label: 'High'},
      {label: 'Middle'},
      {label: 'Low'},
      {label: 'Any Time'}
    ],
    color: "error"
  }),
  methods: {
    changePriority(input) {
      const priority = input.toElement.innerText;
      this.$store.commit('updatePriority', priority);
    }
  },
  computed: {
    ...mapGetters({
      priority: 'priority'
    })
  }
}
</script>

<style lang="scss" scoped>
  .bar {
    cursor: pointer;
    &__checkbox {
      margin: 20px 1.4% 0 2% !important;
    }
    &__task {
      display: inline-block;
      margin: 0 2%;
      text-align: initial;
    }
    &__limit {
    }
    &__est {
      width: 162px;
    }
    &__btn {
      width: 120px;
    }
    &__priority {
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