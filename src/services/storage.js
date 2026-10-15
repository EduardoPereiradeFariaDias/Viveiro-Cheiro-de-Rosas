import { ref, watch } from 'vue'

const CHAVE = 'viveiro:plantas'

export const categorias = ['Folhagem', 'Flor', 'Suculenta', 'Frutífera', 'Medicinal', 'Palmeira', 'Outra']

function carregar() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || []
  } catch {
    return []
  }
}

// Fonte única de dados, compartilhada entre CRUD e Consulta
export const plantas = ref(carregar())

watch(plantas, (v) => localStorage.setItem(CHAVE, JSON.stringify(v)), { deep: true })

export function salvarPlanta(planta) {
  if (planta.id) {
    const i = plantas.value.findIndex((l) => l.id === planta.id)
    if (i >= 0) plantas.value[i] = { ...planta }
  } else {
    plantas.value.push({ ...planta, id: Date.now() })
  }
}

export function excluirPlanta(id) {
  plantas.value = plantas.value.filter((l) => l.id !== id)
}
