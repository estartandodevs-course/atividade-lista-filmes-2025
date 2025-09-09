import { filmes } from "./data_filmes.js";

document.addEventListener("DOMContentLoaded", () => {
  // Chamada de função
  renderizarFilmes(filmes);
  extrairTodosOsGenerosUnicos(filmes);
  ordenarPorNota();
  ordenarPorAno();
  renderizarMinhaLista();
  atualizarEstatisticas();

  // Renderiza a Lista de Filmes
  function renderizarFilmes(listaParaRenderizar) {
    const listaFilmesElement = document.getElementById("lista-filmes");
    listaFilmesElement.innerHTML = "";

    const minhaLista = carregarMinhaLista();
    const idsNaMinhaLista = minhaLista.map(filme => filme.id);

    const card = listaParaRenderizar
      .map((filme) => {
        const estaNaMinhaLista = idsNaMinhaLista.includes(filme.id);
        const textoBotao = estaNaMinhaLista ? "Adicionado ✓" : "Adicionar à Minha Lista";
        const classeBotao = estaNaMinhaLista ? "btn-adicionar adicionado" : "btn-adicionar";
        
        const cardHTML = `
    <div class="card-filme" id="filme-${filme.id}" data-id="${filme.id}">
        <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
        <h2>${filme.titulo} (${filme.ano})</h2>
        <p>Nota: ${filme.nota}</p>
        <button class="${classeBotao}">${textoBotao}</button>
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
      const listaPorNota = copiaLista.sort((a, b) => b.nota - a.nota); // Ordem decrescente
      renderizarFilmes(listaPorNota);
    });
  }

  //Implementa ordenar lista por ano
  function ordenarPorAno() {
    const botaoPorAno = document.getElementById("ordenar-ano");
    botaoPorAno.addEventListener("click", () => {
      const copiaLista = [...filmes];
      const listaPorAno = copiaLista.sort((a, b) => b.ano - a.ano); // Ordem decrescente
      renderizarFilmes(listaPorAno);
    });
  }

  //Gerenciar "minha lista"
  function salvarMinhaLista(lista) {
    localStorage.setItem("minhaLista", JSON.stringify(lista));
    atualizarEstatisticas();
  }

  function carregarMinhaLista() {
    const lista = localStorage.getItem("minhaLista");
    return lista ? JSON.parse(lista) : [];
  }

  function renderizarMinhaLista() {
    const lista = carregarMinhaLista();
    const secao = document.getElementById("minha-lista");
    secao.innerHTML = "";

    if (lista.length === 0) {
      return;
    }

    const cardsHTML = lista
      .map(
        (filme) => `
        <div class="card-filme" id="minha-lista-filme-${filme.id}" data-id="${filme.id}">
            <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
            <div class="card-content">
                <h2>${filme.titulo} (${filme.ano})</h2>
                <p>Nota: ${filme.nota}</p>
                <button class="btn-remover">Remover da Minha Lista</button>
            </div>
        </div>
    `
      )
      .join("");

    secao.innerHTML = cardsHTML;
  }

  // Função para atualizar estatísticas da lista
  function atualizarEstatisticas() {
    const minhaLista = carregarMinhaLista();
    
    // Verifica se o container de estatísticas já existe, se não, cria
    let estatisticasContainer = document.getElementById("estatisticas-lista");
    if (!estatisticasContainer) {
      estatisticasContainer = document.createElement("div");
      estatisticasContainer.id = "estatisticas-lista";
      const minhaListaSection = document.getElementById("minha-lista");
      minhaListaSection.parentNode.insertBefore(estatisticasContainer, minhaListaSection);
    }
    
    if (minhaLista.length === 0) {
      estatisticasContainer.innerHTML = "";
      return;
    }
    
    // Calcular nota média usando reduce
    const notaMedia = minhaLista.reduce((acc, filme) => acc + filme.nota, 0) / minhaLista.length;
    
    estatisticasContainer.innerHTML = `
      <div class="estatisticas">
        <p>Filmes na lista: ${minhaLista.length}</p>
        <p>Nota média: ${notaMedia.toFixed(1)}</p>
      </div>
    `;
  }

  // Criar modal para detalhes do filme
  function criarModal() {
    const modal = document.createElement("div");
    modal.id = "modal-detalhes";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-conteudo">
        <span class="fechar-modal">&times;</span>
        <h2 id="modal-titulo"></h2>
        <p id="modal-sinopse"></p>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Fechar modal ao clicar no X
    modal.querySelector(".fechar-modal").addEventListener("click", () => {
      modal.style.display = "none";
    });
    
    // Fechar modal ao clicar fora do conteúdo
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
    
    return modal;
  }

  // Inicializar modal
  const modal = criarModal();

  // Mostrar detalhes do filme no modal
  function mostrarDetalhesFilme(id) {
    const filme = filmes.find(f => f.id === id);
    if (filme) {
      document.getElementById("modal-titulo").textContent = `${filme.titulo} (${filme.ano})`;
      document.getElementById("modal-sinopse").textContent = `${filme.sinopse}`;
      modal.style.display = "block";
    }
  }

  // Adicionar/Remover da Minha Lista
  const main = document.querySelector("main");
  main.addEventListener("click", (event) => {

    if (event.target.classList.contains("btn-adicionar")) {
      const card = event.target.closest(".card-filme");

      if (!card) return;

      const idFilme = parseInt(card.dataset.id);
      const filmeSelecionado = filmes.find((filme) => filme.id === idFilme);

      if (!filmeSelecionado) return;

      const listaAtual = carregarMinhaLista();
      const jaExiste = listaAtual.some((filme) => filme.id === idFilme);

      if (!jaExiste) {
        listaAtual.push(filmeSelecionado);
        salvarMinhaLista(listaAtual);
        renderizarMinhaLista();
        renderizarFilmes(filmes); // Atualiza os botões na lista principal
      }
    }
    
    // Remover da Minha Lista
    if (event.target.classList.contains("btn-remover")) {
      const card = event.target.closest(".card-filme");
      if (!card) return;

      const idFilme = parseInt(card.dataset.id);
      const listaAtual = carregarMinhaLista();
      const novaLista = listaAtual.filter((filme) => filme.id !== idFilme);
      
      salvarMinhaLista(novaLista);
      renderizarMinhaLista();
      renderizarFilmes(filmes); // Atualiza os botões na lista principal
    }
    
    // Mostrar detalhes do filme ao clicar no card (exceto nos botões)
    if (event.target.closest(".card-filme") && 
        !event.target.classList.contains("btn-adicionar") && 
        !event.target.classList.contains("btn-remover")) {
      const card = event.target.closest(".card-filme");
      const idFilme = parseInt(card.dataset.id);
      mostrarDetalhesFilme(idFilme);
    }
  });
});