/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'

// Composables
import { createVuetify } from 'vuetify'

const bulabutheme = {
  dark: false,
  colors: {
    primary: "#ec721d"
  }
}

const bulabuthemedark = {
  dark: true,
  colors: {
    primary: "#ec721d"
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: "bulabutheme",
    themes: {
      bulabutheme,
      bulabuthemedark
    }
  }
  
})
