<template>
  <div>
    <v-system-bar
      height="30px"
    >
      <v-container>
        <v-row>
          <v-col>
            <span>Category: {{ selectedCategory }}</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <span>{{ time }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-system-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    time: "",
  }),
  computed: {
    ...mapGetters ('firebase', ['selectedCategory']),
  },
  mounted() {
    const weeks = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    setInterval(() => {
      let now = new Date();
      let year = now.getYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let week = weeks[ now.getDay() ];
      let hour = now.getHours();
      let min = now.getMinutes();
      let sec = now.getSeconds();
      let colon = ':';

      if (month < 10) { month = "0" + month; }
      if (day < 10) { day = "0" + day; }
      if (hour < 10) { hour = "0" + hour; }
      if (min < 10) { min = "0" + min; }
      if (sec < 10) { sec = "0" + sec; }
      if ((sec % 2 ) !== 0 ) { colon = "\t" }
      this.time = year + '-' + month + '-' + day + '(' + week + ')\t' + hour + ':' + min + colon + sec
    }, 500)
  }
}
</script>