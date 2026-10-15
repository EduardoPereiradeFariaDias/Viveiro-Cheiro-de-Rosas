<script setup>
import { ref } from 'vue'
import PlantaForm from '../components/PlantaForm.vue'
import { plantas, salvarPlanta, excluirPlanta } from '../services/storage'

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'Espécie', key: 'especie' },
  { title: 'Categoria', key: 'categoria' },
  { title: 'Preço', key: 'preco' },
  { title: 'Ações', key: 'acoes', sortable: false },
]
const dialog = ref(false)
const editando = ref(null)
const confirmar = ref(false)
const alvo = ref(null)
const snack = ref({ show: false, texto: '', cor: 'success' })

const avisar = (texto, cor = 'success') => (snack.value = { show: true, texto, cor })
const moeda = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function novo() { editando.value = null; dialog.value = true }
function editar(l) { editando.value = l; dialog.value = true }
function aoSalvar(l) {
  const novoRegistro = !l.id
  salvarPlanta(l)
  avisar(novoRegistro ? 'Planta cadastrada com sucesso!' : 'Planta atualizada com sucesso!')
}
function pedirExclusao(l) { alvo.value = l; confirmar.value = true }
function excluir() {
  excluirPlanta(alvo.value.id)
  confirmar.value = false
  avisar('Planta excluída.', 'warning')
}
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center text-h5 page-title pa-5">
      Gerenciar Plantas
      <v-spacer />
      <v-btn color="primary" prepend-icon="mdi-plus" @click="novo">Nova planta</v-btn>
    </v-card-title>
    <v-data-table :headers="headers" :items="plantas" no-data-text="Nenhuma planta cadastrada." items-per-page-text="Itens por página">
      <template #item.preco="{ item }">{{ moeda(item.preco) }}</template>
      <template #item.acoes="{ item }">
        <v-btn icon="mdi-pencil" size="small" variant="text" @click="editar(item)" />
        <v-btn icon="mdi-delete" size="small" variant="text" color="error" @click="pedirExclusao(item)" />
      </template>
    </v-data-table>
  </v-card>

  <PlantaForm v-model="dialog" :planta="editando" @salvar="aoSalvar" @erro="avisar($event, 'error')" />

  <v-dialog v-model="confirmar" max-width="420">
    <v-card title="Confirmar exclusão" :text="`Deseja realmente excluir &quot;${alvo?.nome}&quot;?`">
      <v-card-actions>
        <v-spacer />
        <v-btn @click="confirmar = false">Cancelar</v-btn>
        <v-btn color="error" variant="flat" @click="excluir">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snack.show" :color="snack.cor" timeout="3000">{{ snack.texto }}</v-snackbar>
</template>
