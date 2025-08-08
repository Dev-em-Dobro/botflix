// Event listeners básicos
document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');

    // Search button click
    searchBtn.addEventListener('click', buscarFilmes);
});

// Função principal - só faz o POST pro N8N
async function buscarFilmes() {
    const input = document.getElementById('searchInput');

    // Validação básica
    if (!input.value.trim()) {
        alert('Por favor, descreva o que você quer assistir!');
        return;
    }

    console.log('Enviando para N8N:', input.value.trim());

    // Fazer POST para o webhook do N8N
    const response = await fetch('https://botflix-1.app.n8n.cloud/webhook/botflix', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userPrompt: input.value.trim()
        })
    });

    console.log('Status da resposta:', response.status);

    const data = await response.json();
    console.log('Resposta do N8N:', data);

    if (data && data.results) {
        // Por enquanto só mostra no console
        // Pega o primeiro resultado
        const movie = data.results[0];

        // Monta a URL completa do poster
        const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        // Cria o HTML
        const movieHTML = `
            <div class="movie-card">
                <div>
                    <img src="${posterUrl}" alt="${movie.title}">
                </div>

                <h4>${movie.title}</h4>
                <p>⭐ ${movie.vote_average.toFixed(1)} / 10</p>
            </div>
        `;

        // Insere na div moviesGrid
        document.getElementById('results').classList.add('show');
        document.getElementById('moviesGrid').innerHTML = movieHTML;
    }
}