// Passo 1: Renderizar a Lista Inicial de Filmes

function renderizarFilmes(listarParaRenderizar)
{
    const listarFilmes = document.getElementById("lista-filmes") 
    listarFilmes.innerHTML = "";

    const cards = listarParaRenderizar.map(filme => {
        const cardHTML = `
        <div class="card-filme" id="filme-${filme.id}">
            <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
            <h2>${filme.titulo} (${filme.ano})</h2>
            <p>Nota: ${filme.nota}</p>
            <button class="btn-adicionar">Adicionar à Minha Lista</button>
        </div>`;
        return cardHTML;
    
    });
    listarFilmes.innerHTML = cards.join("");
}

// Passo 2: Implementar a Busca por Título

function buscarPorTítulo(event)
{
    const textoBusca = event.target.value.toLowerCase().trim();
    const filmesFiltrados = filmes.filter(filme => filme.titulo.toLowerCase().includes(textoBusca));
    renderizarFilmes(filmesFiltrados);
}

// Passo 3: Implementar Filtros de Gênero Dinâmicos

function gerarFiltrosGeneros()
{
    // const generosUnicos = new Set();
    // filmes.forEach(filme => {
    //     filme.generos.forEach(genero => generosUnicos.add(genero));
    // });
    const generosUnicos = [...new Set(filmes.flatMap(filme => filme.generos))].sort();

    const divBotoes = document.getElementById("botoes-genero");
    
    const buttonTodos = document.createElement("button");
    buttonTodos.textContent = "Todos";
    divBotoes.appendChild(buttonTodos);

    generosUnicos.forEach(genero => {
        const button = document.createElement("button");
        button.textContent = genero;
       divBotoes.appendChild(button);
    });

    divBotoes.addEventListener("click", (event) => {
        if(event.target.tagName === "BUTTON")
        {
            const generoSelecionado = event.target.textContent;
            const filmesFiltrados = generoSelecionado === "Todos" ?
            filmes : filmes.filter(filme => filme.generos.includes(generoSelecionado));
            renderizarFilmes(filmesFiltrados);
        }
    });
}

// Passo 4: Implementar Ordenação

let listarParaRenderizar = [...filmes];

function ordenarPorAno_E_Nota()
{
    const botaoOrdenarAno = document.getElementById("ordenar-ano");
    botaoOrdenarAno.addEventListener("click", () => {
        const filmesOrdenados = listarParaRenderizar.slice().sort((a, b) =>  b.ano - a.ano);
        renderizarFilmes(filmesOrdenados);
    }); 

    const botaoNota = document.getElementById("ordenar-nota");
    botaoNota.addEventListener("click", () => {
        const filmesOrdenados = listarParaRenderizar.slice().sort((a, b) => b.nota - a.nota);
        renderizarFilmes(filmesOrdenados);
    });
}

// Passo 5: Gerenciar a "Minha Lista" com localStorage

function salvarNaMinhaLista(lista)
{
    localStorage.setItem("minhaLista", JSON.stringify(lista));
}


function carregarMinhaLista()
{
    const minhaLista = localStorage.getItem("minhaLista");
    return JSON.parse(minhaLista) || [];
}

function adicionarFilmeEvento()
{
    const listarFilmes = document.getElementById("lista-filmes");

    listarFilmes.addEventListener("click", (event) => {
        if(event.target.classList.contains("btn-adicionar"))
        {
            const minhaLista = carregarMinhaLista();
            const cardFilme = event.target.closest(".card-filme");
            const filmeId = cardFilme.id.split("-")[1];
            const filmeParaAdicionar = filmes.find(filme => filme.id === parseInt(filmeId));
            if(filmeParaAdicionar && !minhaLista.some(filme => filme.id === filmeParaAdicionar.id))
            {
                minhaLista.push(filmeParaAdicionar);
                salvarNaMinhaLista(minhaLista);
                renderizarMinhaLista();
            }
        }
    });

}

function renderizarMinhaLista()
{
    const minhaLista = carregarMinhaLista();
    const listarMinhaLista = document.getElementById("minha-lista");
    listarMinhaLista.innerHTML = "";
    const cards = minhaLista.map(filme => {
        const cardHTML = `
        <div class="card-filme" id="minha-lista-filme-${filme.id}">
            <img src="${filme.posterUrl}" alt="Pôster de ${filme.titulo}">
            <h2>${filme.titulo} (${filme.ano})</h2>
            <p>Nota: ${filme.nota}</p>
            <button class="btn-remover">Remover da Minha Lista</button>
        </div>`;
        return cardHTML;
    });
    listarMinhaLista.innerHTML = cards.join("");    

    calcularEstatisticas()

}



