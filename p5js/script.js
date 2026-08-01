const filmes = [
  {
    nome: "A Viagem de Chihiro",
    idade: 0,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Paddington",
    idade: 0,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: false
  },
  {
    nome: "Toy Story",
    idade: 0,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: false
  },
  {
    nome: "Procurando Nemo",
    idade: 0,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: false
  },
  {
    nome: "Frozen",
    idade: 0,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Moana",
    idade: 0,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: false
  },
  {
    nome: "Divertida Mente",
    idade: 0,
    fantasia: true,
    aventura: false,
    drama: true,
    comedia: true,
    ficcao: false
  },
  {
    nome: "Encanto",
    idade: 0,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: false
  },
  {
    nome: "As Aventuras de Pi",
    idade: 10,
    fantasia: true,
    aventura: true,
    drama: true,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Depois da Chuva",
    idade: 10,
    fantasia: false,
    aventura: false,
    drama: true,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Wall-E",
    idade: 10,
    fantasia: false,
    aventura: true,
    drama: true,
    comedia: true,
    ficcao: true
  },
  {
    nome: "Operação Big Hero",
    idade: 10,
    fantasia: false,
    aventura: true,
    drama: true,
    comedia: true,
    ficcao: true
  },
  {
    nome: "Guardiões da Galáxia",
    idade: 12,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: true
  },
  {
    nome: "Homem-Aranha: No Aranhaverso",
    idade: 12,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: true
  },
  {
    nome: "Ladrões de Bicicleta",
    idade: 12,
    fantasia: false,
    aventura: false,
    drama: true,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Interestelar",
    idade: 12,
    fantasia: false,
    aventura: true,
    drama: true,
    comedia: false,
    ficcao: true
  },
  {
    nome: "Avatar",
    idade: 12,
    fantasia: true,
    aventura: true,
    drama: true,
    comedia: false,
    ficcao: true
  },
  {
    nome: "Jurassic World",
    idade: 12,
    fantasia: false,
    aventura: true,
    drama: false,
    comedia: false,
    ficcao: true
  },
  {
    nome: "Os Vingadores",
    idade: 12,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: true
  },
  {
    nome: "Pantera Negra",
    idade: 12,
    fantasia: true,
    aventura: true,
    drama: true,
    comedia: false,
    ficcao: true
  },
  {
    nome: "O Menino que Descobriu o Vento",
    idade: 14,
    fantasia: false,
    aventura: false,
    drama: true,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Batman: O Cavaleiro das Trevas",
    idade: 14,
    fantasia: true,
    aventura: true,
    drama: true,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Duna",
    idade: 14,
    fantasia: true,
    aventura: true,
    drama: true,
    comedia: false,
    ficcao: true
  },
  {
    nome: "O Senhor dos Anéis",
    idade: 14,
    fantasia: true,
    aventura: true,
    drama: true,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Harry Potter e a Pedra Filosofal",
    idade: 10,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Harry Potter e o Cálice de Fogo",
    idade: 12,
    fantasia: true,
    aventura: true,
    drama: true,
    comedia: false,
    ficcao: false
  },
  {
    nome: "Percy Jackson e o Ladrão de Raios",
    idade: 10,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: false
  },
  {
    nome: "Jumanji: Bem-Vindo à Selva",
    idade: 12,
    fantasia: true,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: false
  },
  {
    nome: "A Era do Gelo",
    idade: 0,
    fantasia: false,
    aventura: true,
    drama: false,
    comedia: true,
    ficcao: false
  },
  {
    nome: "Como Treinar o Seu Dragão",
    idade: 0,
    fantasia: true,
    aventura: true,
    drama: true,
    comedia: true,
    ficcao: false
  }
];

function recomendarFilmes() {
    const idadeUsuario = parseInt(document.getElementById('idade').value);
    const generosSelecionados = Array.from(document.querySelectorAll('.genre-checkboxes input[type="checkbox"]:checked'))
                                    .map(checkbox => checkbox.value);

    const filmesFiltrados = filmes.filter(filme => {
        // Filtra por idade
        if (idadeUsuario < filme.idade) {
            return false;
        }

        // Filtra por gênero, se algum gênero foi selecionado
        if (generosSelecionados.length > 0) {
            let matchGenero = false;
            for (const genero of generosSelecionados) {
                if (filme[genero]) {
                    matchGenero = true;
                    break;
                }
            }
            if (!matchGenero) {
                return false;
            }
        }

        return true;
    });

    exibirFilmes(filmesFiltrados);
}

function exibirFilmes(filmesParaExibir) {
    const filmesRecomendadosDiv = document.getElementById('filmesRecomendados');
    filmesRecomendadosDiv.innerHTML = ''; // Limpa resultados anteriores

    if (filmesParaExibir.length === 0) {
        filmesRecomendadosDiv.innerHTML = '<p class="no-results">Nenhum filme encontrado com os critérios selecionados. Tente ajustar sua idade ou gêneros.</p>';
        return;
    }

    filmesParaExibir.forEach(filme => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = filme.nome;

        const movieAge = document.createElement('p');
        movieAge.textContent = `Idade Mínima: ${filme.idade === 0 ? 'Livre' : filme.idade + ' anos'}`;

        const movieGenres = document.createElement('p');
        const generos = [];
        if (filme.fantasia) generos.push('Fantasia');
        if (filme.aventura) generos.push('Aventura');
        if (filme.drama) generos.push('Drama');
        if (filme.comedia) generos.push('Comédia');
        if (filme.ficcao) generos.push('Ficção Científica');
        movieGenres.textContent = `Gêneros: ${generos.join(', ')}`;

        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieAge);
        movieCard.appendChild(movieGenres);

        filmesRecomendadosDiv.appendChild(movieCard);
    });
}

// Event Listener para o botão de recomendação
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('recomendarBtn').addEventListener('click', recomendarFilmes);
    // Exibir todos os filmes inicialmente ou uma recomendação padrão
    exibirFilmes(filmes);
});
