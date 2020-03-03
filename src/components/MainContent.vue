<template>
  <div>
    <v-toolbar
      min-width="50%"
      class="line"
    >
      <v-toolbar-title>Title</v-toolbar-title>
      <v-divider
        class="mx-4"
        inset
        vertical
      ></v-divider>
      <span class="subheading">My Home</span>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text>
          News
        </v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-btn text>
          Blog
        </v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-btn text>
          Music
        </v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
      </v-toolbar-items>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card
      min-width="50%"
      class="margin"
    >
      <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="card">
            <v-checkbox
              v-model="isCompleted"
              color="success"
              name="isCompleted"
              true-value="Completed!"
            >
            </v-checkbox>
            <v-card-title>テストToDo</v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    isCompleted: false,
  }),
  methods: {
  }
}
</script>

<style lang="scss">
  .margin {
    margin: 10px 0;
  }

  .card {
    display: flex;
    padding: 0 12px;
  }
</style>
