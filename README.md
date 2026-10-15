# Cheiro de Rosas – CRUD de Plantas

Avaliação 2 – FACET-SNP-310 – Frameworks Modernos para Desenvolvimento de Sistemas (2026.2)

## Integrantes
- Eduardo Pereira de Faria Dias – @SEU-USUARIO-GITHUB

## Tema
Sistema do viveiro Cheiro de Rosas: cadastro de plantas (nome, espécie, categoria, preço, data de aquisição, disponibilidade e CEP/cidade/UF do fornecedor).

## Funcionalidades
- CRUD de plantas (tabela, formulário em dialog com validação, confirmação de exclusão e snackbar)
- Página de consulta com busca geral e filtros por categoria, faixa de preço, intervalo de datas e disponibilidade, botão "Limpar filtros" e contador de resultados
- Dados compartilhados entre as páginas e persistidos no localStorage (`src/services/storage.js`)
- API consumida: ViaCEP (via Axios), preenchendo cidade e UF a partir do CEP

## Como executar
```
npm install
npm run dev
```
