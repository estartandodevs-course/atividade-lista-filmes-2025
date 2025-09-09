# Projeto Prático - Sua Lista de Filmes Interativa

Este é um desafio prático projetado para aplicar e combinar seus conhecimentos de JavaScript em um ambiente visual e interativo. Você transformará uma página HTML estática em uma aplicação web funcional onde é possível explorar, filtrar e salvar uma lista de filmes.

## 🎬 Visão Geral do Projeto

    Aplicação de página única onde o usuário pode:

- Visualizar uma galeria de filmes a partir de uma base de dados local.
- Buscar filmes por título em tempo real.
- Filtrar a galeria por gênero.
- Ordenar os filmes por nota ou por ano de lançamento.
- Adicionar e remover filmes de uma "Minha Lista" pessoal, que fica salva no navegador.

## 🎯 Objetivos de Aprendizagem

Ao final deste projeto, você terá praticado:

- **Manipulação do DOM:** Criar, ler, atualizar e remover elementos HTML dinamicamente.
- **Event Handling:** Usar `addEventListener` para responder a cliques, digitação e outras interações do usuário.
- **Web Storage:** Salvar e carregar dados do `localStorage` para criar uma experiência persistente.
- **Métodos de Array:**
  - `map()`: Para renderizar listas de elementos.
  - `filter()`: Para implementar a busca e os filtros.
  - `sort()`: Para ordenar os dados com base em critérios.
  - `reduce()`: Para processar e agregar dados (como na criação dos filtros dinâmicos).
  - `find()`, `findIndex()` e `some()`: Para gerenciar a lista de favoritos.

## 📌 Passo a passo

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. **Acesse a pasta do projeto:**
   ```bash
   cd nome-do-repositorio
   ```
3. **Crie uma nova branch com seu nome:**
   ```bash
   git checkout -b minha-solucao (seu nome)
   ```
4. **Escreva seu código no arquivo script.js.**

5. **Adicione suas alterações:**
   ```bash
   git add .
   ```
6. **Faça o commit com uma mensagem descritiva:**
   ```bash
   git commit -m "utilize commit semântico"
   ```
7. **Envie para o repositório remoto:**
   ```bash
   git push -u origin minha-solucao
   ```
8. **Abra um Pull Request (PR)** no GitHub para que sua solução seja revisada.

   **Abra e Teste**: Abra o arquivo `index.html` em seu navegador com live server e mantenha o Console do Desenvolvedor (F12) aberto para depurar seu código.

---

## 🛠️ Passos para o Desenvolvimento (Guia de Exercícios)

Implemente as funcionalidades na ordem sugerida para uma melhor progressão de aprendizado.

### Passo 1: Renderizar a Lista Inicial de Filmes

O primeiro passo é exibir os filmes da nossa base de dados na tela.

- **Tarefa:** Crie uma função `renderizarFilmes(listaParaRenderizar)`. Esta função deve receber um array de objetos de filmes.
- **Como Fazer:**
  1.  Selecione o elemento `<main id="lista-filmes">`.
  2.  Limpe qualquer conteúdo existente dentro dele (`listaFilmesElement.innerHTML = '';`).
  3.  Use o método `map()` no array `listaParaRenderizar` para transformar cada objeto de filme em uma string HTML que representa um card de filme. Use _template literals_ para facilitar.
      ```javascript
      // Exemplo de estrutura do card
      const cardHTML = `
          <div class="card-filme" id="filme-${filme.id}">
              <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
              <h2>${filme.titulo} (${filme.ano})</h2>
              <p>Nota: ${filme.nota}</p>
              <button class="btn-adicionar">Adicionar à Minha Lista</button>
          </div>
      `;
      ```
  4.  Use o método `.join('')` no array de strings HTML resultante para criar uma única string.
  5.  Atribua essa string gigante ao `innerHTML` do elemento principal.
- **Finalização:** Chame `renderizarFilmes(filmes)` no início do seu script (dentro do `DOMContentLoaded`) para que a lista apareça assim que a página carregar.

### Passo 2: Implementar a Busca por Título

Vamos dar ao usuário o poder de encontrar filmes específicos.

