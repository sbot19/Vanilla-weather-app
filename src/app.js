function displayTemperature(response) {
  console.log(response.data);
  //it's 'response' b/c the app gets a response from the API.
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let todayHighTempElement = document.querySelector("#today-high-temp");
  todayHighTempElement.innerHTML = Math.round(response.data.main.temp_max);

  let todayLowTempElement = document.querySelector("#today-low-temp");
  todayLowTempElement.innerHTML = Math.round(response.data.main.temp_min);

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
