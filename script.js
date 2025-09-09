import filmes from "./data_filmes.js";

let listaAtual = [...filmes];

function renderizarFilmes(listaParaRenderizar) {
  const listaFilmes = document.getElementById("lista-filmes");
  listaFilmes.innerHTML = "";

  const cardHTML = listaParaRenderizar
    .map(
      (filme) => `
    <div class="card-filme" id="filme-${filme.id}">
        <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
        <h2>${filme.titulo} (${filme.ano})</h2>
        <p>Nota: ${filme.nota}</p>
        <button class="btn-adicionar">Adicionar à Minha Lista</button>
    </div>
`
    )
    .join("");

  listaFilmes.innerHTML = cardHTML;
}

const inputBusca = document.getElementById("input-busca");
inputBusca.addEventListener("input", () => {
  const termo = inputBusca.value.toLowerCase().trim();

  listaAtual = filmes.filter((filme) =>
    filme.titulo.toLowerCase().includes(termo)
  );
  renderizarFilmes(listaAtual);
});

function configurarFiltrosGenero() {
  const botoesGeneroDiv = document.getElementById("botoes-genero");

  const generosUnicos = [...new Set(filmes.flatMap((f) => f.generos))];

  botoesGeneroDiv.innerHTML = "<button>Mostrar Todos</button>";
  generosUnicos.forEach((genero) => {
    const btn = document.createElement("button");
    btn.textContent = genero;
    botoesGeneroDiv.appendChild(btn);
  });

  botoesGeneroDiv.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const genero = e.target.textContent;
      if (genero === "Mostrar Todos") {
        listaAtual = [...filmes];
      } else {
        listaAtual = filmes.filter((filme) => filme.generos.includes(genero));
      }
      renderizarFilmes(listaAtual);
    }
  });
}

function configurarOrdenacao() {
  const btnNota = document.getElementById("btn-ordenar-nota");
  const btnAno = document.getElementById("btn-ordenar-ano");

  btnNota.addEventListener("click", () => {
    const copiaLista = [...listaAtual];
    copiaLista.sort((a, b) => b.nota - a.nota);
    renderizarFilmes(copiaLista);
  });

  btnAno.addEventListener("click", () => {
    const copiaLista = [...listaAtual];
    copiaLista.sort((a, b) => b.ano - a.ano);
    renderizarFilmes(copiaLista);
  });
}

function salvarMinhaLista(lista) {
  localStorage.setItem("minhaLista", JSON.stringify(lista));
}

function carregarMinhaLista() {
  const lista = localStorage.getItem("minhaLista");
  return lista ? JSON.parse(lista) : [];
}

function renderizarMinhaLista() {
  const minhaListaSection = document.getElementById("minha-lista");
  minhaListaSection.innerHTML = "";

  const lista = carregarMinhaLista();

  if (lista.length === 0) {
    minhaListaSection.innerHTML = "<p>Nenhum filme na sua lista ainda 😢</p>";
    return;
  }

  const cards = lista
    .map(
      (filme) => `
      <div class="card-filme" id="favorito-${filme.id}">
        <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
        <h2>${filme.titulo} (${filme.ano})</h2>
        <p>Nota: ${filme.nota}</p>
      </div>
    `
    )
    .join("");

  minhaListaSection.innerHTML = cards;
}

document.getElementById("lista-filmes").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-adicionar")) {
    const card = e.target.closest(".card-filme");
    const idFilme = parseInt(card.id.replace("filme-", ""));

    const filme = filmes.find((f) => f.id === idFilme);

    if (filme) {
      let listaFavoritos = carregarMinhaLista();

      const jaExiste = listaFavoritos.some((f) => f.id === filme.id);
      if (!jaExiste) {
        listaFavoritos.push(filme);
        salvarMinhaLista(listaFavoritos);
        renderizarMinhaLista();
      } else {
        alert("Esse filme já está na sua lista! 😉");
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  listaAtual = [...filmes];
  renderizarFilmes(listaAtual);
  configurarFiltrosGenero();
  configurarOrdenacao();
  renderizarMinhaLista();
});
