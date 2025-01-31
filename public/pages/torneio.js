document.addEventListener("DOMContentLoaded", function () {
    const jogadoresAPI = "https://tenis-api-v1.onrender.com/";
    const classes = ["A", "B", "C", "D", "E", "Iniciante"];
    const equipesPorClasse = 4;
    const jogadoresPorEquipe = 5;
    const rodadas = 3;

    async function carregarEquipes() {
        try {
            const response = await fetch(jogadoresAPI);
            const jogadores = await response.json();
            const container = document.getElementById("torneio-container");
            container.innerHTML = "";

            classes.forEach(classe => {
                const jogadoresClasse = jogadores.filter(j => j.classificacao === classe);
                if (jogadoresClasse.length < 10) return;

                let html = `<h2>Classe ${classe}</h2>`;
                let equipes = [];
                
                for (let i = 0; i < equipesPorClasse; i++) {
                    let inicio = i * jogadoresPorEquipe;
                    let fim = inicio + jogadoresPorEquipe;
                    if (fim > jogadoresClasse.length) break;
                    equipes.push(jogadoresClasse.slice(inicio, fim));
                    html += `<p>Equipe ${i + 1} - Classe ${classe}: ${equipes[i].map(j => j.nome).join(", ")}</p>`;
                }
                
                for (let rodada = 1; rodada <= rodadas; rodada++) {
                    html += `<h3>Rodada ${rodada}</h3>`;
                    for (let i = 0; i < equipes.length; i++) {
                        for (let j = i + 1; j < equipes.length; j++) {
                            html += `<h4>Equipe ${i + 1} vs Equipe ${j + 1}</h4>`;
                            html += `<label>Data do jogo:</label> <input type="date" id="data_${classe}_${rodada}_${i}_${j}"><br>`;
                            html += `<label>Dupla 1:</label> <input type="text" id="dupla1_${classe}_${rodada}_${i}_${j}" placeholder="Jogador1 + Jogador2 vs Jogador6 + Jogador7"><br>`;
                            html += `<label>Dupla 2:</label> <input type="text" id="dupla2_${classe}_${rodada}_${i}_${j}" placeholder="Jogador3 + Jogador4 vs Jogador8 + Jogador9"><br>`;
                            html += `<label>Simples:</label> <input type="text" id="simples_${classe}_${rodada}_${i}_${j}" placeholder="Jogador5 vs Jogador10"><br>`;
                            html += `<label>Resultado:</label> <input type="text" id="resultado_${classe}_${rodada}_${i}_${j}" placeholder="2x0 ou 2x1"><br>`;
                        }
                    }
                }
                container.innerHTML += html;
            });
        } catch (error) {
            console.error("Erro ao carregar jogadores:", error);
        }
    }

    carregarEquipes();
});

function registrarResultados() {
    alert("Resultados registrados!");
}
