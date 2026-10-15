<script setup>
import { ref, watch } from 'vue'
import { categorias } from '../services/storage'
import { buscarCep } from '../services/viacep'

const props = defineProps({ modelValue: Boolean, planta: Object })
const emit = defineEmits(['update:modelValue', 'salvar', 'erro'])

const vazio = () => ({ nome: '', especie: '', categoria: null, preco: null, dataAquisicao: '', disponivel: true, cep: '', cidade: '', uf: '' })
const form = ref(vazio())
const formRef = ref(null)
const carregandoCep = ref(false)

watch(() => props.modelValue, (aberto) => {
  if (aberto) form.value = props.planta ? { ...props.planta } : vazio()
})

const obrigatorio = (v) => (v !== null && v !== '' && v !== undefined) || 'Campo obrigatório.'
const regras = {
  nome: [obrigatorio, (v) => (v || '').length >= 2 || 'Mínimo de 2 caracteres.'],
  especie: [obrigatorio],
  categoria: [obrigatorio],
  preco: [obrigatorio, (v) => v >= 0.01 || 'O preço deve ser maior que zero.', (v) => v <= 10000 || 'Preço máximo: R$ 10.000.'],
  data: [obrigatorio, (v) => v <= new Date().toISOString().slice(0, 10) || 'A data não pode ser futura.'],
  cep: [obrigatorio, (v) => /^\d{5}-?\d{3}$/.test(v) || 'CEP inválido (ex.: 78550-000).'],
}

async function procurarCep() {
  if (!/^\d{5}-?\d{3}$/.test(form.value.cep)) return emit('erro', 'Informe um CEP válido antes de buscar.')
  carregandoCep.value = true
  try {
    const d = await buscarCep(form.value.cep)
    form.value.cidade = d.localidade
    form.value.uf = d.uf
  } catch (e) {
    emit('erro', e.response ? 'Erro ao consultar o CEP.' : e.request ? 'Falha de rede ao consultar o CEP.' : e.message)
  } finally {
    carregandoCep.value = false
  }
}

async function enviar() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  emit('salvar', { ...form.value, preco: Number(form.value.preco) })
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="640" persistent @update:model-value="emit('update:modelValue', $event)">
    <v-card :title="form.id ? 'Editar planta' : 'Nova planta'">
      <v-card-text>
        <v-form ref="formRef">
          <v-row dense>
            <v-col cols="12" sm="6"><v-text-field v-model="form.nome" label="Nome" :rules="regras.nome" /></v-col>
            <v-col cols="12" sm="6"><v-text-field v-model="form.especie" label="Espécie" :rules="regras.especie" /></v-col>
            <v-col cols="12" sm="6"><v-select v-model="form.categoria" :items="categorias" label="Categoria" :rules="regras.categoria" /></v-col>
            <v-col cols="12" sm="6"><v-text-field v-model.number="form.preco" type="number" step="0.01" prefix="R$" label="Preço" :rules="regras.preco" /></v-col>
            <v-col cols="12" sm="6"><v-text-field v-model="form.dataAquisicao" type="date" label="Data de aquisição" :rules="regras.data" /></v-col>
            <v-col cols="12" sm="6"><v-switch v-model="form.disponivel" label="Disponível no estoque" color="primary" /></v-col>
            <v-col cols="12" sm="4">
              <v-text-field v-model="form.cep" label="CEP do fornecedor" :rules="regras.cep" :loading="carregandoCep"
                append-inner-icon="mdi-magnify" @click:append-inner="procurarCep" />
            </v-col>
            <v-col cols="8" sm="6"><v-text-field v-model="form.cidade" label="Cidade" readonly /></v-col>
            <v-col cols="4" sm="2"><v-text-field v-model="form.uf" label="UF" readonly /></v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="primary" variant="flat" @click="enviar">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
