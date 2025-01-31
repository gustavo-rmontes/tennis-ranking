document.addEventListener("DOMContentLoaded", function () {
    const jogadoresAPI = "https://tenis-api-v1.onrender.com/";

    async function carregarEquipes() {
        try {
            const response = await fetch(jogadoresAPI);
            const jogadores = await response.json();
            const equipe = jogadores.slice(0, 5); // Pega os primeiros 5 jogadores
            document.getElementById("dupla1").textContent = equipe[0].nome + ", " + equipe[1].nome;
            document.getElementById("dupla2").textContent = equipe[2].nome + ", " + equipe[3].nome;
            document.getElementById("simples").textContent = equipe[4].nome;
        } catch (error) {
            console.error("Erro ao carregar jogadores:", error);
        }
    }

    carregarEquipes();
});

function registrarResultados() {
    const dataTorneio = document.getElementById("dataTorneio").value;
    const resultadoDupla1 = document.getElementById("resultadoDupla1").value;
    const resultadoDupla2 = document.getElementById("resultadoDupla2").value;
    const resultadoSimples = document.getElementById("resultadoSimples").value;

    console.log("Torneio em:", dataTorneio);
    console.log("Dupla 1 resultado:", resultadoDupla1);
    console.log("Dupla 2 resultado:", resultadoDupla2);
    console.log("Simples resultado:", resultadoSimples);
    
    alert("Resultados registrados!");
}
