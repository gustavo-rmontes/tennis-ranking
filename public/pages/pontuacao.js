document.addEventListener("DOMContentLoaded", function () {
    // 🔹 URL da API hospedada no Render
    const jogadoresAPI = "https://tenis-api-v1.onrender.com/";

    // Mapeamento das classes para pontuações
    const pontuacoes = {
        "A": 1600,
        "B": 1200,
        "C": 800,
        "D": 400,
        "E": 200,
        "Iniciante": 0
    };

    // Função para buscar os jogadores na API
    async function gerarRanking() {
        try {
            const response = await fetch(jogadoresAPI);
            if (!response.ok) throw new Error("Erro ao buscar dados da API");

            const jogadores = await response.json();

            // Processa os jogadores e atribui a pontuação correta
            let ranking = jogadores.map(jogador => ({
                nome: jogador.nome,
                pontuacao: pontuacoes[jogador.classificacao] || 0
            }));

            // Ordena do maior para o menor
            ranking.sort((a, b) => b.pontuacao - a.pontuacao);

            // Exibe a tabela de ranking
            exibirRanking(ranking);
        } catch (error) {
            console.error("Erro ao buscar jogadores:", error);
            document.getElementById("ranking-container").innerHTML = "<p>Erro ao carregar ranking.</p>";
        }
    }

    // Função para exibir a tabela no HTML
    function exibirRanking(ranking) {
        const tabela = document.createElement("table");
        tabela.innerHTML = `
            <tr>
                <th>Posição</th>
                <th>Nome</th>
                <th>Pontuação</th>
            </tr>
        `;

        ranking.forEach((jogador, index) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${index + 1}º</td>
                <td>${jogador.nome}</td>
                <td>${jogador.pontuacao} pts</td>
            `;
            tabela.appendChild(linha);
        });

        // Adiciona a tabela ao container
        const container = document.getElementById("ranking-container");
        container.innerHTML = ""; // Limpa antes de adicionar
        container.appendChild(tabela);
    }

    // Chama a função para gerar o ranking ao carregar a página
    gerarRanking();
});