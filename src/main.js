import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'rosas',
    themes: {
      rosas: {
        dark: false,
        colors: {
          primary: '#B8325A',
          secondary: '#4F8A5B',
          background: '#FFF6F7',
          surface: '#FFFFFF',
          error: '#C62828',
          success: '#3E8E5A',
        },
      },
    },
  },
  defaults: {
    VCard: { rounded: 'xl', elevation: 2 },
    VBtn: { rounded: 'lg' },
    VChip: { rounded: 'lg' },
    VTextField: { variant: 'outlined', density: 'comfortable', color: 'primary' },
    VSelect: { variant: 'outlined', density: 'comfortable', color: 'primary' },
    VDataTable: { hover: true },
  },
})

createApp(App).use(vuetify).use(router).mount('#app')
