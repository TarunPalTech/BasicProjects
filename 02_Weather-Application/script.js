document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const weatherInfo = document.getElementById("weather-info");
  const API_KEY = "15cfe011f2586fb772a02be58e7049ca"; // env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // it may through an error
    // server/database is always in another continent

    const response = await fetch(url);
    if (!response.status) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityName.textContent = name;
    temperature.textContent = main.temp;
    description.textContent = weather[0].description;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
  function showError() {
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  }
});

// /*
// fetch() api:
// Remember, JavaScript alone is not capable of making the web request. Either you need a node environment or a window environment from a browser to make this HTTP request.
// */
