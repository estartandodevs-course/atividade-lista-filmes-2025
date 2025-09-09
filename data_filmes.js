const filmes = [
  {
    id: 1,
    titulo: "O Poderoso Chefão",
    ano: 1972,
    generos: ["Crime", "Drama"],
    nota: 9.2,
    posterUrl: "/imagens/poderosoChefao.jpg",
    sinopse:
      "O patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.",
  },
  {
    id: 2,
    titulo: "O Senhor dos Anéis: O Retorno do Rei",
    ano: 2003,
    generos: ["Aventura", "Fantasia", "Ação"],
    nota: 9.0,
    posterUrl: "/imagens/senhorDosAneis.jpg",
    sinopse:
      "Gandalf e Aragorn lideram o Mundo dos Homens contra o exército de Sauron para desviar o olhar de Frodo e Sam, que se aproximam do Monte da Perdição com o Um Anel.",
  },
  {
    id: 3,
    titulo: "Pulp Fiction: Tempo de Violência",
    ano: 1994,
    generos: ["Crime", "Drama"],
    nota: 8.9,
    posterUrl: "/imagens/pulpFiction.jpg",
    sinopse:
      "As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e um casal de assaltantes se entrelaçam em quatro contos de violência e redenção.",
  },
  {
    id: 4,
    titulo: "A Origem",
    ano: 2010,
    generos: ["Ação", "Aventura", "Ficção Científica"],
    nota: 8.8,
    posterUrl: "/imagens/Aorigem.jpg",
    sinopse:
      "Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um CEO.",
  },
  {
    id: 5,
    titulo: "Matrix",
    ano: 1999,
    generos: ["Ação", "Ficção Científica"],
    nota: 8.7,
    posterUrl: "/imagens/matrix.jpg",
    sinopse:
      "Um hacker descobre pela misteriosa rebelião a verdadeira natureza de sua realidade e seu papel na guerra contra seus controladores.",
  },
  {
    id: 6,
    titulo: "A Viagem de Chihiro",
    ano: 2001,
    generos: ["Animação", "Aventura", "Família"],
    nota: 8.6,
    posterUrl: "/imagens/viagem-de-chihiro.jpg",
    sinopse:
      "Uma menina de 10 anos vagueia por um mundo governado por deuses, bruxas e espíritos, e onde os humanos são transformados em bestas.",
  },
  {
    id: 7,
    titulo: "Parasita",
    ano: 2019,
    generos: ["Suspense", "Comédia", "Drama"],
    nota: 8.5,
    posterUrl: "/imagens/parasita.jpg",
    sinopse:
      "A ganância e a discriminação de classe ameaçam o relacionamento simbiótico recém-formado entre a rica família Park e o pobre clã Kim.",
  },
  {
    id: 8,
    titulo: "Interestelar",
    ano: 2014,
    generos: ["Aventura", "Drama", "Ficção Científica"],
    nota: 8.7,
    posterUrl: "/imagens/interestelar.jpg",
    sinopse:
      "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.",
  },
  {
    id: 9,
    titulo: "O Rei Leão",
    ano: 1994,
    generos: ["Animação", "Musical", "Drama", "Família"],
    nota: 8.5,
    posterUrl: "/imagens/reiLeao.jpeg",
    sinopse:
      "O filhote de leão e futuro rei Simba procura por sua identidade. Sua busca é dificultada por seu tio malvado, que adoraria governar a savana.",
  },
  {
    id: 10,
    titulo: "Forrest Gump: O Contador de Histórias",
    ano: 1994,
    generos: ["Drama", "Romance"],
    nota: 8.8,
    posterUrl: "/imagens/forrest-gump-o-contador-de-historias.jpg",
    sinopse:
      "As presidências de Kennedy e Johnson, o escândalo de Watergate e outros eventos históricos se desenrolam pelos olhos de um homem do Alabama com um QI de 75.",
  },
  {
    id: 11,
    titulo: "Cidade de Deus",
    ano: 2002,
    generos: ["Crime", "Drama"],
    nota: 8.6,
    posterUrl: "/imagens/cidadeDeDeus.jpeg",
    sinopse:
      "Nas favelas do Rio de Janeiro, dois meninos que crescem no mesmo ambiente seguem caminhos muito diferentes: um se torna fotógrafo e o outro, traficante.",
  },
  {
    id: 12,
    titulo: "O Silêncio dos Inocentes",
    ano: 1991,
    generos: ["Suspense", "Crime", "Drama"],
    nota: 8.6,
    posterUrl: "/imagens/silencioDosInocentes.jpg",
    sinopse:
      "Uma jovem cadete do FBI deve obter a ajuda de um assassino canibal manipulador e preso para ajudar a capturar outro assassino em série, um louco que esfola suas vítimas.",
  },
  {
    id: 13,
    titulo: "Clube da Luta",
    ano: 1999,
    generos: ["Drama"],
    nota: 8.8,
    posterUrl: "/imagens/clubeDaLuta.jpg",
    sinopse:
      "Um trabalhador de escritório insone e um vendedor de sabonetes despreocupado criam um clube de luta clandestino que se transforma em algo muito, muito maior.",
  },
  {
    id: 14,
    titulo: "Gladiador",
    ano: 2000,
    generos: ["Ação", "Aventura", "Drama"],
    nota: 8.5,
    posterUrl: "/imagens/gladiador.jpg",
    sinopse:
      "Um ex-general romano busca vingança contra o imperador corrupto que assassinou sua família e o mandou para a escravidão.",
  },
  {
    id: 15,
    titulo: "Mad Max: Estrada da Fúria",
    ano: 2015,
    generos: ["Ação", "Aventura", "Ficção Científica"],
    nota: 8.1,
    posterUrl: "/imagens/madMax.jpg",
    sinopse:
      "Em um deserto pós-apocalíptico, uma mulher se rebela contra um governante tirânico em busca de sua terra natal com a ajuda de um grupo de prisioneiras e um andarilho chamado Max.",
  },
  {
    id: 16,
    titulo: "Homem-Aranha no Aranhaverso",
    ano: 2018,
    generos: ["Animação", "Ação", "Aventura", "Família"],
    nota: 8.4,
    posterUrl: "/imagens/homemAranhaAranhaverso.jpg",
    sinopse:
      "O adolescente Miles Morales se torna o Homem-Aranha de sua realidade, cruzando seu caminho com cinco contrapartes de outras dimensões para parar uma ameaça para todas as realidades.",
  },
  {
    id: 17,
    titulo: "Corra!",
    ano: 2017,
    generos: ["Terror", "Mistério", "Suspense"],
    nota: 7.8,
    posterUrl: "/imagens/corra.jpeg",
    sinopse:
      "Um jovem afro-americano visita a família de sua namorada branca em uma propriedade rural, mas logo percebe que a família tem um segredo sombrio.",
  },
  {
    id: 18,
    titulo: "Jurassic Park: O Parque dos Dinossauros",
    ano: 1993,
    generos: ["Aventura", "Ficção Científica", "Ação"],
    nota: 8.2,
    posterUrl: "/imagens/jurassicPark.jpg",
    sinopse:
      "Uma visita a um parque temático sofre uma falha de energia, permitindo que seus clones de dinossauros escapem e aterrorizem os visitantes.",
  },
  {
    id: 19,
    titulo: "Whiplash: Em Busca da Perfeição",
    ano: 2014,
    generos: ["Drama", "Música"],
    nota: 8.5,
    posterUrl: "/imagens/whiplash.jpg",
    sinopse:
      "Um jovem e promissor baterista se matricula em um conservatório de música de prestígio, onde seus sonhos de grandeza são orientados por um instrutor implacável.",
  },
  {
    id: 20,
    titulo: "O Fabuloso Destino de Amélie Poulain",
    ano: 2001,
    generos: ["Comédia", "Romance"],
    nota: 8.3,
    posterUrl: "/imagens/ameliapoulain.jpg",
    sinopse:
      "Amélie é uma garçonete inocente e ingênua em Paris com seu próprio senso de justiça. Ela decide ajudar as pessoas ao seu redor e, ao longo do caminho, descobre o amor.",
  },
];

export default filmes;
