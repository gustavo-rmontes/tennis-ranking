document.addEventListener("DOMContentLoaded", function () {
    const jogadoresAPI = "https://tenis-api-v1.onrender.com/";
    const classes = ["A", "B", "C", "D", "E", "Iniciante"];
    const rodadas = ["B", "C", "D"];

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
                for (let i = 0; i < rodadas.length; i++) {
                    const adversario = rodadas[i];
                    html += `<h3>Rodada ${i + 1}: Classe ${classe} vs Classe ${adversario}</h3>`;
                    html += `<p>Equipe 1 - Classe ${classe}: ${jogadoresClasse.slice(0, 5).map(j => j.nome).join(", ")}</p>`;
                    html += `<p>Equipe 2 - Classe ${adversario}: ${jogadoresClasse.slice(5, 10).map(j => j.nome).join(", ")}</p>`;
                    
                    html += `<label>Data do jogo:</label> <input type="date" id="data_${classe}_${i}"><br>`;
                    
                    html += `<label>Dupla 1:</label> <input type="text" id="dupla1_${classe}_${i}" placeholder="Jogador1 + Jogador2 vs Jogador6 + Jogador7"><br>`;
                    html += `<label>Dupla 2:</label> <input type="text" id="dupla2_${classe}_${i}" placeholder="Jogador3 + Jogador4 vs Jogador8 + Jogador9"><br>`;
                    html += `<label>Simples:</label> <input type="text" id="simples_${classe}_${i}" placeholder="Jogador5 vs Jogador10"><br>`;
                    html += `<label>Resultado:</label> <input type="text" id="resultado_${classe}_${i}" placeholder="2x0 ou 2x1"><br>`;
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