import { filmes } from "./data_filmes.js";

document.addEventListener("DOMContentLoaded", () => {
  // Chamada de função
  renderizarFilmes(filmes);
  extrairTodosOsGenerosUnicos(filmes);
  ordenarPorNota();
  ordenarPorAno();

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

    const todosOsGeneros = generoFilme.flatMap((genero) => genero.generos);
    const generosUnificados = [...new Set(todosOsGeneros)];
    const renderizarGeneros = generosUnificados
      .map((genero) => {
        const generosHTML = `<button>${genero}</button>`;
        return generosHTML;
      })
      .join("");

    botoesDeGeneros.innerHTML = renderizarGeneros;

    //Implementa Botão de Mostrar tudo.
    const botaoMostrarTodos = document.createElement("button");
    botaoMostrarTodos.textContent = "Mostrar Todos os Filmes";
    botaoMostrarTodos.id = "mostrar-todos";
    botaoMostrarTodos.style.display = "none";
    botoesDeGeneros.appendChild(botaoMostrarTodos);

    botaoMostrarTodos.addEventListener("click", () => {
      renderizarFilmes(filmes);
      botaoMostrarTodos.style.display = "none";
    });

    //Implementa filtro por gênero
    botoesDeGeneros.addEventListener("click", (event) => {
      if (
        event.target.tagName === "BUTTON" &&
        event.target.id !== "mostrar-todos"
      ) {
        const generoDoBotao = event.target.textContent;
        const filmeFiltradoPorGenero = generoFilme.filter((filme) =>
          filme.generos.includes(generoDoBotao)
        );
        renderizarFilmes(filmeFiltradoPorGenero);
        botaoMostrarTodos.style.display = "inline-block";
      }
    });
  }

  function ordenarPorNota() {
    const botaoPorNota = document.getElementById("ordenar-nota");
    botaoPorNota.addEventListener("click", () => {
      const copiaLista = [...filmes];
      const listaPorNota = copiaLista.sort((a, b) => a.nota - b.nota)
      renderizarFilmes(listaPorNota);
    })
  }

    function ordenarPorAno() {
    const botaoPorAno = document.getElementById("ordenar-ano");
    botaoPorAno.addEventListener("click", () => {
      const copiaLista = [...filmes];
      const listaPorAno = copiaLista.sort((a, b) => a.ano - b.ano)
      renderizarFilmes(listaPorAno);
    })
  }
});
