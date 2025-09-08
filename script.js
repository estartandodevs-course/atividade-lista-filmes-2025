import { filmes } from "./data_filmes.js";

document.addEventListener("DOMContentLoaded", () => {
  // Chamada de função
  renderizarFilmes(filmes);
  extrairTodosOsGenerosUnicos(filmes);

  // Renderiza a Lista de Filmes
  function renderizarFilmes(listaParaRenderizar) {
    const listaFilmesElement = document.getElementById("lista-filmes");
    listaFilmesElement.innerHTML = "";

    const card = listaParaRenderizar
      .map((filme) => {
        const cardHTML = `
    <div class="card-filme" id="filme-${filme.id}">
        <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
        <h2>${filme.titulo} (${filme.ano})</h2>
        <p>Nota: ${filme.nota}</p>
        <button class="btn-adicionar">Adicionar à Minha Lista</button>
    </div>`;
        return cardHTML;
      })
      .join("");

    listaFilmesElement.innerHTML = card;
  }

  //Implementa a Busca por Título
  const input = document.getElementById("input-busca");
  input.addEventListener("input", () => {
    const valorDoInput = input.value.trim();
    const filmesFiltrados = filmes.filter((filme) =>
      filme.titulo.toLowerCase().includes(valorDoInput.toLowerCase())
    );
    renderizarFilmes(filmesFiltrados);
  });

  //Implementa botões de filtros de gênero
  function extrairTodosOsGenerosUnicos(generoFilme) {
    const botoesDeGeneros = document.getElementById("botoes-genero");
    botoesDeGeneros.innerHTML = "";

    const todosOsGeneros = generoFilme.flatMap((genero) => genero.generos);
    const generosUnificados =[...new Set(todosOsGeneros)];
    const renderizarGeneros = generosUnificados.map((genero) => {
      const generosHTML = `<button>${genero}</button>`;
      return generosHTML;
    }).join("");

    botoesDeGeneros.innerHTML = renderizarGeneros;
  }
});