- **Tarefa:** Faça o campo de busca `<input id="input-busca">` funcionar em tempo real.
- **Como Fazer:**
  1.  Selecione o campo de busca.
  2.  Adicione um `addEventListener` para o evento `'input'`.
  3.  Dentro da função do evento, pegue o valor digitado (`input.value`), converta para letras minúsculas e remova espaços em branco com `.trim()`.
  4.  Use o método `filter()` no array **original** `filmes`. O critério do filtro deve ser se o `titulo` do filme (também em minúsculas) `.includes()` o texto da busca.
  5.  Chame a função `renderizarFilmes()` com a lista de filmes já filtrada.

### Passo 3: Implementar Filtros de Gênero Dinâmicos

Em vez de escrever os gêneros no HTML, vamos criá-los a partir dos dados que já temos.

- **Tarefa:** Gerar botões para cada gênero único e fazê-los filtrar a lista de filmes.
- **Como Fazer:**
  1.  **Gerar Botões (Desafio de `reduce` ou `flatMap`):**
      - Crie uma função para extrair todos os gêneros únicos do array `filmes`.
      - **Dica:** Use `flatMap()` para criar um array com todos os gêneros, e depois `new Set()` para obter apenas os valores únicos.
      - Use `forEach()` ou `map()` na lista de gêneros únicos para criar um `<button>` para cada um e adicioná-los à `<div id="botoes-genero">`.
  2.  **Filtrar por Gênero:**
      - Use **delegação de eventos**: adicione um `addEventListener('click', ...)` na div `botoes-genero`.
      - Verifique se o `event.target` foi um botão. Se sim, pegue o gênero do `textContent` do botão.
      - Use `filter()` para criar uma nova lista de filmes onde o array `generos` do filme `.includes()` o gênero selecionado.
      - Chame a função `renderizarFilmes()` com o resultado.
      - Adicione um botão "Mostrar Todos" para limpar o filtro.

### Passo 4: Implementar Ordenação

Permita que o usuário organize a lista por diferentes critérios.

- **Tarefa:** Fazer os botões "Ordenar por Nota" e "Ordenar por Ano" funcionarem.
- **Como Fazer:**
  1.  Adicione `addEventListener('click', ...)` para cada botão de ordenação.
  2.  **Importante:** Antes de ordenar, crie uma **cópia** do array que está sendo exibido no momento, para não alterar o array original (`const copiaLista = [...listaAtual]`).
  3.  Use o método `sort()` na cópia.
      - Para nota (maior para menor): `copiaLista.sort((a, b) => b.nota - a.nota);`
      - Para ano (mais recente primeiro): `copiaLista.sort((a, b) => b.ano - a.ano);`
  4.  Chame `renderizarFilmes()` com a lista ordenada.

### Passo 5: Gerenciar a "Minha Lista" com `localStorage`

A funcionalidade principal: salvar os filmes favoritos do usuário.

- **Tarefa:** Implementar a lógica de adicionar filmes à "Minha Lista" e fazer com que ela persista.
- **Como Fazer:**
  1.  Crie duas funções auxiliares: `salvarMinhaLista(lista)` e `carregarMinhaLista()`. A primeira usa `JSON.stringify` e `localStorage.setItem`, e a segunda usa `localStorage.getItem` e `JSON.parse` (com tratamento para o caso de não haver nada salvo, retornando `[]`).
  2.  Use **delegação de eventos** no `main` para ouvir cliques nos botões `.btn-adicionar`.
  3.  No evento, descubra o `id` do filme a partir do `id` do card (`event.target.closest('.card-filme').id`).
  4.  Use `find()` no array `filmes` para obter o objeto completo do filme.
  5.  Carregue a lista atual de favoritos, adicione o novo filme (verifique se já não existe com `.some()`), e salve de volta no `localStorage`.
  6.  Crie uma função `renderizarMinhaLista()` que lê do `localStorage` e exibe os filmes na seção `<section id="minha-lista">`. Chame-a no carregamento da página e sempre que um novo filme for adicionado.

### 🏆 Desafios Extras (Para ir Além)

- **Remover da Lista:** Adicione um botão "Remover" nos cards da "Minha Lista" e implemente a lógica de remoção do `localStorage`.
- **Feedback Visual:** Quando um filme é adicionado à "Minha Lista", mude o texto ou o estilo do seu botão "Adicionar" na lista principal para "Adicionado ✓".
- **Modal de Detalhes:** Faça com que, ao clicar em um card de filme (não no botão), uma janela modal apareça exibindo a `sinopse` do filme.
- **Estatísticas da Lista:** Usando `reduce`, calcule e exiba a nota média dos filmes que estão na "Minha Lista".
