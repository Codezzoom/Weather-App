let defaultCity = "London";
const API_KEY = "YOUR_API_KEY";

const elements = {
  search: document.querySelector("#search"),
  searchIcon: document.querySelector(".search-icon"),
  mid: document.querySelector(".mid"),
  bottom: document.querySelector(".bottom"),
  weatherIcon: document.querySelector(".weather-icon img"),
  temperature: document.querySelector(".temperature p"),
  tempUnit: document.querySelector(".temp-unit"),
  tempUnitButton: document.querySelector(".temp-unit-button"),
  city: document.querySelector(".city p"),
  humid: document.querySelector(".humid"),
  windy: document.querySelector(".windy"),
  textErrorSubheading: document.querySelector(".text-error-subheading"),
  error: document.querySelector(".error"),
};

let isCelsius = true;
let currentWeather = null;

const getWeatherUrl = (city) => {
  return `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
};

const conditionIcons = {
  Sunny: "assets/images/clear.png",
  Clear: "assets/images/clear.png",
  Snow: "assets/images/snow.png",
  Overcast: "assets/images/clouds.png",
  Cloudy: "assets/images/clouds.png",
  "Partly cloudy": "assets/images/mist.png",
  Mist: "assets/images/mist.png",
  Rainy: "assets/images/rain.png",
  Rain: "assets/images/rain.png",
  "Light rain": "assets/images/drizzle.png",
  "Moderate rain": "assets/images/rain.png",
  "Heavy rain": "assets/images/rain.png",
  default: "assets/images/clear.png",
};

const showError = (message) => {
  elements.error.classList.remove("remove");
  elements.mid.classList.add("remove");
  elements.bottom.classList.add("remove");
  elements.textErrorSubheading.textContent = message;
};

const fetchWeather = async (city) => {
  try {
    const response = await fetch(getWeatherUrl(city));
    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }
    const data = await response.json();
    currentWeather = data;
    showWeather();

    if (data.error) {
      showError(`No results found for "${city}"`);
      return;
    }

  } catch (error) {
    console.error(error);
    showError(`No results found for "${city}"`);
  }
};


const showWeather = () => {
  console.log(currentWeather);
  const { current } = currentWeather;
  elements.temperature.innerHTML = `<p>${isCelsius ? current.temp_c : current.temp_f}°<span class="temp-unit">${isCelsius ? "C" : "F"}</span></p>`;
  elements.weatherIcon.src = conditionIcons[current.condition.text];
  elements.city.innerText = elements.search.value || defaultCity;
  elements.humid.innerText = current.humidity + "%";
  elements.windy.innerText = current.wind_kph + " km/h";
};

elements.searchIcon.addEventListener("click", () => {
  const city = elements.search.value.trim();
  if (!city) return;
  fetchWeather(city);
});

elements.tempUnitButton.addEventListener('click', () => {
  isCelsius = !isCelsius;
  elements.tempUnitButton.innerText = isCelsius ? "F" : "C";
  showWeather();
});

fetchWeather(defaultCity);
