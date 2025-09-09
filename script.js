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
