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
                    v-model="date"
                    :rules="[rules.required]"
                    label="Date"
                    readonly
                    color="accent"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
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
                :return-value.sync="time"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    prepend-icon="mdi-clock-outline"
                    v-model="time"
                    :rules="[rules.required]"
                    label="Time"
                    readonly
                    color="accent"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timeMenu"
                  v-model="time"
                  full-width
                  header-color="secondary"
                  @input="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="estimatedTime"
                prepend-icon="mdi-timer-sand"
                label="Estimated Time"
                color="accent"
                :rules="[rules.required, rules.integer]"
                suffix="min"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-slider
                v-model="priority"
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
                @click="closeTodoDialog"
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
    date: "",
    time: "",
    dateMenu: false,
    timeMenu: false,
    estimatedTime: "",
    priority: 0,
    priorityMap: "",
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
      this.$store.commit('toggleTodoDialog', false);
      // eslint-disable-next-line no-console
    }
  },
  computed: {
    sliderColor() {
      if (this.priority === 0) return this.$store.state.priority[4].color
      if (this.priority === 1) return this.$store.state.priority[3].color
      if (this.priority === 2) return this.$store.state.priority[2].color
      if (this.priority === 3) return this.$store.state.priority[1].color
      return this.$store.state.priority[0].color
    },
    sliderMessage() {
      if (this.priority === 0) return this.$store.state.priority[4].label
      if (this.priority === 1) return this.$store.state.priority[3].label
      if (this.priority === 2) return this.$store.state.priority[2].label
      if (this.priority === 3) return this.$store.state.priority[1].label
      return this.$store.state.priority[0].label
    }
  }
}
</script>

<style lang="scss">
.slider {
  padding-top: 15px;
}
</style>