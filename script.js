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
