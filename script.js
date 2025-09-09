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
        const generosHTML = `<button class="btn-genero">${genero}</button>`;
        return generosHTML;
      })
      .join("");

    botoesDeGeneros.innerHTML = renderizarGeneros;

    //Implementa Botão de Mostrar tudo.
    const botaoMostrarTodos = document.createElement("button");
    botaoMostrarTodos.textContent = "Mostrar Todos os Filmes";
    botaoMostrarTodos.id = "mostrar-todos";
    botaoMostrarTodos.className = "btn-genero";
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

  //Implementa ordenar lista por nota
  function ordenarPorNota() {
    const botaoPorNota = document.getElementById("ordenar-nota");
    botaoPorNota.addEventListener("click", () => {
      const copiaLista = [...filmes];
      const listaPorNota = copiaLista.sort((a, b) => a.nota - b.nota);
      renderizarFilmes(listaPorNota);
    });
  }

  //Implementa ordenar lista por ano
  function ordenarPorAno() {
    const botaoPorAno = document.getElementById("ordenar-ano");
    botaoPorAno.addEventListener("click", () => {
      const copiaLista = [...filmes];
      const listaPorAno = copiaLista.sort((a, b) => a.ano - b.ano);
      renderizarFilmes(listaPorAno);
    });
  }

  //Gerenciar "minha lista"
  function salvarMinhaLista(lista) {
    localStorage.setItem("minhaLista", JSON.stringify(lista));
  }

  function carregarMinhaLista() {
    const lista = localStorage.getItem("minhaLista");
    return lista ? JSON.parse(lista) : [];
  }

  function renderizarMinhaLista() {
    const lista = carregarMinhaLista();
    const secao = document.getElementById("minha-lista");
    secao.innerHTML = " ";

    if (lista.length === 0) {
      secao.innerHTML = "<p class='empty-message'>Sua lista está vazia</p>";
      return;
    }

    const cardsHTML = lista
      .map(
        (filme) => `
        <div class="card-filme" id="filme-${filme.id}">
            <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
            <div class="card-content">
                <h2>${filme.titulo} (${filme.ano})</h2>
                <p>Nota: ${filme.nota}</p>
                <button class="btn-adicionar">Remover da Minha Lista</button>
            </div>
        </div>
    `
      )
      .join("");

    secao.innerHTML = cardsHTML;
  }

  const main = document.querySelector("main");

  main.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-adicionar")) {
      const card = event.target.closest(".card-filme");

      if (!card) return;

      const idFilme = parseInt(card.id.replace("filme-", ""));
      const filmeSelecionado = filmes.find((filme) => filme.id === idFilme);

      if (!filmeSelecionado) return;

      const listaAtual = carregarMinhaLista();
      const jaExiste = listaAtual.some((filme) => filme.id === idFilme);

      if (!jaExiste) {
        listaAtual.push(filmeSelecionado);
        salvarMinhaLista(listaAtual);
        renderizarMinhaLista();
      }
    }
  });
});
