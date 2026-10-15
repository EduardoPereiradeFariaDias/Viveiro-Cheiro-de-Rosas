<script setup>
import { categorias } from '../services/storage'
const f = defineModel({ type: Object })
const emit = defineEmits(['limpar'])
const opcoesDisp = [
  { title: 'Todos', value: null },
  { title: 'Disponíveis', value: true },
  { title: 'Indisponíveis', value: false },
]
</script>

<template>
  <v-card class="pa-4 mb-4">
    <v-row dense>
      <v-col cols="12" md="6"><v-text-field v-model="f.busca" label="Busca geral (nome, espécie, cidade)" prepend-inner-icon="mdi-magnify" clearable /></v-col>
      <v-col cols="12" sm="6" md="3"><v-select v-model="f.categoria" :items="categorias" label="Categoria" clearable /></v-col>
      <v-col cols="12" sm="6" md="3"><v-select v-model="f.disponivel" :items="opcoesDisp" label="Disponibilidade" /></v-col>
      <v-col cols="6" md="3"><v-text-field v-model.number="f.precoMin" type="number" label="Preço de" prefix="R$" /></v-col>
      <v-col cols="6" md="3"><v-text-field v-model.number="f.precoMax" type="number" label="Preço até" prefix="R$" /></v-col>
      <v-col cols="6" md="3"><v-text-field v-model="f.dataDe" type="date" label="Adquirido de" /></v-col>
      <v-col cols="6" md="3"><v-text-field v-model="f.dataAte" type="date" label="Adquirido até" /></v-col>
    </v-row>
    <v-btn prepend-icon="mdi-filter-remove" variant="tonal" @click="emit('limpar')">Limpar filtros</v-btn>
  </v-card>
</template>
