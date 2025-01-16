// Seleciona o botão de envio
const submitButton = document.querySelector('button[type="button"]');

// Adiciona um evento de clique ao botão
submitButton.addEventListener('click', async () => {
  // Captura os valores do formulário
  const nome = document.getElementById('nome').value;
  const sexo = document.getElementById('sexo').value;
  const classificacao = document.getElementById('classificacao').value;
  const senha = document.getElementById('senha').value;

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