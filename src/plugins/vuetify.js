import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.lighten3,
        secondary: colors.blue.lighten2,
        accent: colors.cyan.lighten3
      },
      dark: {
        primary: colors.indigo.darken4,
        secondary: colors.indigo.darken3,
        accent: colors.indigo.lighten2
      }
    }
  },
});
