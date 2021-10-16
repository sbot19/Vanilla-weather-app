function formatDate(timestamp) {
  // Calculate the time and date

  //date
  let date = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayNumber = date.getDate();

  //time
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  let time = date.toLocaleString("en-US", options);

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${dayNumber} | ${time}`;
}

function displayTemperature(response) {
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

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  //The '*1000' converts the milliseconds (from OpenWeatherMap) to actual Date and Time

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `media/weather icons/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
let city = "Washington";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
