// Seleciona o botão de envio
const submitButton = document.querySelector('button[type="button"]');

function formataNome(nome){
  return nome
    .trim() // Remove espaços no início e no fim
    .toLowerCase() // Converte para minúsculas
    .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único
    .split(' ') // Divide a string em palavras
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1)) // Primeira letra maiúscula
    .join(' '); // Junta as palavras novamente em uma string
}

// Adiciona um evento de clique ao botão
submitButton.addEventListener('click', async () => {
  // Captura os valores do formulário
  const nome = document.getElementById('nome').value;
  const sexo = document.getElementById('sexo').value;
  const classificacao = document.getElementById('classificacao').value;
  const senha = document.getElementById('senha').value;

  nome = formataNome(nome);

  // Cria o objeto com os dados do formulário
  const formData = {
    nome,
    sexo,
    classificacao,
    senha,
  };

  try {
    // Faz a requisição para a API
    const response = await fetch('https://tenis-api-v1.onrender.com/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      alert('Dados enviados com sucesso!');
      console.log('Resposta da API:', result);
    } else {
      alert('Erro ao enviar os dados.');
      console.error('Erro:', response.status, response.statusText);
    }
  } catch (error) {
    alert('Ocorreu um erro inesperado.');
    console.error('Erro:', error);
  }
});