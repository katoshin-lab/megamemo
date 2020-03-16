<template>
  <div class="drawer">
    <v-card class="mx-auto drawer__list">
      <v-list shaped>
        <v-subheader>Category</v-subheader>
        <v-list-item-group color="secondary" class="drawer group">
          <v-list-item
            v-for="(category, i) in categories"
            :key="i"
            :value="i"
            @click="changeCategory(i)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="category"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <div class="drawer__form">
      <v-text-field
        v-model="category"
        color="accent"
        label="Add Category"
      ></v-text-field>
      <v-btn
        color="accent"
        outlined
        absolute
        right
        @click="addCategory"
      >ADD</v-btn>
    </div>
    <v-btn
        color="red"
        absolute
        bottom
        right
        small
      >Delete Selected Category</v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    category: "",
  }),
  computed: {
    ...mapGetters('firebase', ['categories']),
  },
  methods: {
    changeCategory(index) {
      this.$store.dispatch('firebase/selectedCategory', index)
    },
    addCategory() {
      this.$store.dispatch('firebase/addCategory', this.category);
      this.category = "";
    }
  }
}
</script>

<style lang="scss">
  .drawer {
    height: 100%;
    width: 100%;

    &__list {
      height: 75%;
      width: 100%;
    }

    &__form {
      padding: 20px;
    }
  }
  .group {
    text-align: center;
  }
</style>
