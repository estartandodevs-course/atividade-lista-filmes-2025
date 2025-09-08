import filmes from "./data_filmes.js";

const listaFilmes = document.getElementById("lista-filmes");
const minhaListaElemento = document.getElementById("minha-lista");
const inputBusca = document.getElementById("input-busca");
const botoesGenero = document.getElementById("botoes-genero");
const botaoOrdenarNota = document.getElementById("ordenar-nota");
const btnOrdenarAno = document.getElementById("ordenar-ano");

let filmesRenderizados = [...filmes];
let minhaLista = [];

function salvarMinhaLista() {
  localStorage.setItem("minhaLista", JSON.stringify(minhaLista));
}

function carregarMinhaLista() {
  const listaSalva = localStorage.getItem("minhaLista");
  if (listaSalva) {
    minhaLista = JSON.parse(listaSalva);
  } else {
    minhaLista = [];
  }
}

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

inputBusca.addEventListener("input", () => {
  const termo = inputBusca.value.toLowerCase();
  filmesRenderizados = filmes.filter((f) =>
    f.titulo.toLowerCase().includes(termo)
  );
  renderizarFilmes(filmesRenderizados);
});


function gerarBotoesGeneros() {
  const generosUnicos = new Set();
  filmes.forEach((f) => f.generos.forEach((g) => generosUnicos.add(g)));

  botoesGenero.innerHTML = "";

  generosUnicos.forEach((genero) => {
    const btn = document.createElement("button");
    btn.textContent = genero;
    btn.addEventListener("click", () => {
      filmesRenderizados = filmes.filter((f) =>
        f.generos.includes(genero)
      );
      renderizarFilmes(filmesRenderizados);
    });
    botoesGenero.appendChild(btn);
  });
}

botaoOrdenarNota.addEventListener("click", () => {
  filmesRenderizados.sort((a, b) => b.nota - a.nota);
  renderizarFilmes(filmesRenderizados);
});

btnOrdenarAno.addEventListener("click", () => {
  filmesRenderizados.sort((a, b) => b.ano - a.ano);
  renderizarFilmes(filmesRenderizados);
})

// Coloquei a inicialização no final para que tudo seja lido primeiro, conforme dito na última aula
document.addEventListener("DOMContentLoaded", () => {
  gerarBotoesGeneros();
  renderizarFilmes(filmesRenderizados);
});