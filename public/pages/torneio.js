document.addEventListener("DOMContentLoaded", function () {
    const jogadoresAPI = "https://tenis-api-v1.onrender.com/";
    let classes = [];
    const jogadoresPorEquipe = 5;
    const rodadas = 3;

    async function carregarEquipes() {
        try {
            const response = await fetch(jogadoresAPI);
            const jogadores = await response.json();
            classes = [...new Set(jogadores.map(j => j.classificacao))].sort(); // Atualiza classes dinamicamente e ordena
            const container = document.getElementById("torneio-container");
            container.innerHTML = "";

            classes.forEach(classe => {
                const jogadoresClasse = jogadores.filter(j => j.classificacao === classe);
                if (jogadoresClasse.length < 2) return;

                let html = `<h2 class='classe-header'>Classe ${classe}</h2>`;
                let equipes = distribuirEquipes(jogadoresClasse);
                
                equipes.forEach((equipe, index) => {
                    html += `<p class='equipe-info'>Equipe ${index + 1} - Classe ${classe}: ${equipe.map(j => j.nome).join(", ")}</p>`;
                });
                
                for (let rodada = 1; rodada <= rodadas; rodada++) {
                    html += `<h3 class='rodada-header'>Rodada ${rodada}</h3>`;
                    for (let i = 0; i < equipes.length; i++) {
                        for (let j = i + 1; j < equipes.length; j++) {
                            html += `<div class='partida-container'>`;
                            html += `<h4>Equipe ${i + 1} vs Equipe ${j + 1}</h4>`;
                            html += `<label>Data do jogo:</label> <input type="date" id="data_${classe}_${rodada}_${i}_${j}"><br>`;
                            
                            if (jogadoresClasse.length >= 10) {
                                html += gerarPartidaDuplas(`dupla1`, classe, rodada, i, j, equipes);
                                html += gerarPartidaDuplas(`dupla2`, classe, rodada, i, j, equipes);
                            }
                            
                            html += gerarPartidaSimples(classe, rodada, i, j, equipes);
                            html += `</div>`;
                        }
                    }
                }
                container.innerHTML += html;
            });
        } catch (error) {
            console.error("Erro ao carregar jogadores:", error);
        }
    }

    function distribuirEquipes(jogadoresClasse) {
        let numJogadores = jogadoresClasse.length;
        if (numJogadores <= 4) return jogadoresClasse.map(j => [j]);
        
        let numEquipes = Math.ceil(numJogadores / jogadoresPorEquipe);
        while (numJogadores % numEquipes > 2) {
            numEquipes++;
        }

        let equipes = [];
        let base = Math.floor(numJogadores / numEquipes);
        let extras = numJogadores % numEquipes;
        let startIndex = 0;

        for (let i = 0; i < numEquipes; i++) {
            let tamanho = base + (i < extras ? 1 : 0);
            equipes.push(jogadoresClasse.slice(startIndex, startIndex + tamanho));
            startIndex += tamanho;
        }
        return equipes;
    }

    function gerarPartidaDuplas(tipo, classe, rodada, i, j, equipes) {
        return `<label>${tipo.toUpperCase()}:</label> 
            <select id="${tipo}_1_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[i])}</select> + 
            <select id="${tipo}_2_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[i])}</select>
            vs 
            <select id="${tipo}_3_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[j])}</select> + 
            <select id="${tipo}_4_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[j])}</select>
            <input type="text" id="resultado_${tipo}_${classe}_${rodada}_${i}_${j}" placeholder="2x0 ou 2x1">
            <button onclick="confirmarResultado('${tipo}_${classe}_${rodada}_${i}_${j}')">Confirmar</button><br>`;
    }

    function gerarPartidaSimples(classe, rodada, i, j, equipes) {
        return `<label>Simples:</label> 
            <select id="simples1_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[i])}</select> vs 
            <select id="simples2_${classe}_${rodada}_${i}_${j}">${gerarOpcoesJogadores(equipes[j])}</select>
            <input type="text" id="resultado_simples_${classe}_${rodada}_${i}_${j}" placeholder="2x0 ou 2x1">
            <button onclick="confirmarResultado('simples_${classe}_${rodada}_${i}_${j}')">Confirmar</button><br>`;
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
