<script setup>
const cards = [
  { icone: 'mdi-sprout', titulo: 'Cadastro', texto: 'Registre cada planta com categoria, preço, data e estoque.', to: '/plantas', cor: 'primary' },
  { icone: 'mdi-magnify', titulo: 'Consulta', texto: 'Encontre plantas com busca geral e filtros combinados.', to: '/consulta', cor: 'secondary' },
  { icone: 'mdi-map-marker', titulo: 'Fornecedor', texto: 'Cidade e UF preenchidas automaticamente pelo CEP.', to: '/plantas', cor: 'primary' },
]
</script>

<template>
  <v-card class="hero pa-8 pa-md-12 text-center mb-6" elevation="4">
    <div style="font-size: 64px">🌹</div>
    <h1 class="text-h3 font-weight-bold my-2">Cheiro de Rosas</h1>
    <p class="text-h6 font-weight-regular mb-6">Do viveiro ao jardim: registre e acompanhe cada vida verde</p>
    <v-btn size="large" color="white" class="text-primary ma-1" to="/plantas" prepend-icon="mdi-plus">Cadastrar planta</v-btn>
    <v-btn size="large" variant="outlined" class="ma-1" to="/consulta" prepend-icon="mdi-magnify">Consultar</v-btn>
  </v-card>
  <v-row>
    <v-col v-for="c in cards" :key="c.titulo" cols="12" md="4">
      <v-card :to="c.to" class="pa-5 h-100" hover>
        <v-avatar :color="c.cor" variant="tonal" size="56" class="mb-3"><v-icon :icon="c.icone" size="30" /></v-avatar>
        <div class="text-h6 mb-1">{{ c.titulo }}</div>
        <div class="text-medium-emphasis">{{ c.texto }}</div>
      </v-card>
    </v-col>
  </v-row>
</template>
