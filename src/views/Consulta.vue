<script setup>
import { ref, computed } from 'vue'
import FiltrosBar from '../components/FiltrosBar.vue'
import { plantas } from '../services/storage'

const padrao = () => ({ busca: '', categoria: null, disponivel: null, precoMin: null, precoMax: null, dataDe: '', dataAte: '' })
const filtros = ref(padrao())
const limpar = () => (filtros.value = padrao())

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'Espécie', key: 'especie' },
  { title: 'Categoria', key: 'categoria' },
  { title: 'Preço', key: 'preco' },
  { title: 'Aquisição', key: 'dataAquisicao' },
  { title: 'Disponível', key: 'disponivel' },
  { title: 'CEP', key: 'cep' },
  { title: 'Cidade/UF', key: 'cidade' },
]

const moeda = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const data = (d) => (d ? d.split('-').reverse().join('/') : '-')
const vazio = (v) => v === null || v === '' || v === undefined

const filtrados = computed(() => {
  const f = filtros.value
  const termo = (f.busca || '').toLowerCase().trim()
  return plantas.value.filter((l) => {
    if (termo && ![l.nome, l.especie, l.cidade, l.categoria].some((c) => (c || '').toLowerCase().includes(termo))) return false
    if (f.categoria && l.categoria !== f.categoria) return false
    if (f.disponivel !== null && l.disponivel !== f.disponivel) return false
    if (!vazio(f.precoMin) && l.preco < f.precoMin) return false
    if (!vazio(f.precoMax) && l.preco > f.precoMax) return false
    if (f.dataDe && l.dataAquisicao < f.dataDe) return false
    if (f.dataAte && l.dataAquisicao > f.dataAte) return false
    return true
  })
})
</script>

<template>
  <h1 class="text-h4 page-title mb-4">Consulta de Plantas</h1>
  <FiltrosBar v-model="filtros" @limpar="limpar" />
  <v-chip class="mb-3" color="primary">{{ filtrados.length }} resultado(s) encontrado(s)</v-chip>

  <v-card>
    <v-data-table :headers="headers" :items="filtrados" items-per-page-text="Itens por página">
      <template #no-data>
        <div class="pa-6 text-medium-emphasis">😕 Nenhuma planta atende aos filtros. Tente ajustá-los ou clique em "Limpar filtros".</div>
      </template>
      <template #item.preco="{ item }">{{ moeda(item.preco) }}</template>
      <template #item.dataAquisicao="{ item }">{{ data(item.dataAquisicao) }}</template>
      <template #item.disponivel="{ item }">
        <v-chip :color="item.disponivel ? 'success' : 'error'" size="small">{{ item.disponivel ? 'Sim' : 'Não' }}</v-chip>
      </template>
      <template #item.cidade="{ item }">{{ item.cidade }}{{ item.uf ? ' / ' + item.uf : '' }}</template>
    </v-data-table>
  </v-card>
</template>
