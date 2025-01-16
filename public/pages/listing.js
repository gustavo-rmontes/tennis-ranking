// Example API URL
const apiUrl = 'https://tenis-api-v1.onrender.com/'; // Replace with your API URL

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
  
// Function to fetch data and populate the UL
async function fetchData() {
  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON data
    const data = await response.json();
    console.log(data);

    // Reference to the UL element
    const dataList = document.getElementById('players-list');

    // Populate UL with data
    data.forEach((item) => {
      console.log(item);
      const li = document.createElement('li');
      li.textContent = item.nome + ' - ' + item.classificacao + ' - ' + item.sexo;
      dataList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
