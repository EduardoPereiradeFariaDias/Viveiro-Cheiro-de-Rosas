import axios from 'axios'

export async function buscarCep(cep) {
  const limpo = String(cep).replace(/\D/g, '')
  if (limpo.length !== 8) throw new Error('CEP deve ter 8 dígitos.')
  const { data } = await axios.get(`https://viacep.com.br/ws/${limpo}/json/`)
  if (data.erro) throw new Error('CEP não encontrado.')
  return data
}