// Extras

// Passo 6: Remover da Lista:

function removerDaMinhaLista(filmeId)
{
    let minhaLista = carregarMinhaLista();
    minhaLista = minhaLista.filter(filme => filme.id !== filmeId);
    salvarNaMinhaLista(minhaLista);
}


function adicionarEventoRemover()
{
    const listarFilmes = document.getElementById("minha-lista");

    listarFilmes.addEventListener("click", (event) => {
        const minhaLista = carregarMinhaLista();
        if(event.target.classList.contains("btn-remover"))
        {
            const cardFilme = event.target.closest(".card-filme");
            // const filmeId = cardFilme.id.split("-")[3];
            const filmeId = parseInt(cardFilme.id.replace("minha-lista-filme-", ""));

            removerDaMinhaLista(filmeId);
            renderizarMinhaLista();
        }
    });

}



// Passo 7:  Feedback Visual:  --- REFAZER

function adicionarFeedbackVisual()
{
    const listarFilmes = document.getElementById("lista-filmes");
    listarFilmes.addEventListener("click", (event) => {
        if(event.target.classList.contains("btn-adicionar"))
        {    
            const cardFilme = event.target.closest(".card-filme");
            const filmeId = parseInt(cardFilme.id.replace("filme-", ""));
            const minhaLista = carregarMinhaLista();
            
            if(minhaLista.some(filme => filme.id === filmeId)){
                event.target.textContent = "Adicionado ✓";
                event.target.disabled = true;
                event.target.style.backgroundColor = "#4CAF50"; 
                event.target.style.color = "#fff";
            }
            
        }
    });
}

//Passo 8: Modal de Detalhes:

function modalDeDetalhes()
{
    const containerFilme = document.getElementById("lista-filmes");

    containerFilme.addEventListener("click", (event) => {

        if(event.target.classList.contains("btn-adicionar")) return;

        const card = event.target.closest(".card-filme");
        if(!card) return;

            // const filmeId = card.id.split("-")[1];
            const filmeId = parseInt(card.id.replace("filme-", ""));
            const filmeDetalhes = filmes.find(filme => filme.id === parseInt(filmeId));
            
            if(filmeDetalhes)
            {
                const detalhesDiv = document.createElement("div");
                detalhesDiv.classList.add("modal");
                detalhesDiv.innerHTML = `
                <div class="modal-conteudo">
                    <span class="fechar">&times;</span>
                    <h2>${filmeDetalhes.titulo}</h2>
                    <p>Ano: ${filmeDetalhes.ano}</p>
                    <p>Nota: ${filmeDetalhes.nota}</p>
                    <p>Gêneros: ${filmeDetalhes.generos.join(", ")}</p>
                    <p>Sinopse: ${filmeDetalhes.sinopse}</p>
                </div>`;
                document.body.appendChild(detalhesDiv);
                
                const spanFechar = detalhesDiv.querySelector(".fechar");
                spanFechar.addEventListener("click", () => {
                    document.body.removeChild(detalhesDiv);
                });

                detalhesDiv.addEventListener("click", (e) => {
                    if(e.target === detalhesDiv) {
                        document.body.removeChild(detalhesDiv);
                    }
                }); 
            }
    });
    
}


// Passo 9: Estatísticas da Lista:


function calcularEstatisticas()
{
    const minhaLista = carregarMinhaLista();
    const totalFilmes = minhaLista.length;
    const notaMedia = totalFilmes === 0 ? 0 : (minhaLista.reduce((acc, filme) => acc + filme.nota, 0) / totalFilmes).toFixed(2);

    const estatisticasDiv = document.getElementById("estatisticas");
    estatisticasDiv.innerHTML = `
        <p>Total de Filmes: ${totalFilmes}</p>
        <p>Nota Média: ${notaMedia}</p>
    `;

}


document.addEventListener("DOMContentLoaded", () =>{
        
    renderizarFilmes(filmes);

   const inputBusca = document.getElementById("input-busca");
   inputBusca.addEventListener("input", buscarPorTítulo);

    gerarFiltrosGeneros();

    ordenarPorAno_E_Nota();
    
    adicionarFilmeEvento();

    renderizarMinhaLista();

    adicionarEventoRemover();

    adicionarFeedbackVisual();

    modalDeDetalhes();

    // calcularEstatisticas();

});
