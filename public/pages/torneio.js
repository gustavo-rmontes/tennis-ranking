document.addEventListener("DOMContentLoaded", function () {
    const jogadoresAPI = "https://tenis-api-v1.onrender.com/";
    const classes = ["A", "B", "C", "D", "E", "Iniciante"];
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
                if (jogadoresClasse.length < 2) return;

                let html = `<h2>Classe ${classe}</h2>`;
                let equipes = [];
                let numJogadores = jogadoresClasse.length;

                if (numJogadores <= 4) {
                    for (let i = 0; i < numJogadores; i++) {
                        equipes.push([jogadoresClasse[i]]);
                        html += `<p>Equipe ${i + 1} - Classe ${classe}: ${jogadoresClasse[i].nome}</p>`;
                    }
                } else {
                    let numEquipes = Math.ceil(numJogadores / jogadoresPorEquipe);
                    while (numJogadores % numEquipes > 2) {
                        numEquipes++;
                    }
                    
                    let equipeAtual = [];
                    for (let i = 0; i < numJogadores; i++) {
                        equipeAtual.push(jogadoresClasse[i]);
                        if (equipeAtual.length === Math.ceil(numJogadores / numEquipes) || i === numJogadores - 1) {
                            equipes.push(equipeAtual);
                            html += `<p>Equipe ${equipes.length} - Classe ${classe}: ${equipeAtual.map(j => j.nome).join(", ")}</p>`;
                            equipeAtual = [];
                        }
                    }
                }
                
                for (let rodada = 1; rodada <= rodadas; rodada++) {
                    html += `<h3>Rodada ${rodada}</h3>`;
                    for (let i = 0; i < equipes.length; i++) {
                        for (let j = i + 1; j < equipes.length; j++) {
                            html += `<h4>Equipe ${i + 1} vs Equipe ${j + 1}</h4>`;
                            html += `<label>Data do jogo:</label> <input type="date" id="data_${classe}_${rodada}_${i}_${j}"><br>`;
                            
                            if (numJogadores >= 10) {
                                html += `<label>Dupla 1:</label> <select id="dupla1_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[i])}</select> + <select id="dupla1_b_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[i])}</select>`;
                                html += ` vs <select id="dupla2_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[j])}</select> + <select id="dupla2_b_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[j])}</select>`;
                                html += `<input type="text" id="resultado_dupla1_${classe}_${rodada}_${i}_${j}" placeholder="2x0 ou 2x1">`;
                                html += `<button onclick="confirmarResultado('dupla1_${classe}_${rodada}_${i}_${j}')">Confirmar</button><br>`;
                            }
                            
                            html += `<label>Simples:</label> <select id="simples1_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[i])}</select> vs <select id="simples2_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[j])}</select>`;
                            html += `<input type="text" id="resultado_simples_${classe}_${rodada}_${i}_${j}" placeholder="2x0 ou 2x1">`;
                            html += `<button onclick="confirmarResultado('simples_${classe}_${rodada}_${i}_${j}')">Confirmar</button><br>`;
                        }
                    }
                }
                container.innerHTML += html;
            });
        } catch (error) {
            console.error("Erro ao carregar jogadores:", error);
        }
    }

    function gerarOpcoesJogadores(equipe) {
        return equipe.map(jogador => `<option value="${jogador.nome}">${jogador.nome}</option>`).join("");
    }

    carregarEquipes();
});

function confirmarResultado(id) {
    const resultado = document.getElementById(`resultado_${id}`).value;
    if (resultado) {
        alert(`Resultado confirmado: ${resultado}`);
    } else {
        alert("Preencha o resultado antes de confirmar!");
    }
}