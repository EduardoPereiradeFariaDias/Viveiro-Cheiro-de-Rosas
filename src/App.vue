<script setup>
import { ref } from 'vue'
const drawer = ref(null)
const itens = [
  { titulo: 'Início', icone: 'mdi-home-heart', to: '/' },
  { titulo: 'Gerenciar Plantas', icone: 'mdi-sprout', to: '/plantas' },
  { titulo: 'Consulta', icone: 'mdi-magnify', to: '/consulta' },
]
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" width="260">
      <div class="pa-5 text-center">
        <div style="font-size: 42px">🌹</div>
        <div class="brand text-h6 text-primary">Cheiro de Rosas</div>
        <div class="text-caption text-medium-emphasis">Viveiro de plantas</div>
      </div>
      <v-divider />
      <v-list nav class="mt-2">
        <v-list-item v-for="i in itens" :key="i.to" :to="i.to" :prepend-icon="i.icone" :title="i.titulo" rounded="lg" color="primary" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title class="brand">🌹 Cheiro de Rosas</v-app-bar-title>
    </v-app-bar>
    <v-main><v-container style="max-width: 1200px"><router-view /></v-container></v-main>
  </v-app>
</template>
