<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">New Todo</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field 
                v-model="todo.title"
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
            <v-col>
              <v-slider
                v-model="todo.priority"
                prepend-icon="mdi-format-list-numbered"
                label="Priority"
                max="4"
                ticks="always"
                :color="sliderColor"
                :thumb-color="sliderColor"
                track-color="gray"
                :hint="sliderMessage"
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
                @click="closeTodoDialog"
              >CLOSE</v-btn>
            </v-col>
            <v-col md="auto">
              <v-btn
                color="accent"
                relative
                right
                bottom
                :disabled="saveBtn"
                @click="createTodo"
              >SAVE</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () =>  ({
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
  methods: {
    closeTodoDialog() {
      this.$store.commit('toggleNewTodoDialog', false);
    },
    createTodo() {
      this.$store.dispatch('firebase/createTodo', this.todo);
      this.$store.commit('toggleNewTodoDialog', false);
      this.todo.title = null;
      this.todo.detail = null;
      this.todo.date = null;
      this.todo.time = null;
      this.todo.estimatedTime = 0;
      this.todo.priority = 0;
    }
  },
  computed: {
    sliderColor() {
      const n = this.todo.priority
      return this.$store.state.priority[n].color
    },
    sliderMessage() {
      const n = this.todo.priority
      return this.$store.state.priority[n].label
    },
    saveBtn() {
      if (this.todo.title && this.todo.detail && this.todo.date && this.todo.time) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
.slider {
  padding-top: 15px;
}
</style>