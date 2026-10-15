import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Crud from './views/Crud.vue'
import Consulta from './views/Consulta.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'inicio', component: Home },
    { path: '/plantas', name: 'crud', component: Crud },
    { path: '/consulta', name: 'consulta', component: Consulta },
  ],
})
