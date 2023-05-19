
const apiCountryUrl = 'https://flagcdn.com/16x12/';

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');


const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const umidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');
const weatherContainer = document.querySelector('#weather-data');

// Funções
async function showWeatherData(city) {
    try {
      const response = await fetch(`/weather?city=${city}`);
      const data = await response.json();
  
      cityElement.innerText = data.name;
      tempElement.innerText = parseInt(data.main.temp);
      descElement.innerText = data.weather[0].description;
      weatherIconElement.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
      countryElement.setAttribute("src", apiCountryUrl + (data.sys.country).toLowerCase() + ".png");
      umidityElement.innerText = `${data.main.humidity}%`;
      windElement.innerText = `${data.wind.speed}km/h`;
    
      weatherContainer.classList.remove('hide');
      document.querySelector('#city-input').value = '';
      // Restante do código para exibir os dados na página
      // ...
    } catch (error) {
      alert("Digite uma CIDADE válida")
      document.querySelector('#city-input').value = '';
      weatherContainer.classList.add('hide');
      

      console.error('Erro na chamada à API:', error);
      // Tratamento de erro
    }
  }
  



// Eventos

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
})
