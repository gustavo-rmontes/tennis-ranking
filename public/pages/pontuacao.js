document.addEventListener("DOMContentLoaded", function () {
    // URL da página "listing" onde os jogadores estão listados
    const jogadoresURL = "https://gustavo-rmontes.github.io/tennis-ranking/public/pages/listing.html";

    // Mapeamento das classes para pontuações
    const pontuacoes = {
        "A": 1600,
        "B": 1200,
        "C": 800,
        "D": 400,
        "E": 200,
        "Iniciante": 0
    };

    // Função para buscar jogadores e gerar o ranking
    async function gerarRanking() {
        try {
            // Faz a requisição da página "listing"
            const response = await fetch(jogadoresURL);
            const html = await response.text();

            // Cria um elemento temporário para manipular o HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Seleciona os jogadores na página "listing"
            const listaJogadores = Array.from(doc.querySelectorAll("li, p, div"));

            // Processa os jogadores extraindo nome e classe
            let ranking = listaJogadores.map(jogador => {
                const texto = jogador.textContent.trim();
                const regex = /(.*) - Classe ([A-E]|Iniciante)/;
                const match = texto.match(regex);

                if (match) {
                    const nome = match[1].trim();
                    const classe = match[2].trim();
                    const pontuacao = pontuacoes[classe] || 0;

                    return { nome, pontuacao };
                }
                return null;
            }).filter(jogador => jogador !== null);

            // Ordena do maior para o menor
            ranking.sort((a, b) => b.pontuacao - a.pontuacao);

            // Exibe a tabela de ranking
            exibirRanking(ranking);
        } catch (error) {
            console.error("Erro ao buscar jogadores:", error);
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

        // Adiciona a tabela à página
        const container = document.getElementById("ranking-container");
        if (container) {
            container.innerHTML = ""; // Limpa antes de adicionar
            container.appendChild(tabela);
        }
    }

    // Executa a função ao carregar a página
    gerarRanking();
});