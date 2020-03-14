<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">{{ selectedTodo.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field 
                v-model="todo.title"
                ref="title"
                label="Title"
                outlined
                color="accent"
                :rules="[rules.required]"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="todo.detail"
                label="Detail"
                outlined
                color="accent"
                :rules="[rules.required]"
                counter
                clearable
                maxlength="1000"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu 
                v-model="dateMenu"
                max-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    prepend-icon="mdi-calendar"
                    v-model="todo.date"
                    :rules="[rules.required]"
                    label="Date"
                    readonly
                    color="accent"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="todo.date"
                  @input="dateMenu = false"
                  full-width
                  header-color="secondary"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu 
                v-model="timeMenu"
                :close-on-content-click="false"
                ref="menu"
                :return-value.sync="todo.time"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    prepend-icon="mdi-clock-outline"
                    v-model="todo.time"
                    :rules="[rules.required]"
                    label="Time"
                    readonly
                    color="accent"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timeMenu"
                  v-model="todo.time"
                  full-width
                  header-color="secondary"
                  @input="$refs.menu.save(todo.time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="todo.estimatedTime"
                prepend-icon="mdi-timer-sand"
                label="Estimated Time"
                color="accent"
                :rules="[rules.required, rules.integer]"
                suffix="min"
              ></v-text-field>
            </v-col>
            <v-col >
              <v-slider
                v-model="todo.priority"
                prepend-icon="mdi-format-list-numbered"
                label="Priority"
                max="4"
                ticks="always"
                :color="sliderColor"
                :thumb-color="sliderColor"
                :hint="sliderMessage"
                track-color="gray"
                persistent-hint
                class="slider"
              ></v-slider>
            </v-col>
          </v-row>
          <v-row class="bottom-btn">
            <v-col></v-col>
            <v-col md="auto">
              <v-btn
                color="accent"
                text
                relative
                rigth
                bottom
                @click="closeTodoDetail"
              >CLOSE</v-btn>
            </v-col>
            <v-col md="auto">
              <v-btn
                color="accent"
                relative
                right
                bottom
                :disabled="updateBtn"
                @click="updateTodo"
              >UPDATE</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    todo: {
      title: null,
      detail: null,
      date: null,
      time: null,
      estimatedTime: 0,
      priority: 0,
    },
    dateMenu: false,
    timeMenu: false,
    rules: {
      required: value => !!value || 'Required',
      integer: value => {
        const pattern = /[0-9]/;
        return pattern.test(value) || 'Number only';
      }
    }
  }),
  computed: {
    ...mapGetters('firebase', ['selectedTodo']),
    sliderColor() {
      const n = this.todo.priority;
      return this.$store.state.priority[n].color
    },
    sliderMessage() {
      const n = this.todo.priority;
      return this.$store.state.priority[n].label
    },
    updateBtn() {
      if (this.selectedTodo.title === this.todo.title 
      && this.selectedTodo.detail === this.todo.detail
      && this.selectedTodo.date === this.todo.date
      && this.selectedTodo.time === this.todo.time
      && this.selectedTodo.estTime === this.todo.estimatedTime
      && this.selectedTodo.priority === this.todo.priority) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    closeTodoDetail() {
      this.$store.commit('toggleTodoDetailDialog', false);
    }
  },
  mounted() {
    // refreshing data
    this.todo.title = this.selectedTodo.title;
    this.todo.detail = this.selectedTodo.detail;
    this.todo.date = this.selectedTodo.date;
    this.todo.time = this.selectedTodo.time;
    this.todo.estimatedTime = this.selectedTodo.estTime;
    this.todo.priority = this.selectedTodo.priority;
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'firebase/selectedTodo') {
        this.todo.title = state.firebase.selectedTodo.title;
        this.todo.detail = state.firebase.selectedTodo.detail;
        this.todo.date = state.firebase.selectedTodo.date;
        this.todo.time = state.firebase.selectedTodo.time;
        this.todo.estimatedTime = state.firebase.selectedTodo.estTime;
        this.todo.priority = state.firebase.selectedTodo.priority;
      }
    })
  }
}
</script>