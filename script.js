import filmes from "./data_filmes.js";

const listaFilmes = document.getElementById("lista-filmes");
const minhaListaElemento = document.getElementById("minha-lista");
const inputBusca = document.getElementById("input-busca");
const botoesGeneroElement = document.getElementById("botoes-genero");
const btnOrdenarNota = document.getElementById("ordenar-nota");
const btnOrdenarAno = document.getElementById("ordenar-ano");

let filmesRenderizados = [...filmes];
let minhaLista = [];

function renderizarFilmes(listaParaRenderizar) {
  listaFilmes.innerHTML = "";

  listaParaRenderizar.forEach((filme) => {
    const card = document.createElement("div");
    card.classList.add("card-filme");

    card.innerHTML = `
      <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
      <h2>${filme.titulo} (${filme.ano})</h2>
      <p>Nota: ${filme.nota}</p>
      <button>Adicionar à Minha Lista</button>
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => adicionarMinhaLista(filme));

    listaFilmes.appendChild(card);
  });
}

function renderizarMinhaLista() {
  minhaListaElemento.innerHTML = "";

  minhaLista.forEach((filme) => {
    const card = document.createElement("div");
    card.classList.add("card-filme");

    card.innerHTML = `
      <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
      <h2>${filme.titulo} (${filme.ano})</h2>
      <p>Nota: ${filme.nota}</p>
      <button>Remover</button>
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => removerMinhaLista(filme.id));

    minhaListaElemento.appendChild(card);
  });
}

function adicionarMinhaLista(filme) {
  if (!minhaLista.some((f) => f.id === filme.id)) {
    minhaLista.push(filme);
    renderizarMinhaLista();
  }
}

function removerMinhaLista(id) {
  minhaLista = minhaLista.filter((f) => f.id !== id);
  renderizarMinhaLista();
}