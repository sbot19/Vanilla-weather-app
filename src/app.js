// Display date and time
function formatDate(timestamp) {
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

//Display 5-day forecast temperatures
function getForecast(coordinates) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//Display current weather conditions
function displayTemperature(response) {
  //it's 'response' b/c the app gets a response from the API.

  fahrenheitTemperature = response.data.main.temp;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

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

  //Coordinates of the searched city
  getForecast(response.data.coord);

  //Animated background
  let animatedBackground = document.querySelector("body");
  animatedBackground.style.backgroundImage = `url(media/backgrounds/${response.data.weather[0].icon}.gif)`;
}

// Search Bar
function search(city) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault(); //prevents page from re-loading
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Current Location
function searchLocation(position) {
  //requires latitude and longitude of user's location
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector(".current-button");
currentLocation.addEventListener("click", getCurrentLocation);

//Conversion of current temperature
//
//Convert to Celsius
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //remove the active class from the fahrenheit link
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  //need to convert to metric units; wrong values
  //let highTemp = document.querySelector("#today-high-temp");
  //highTemp.innerHTML = Math.round(celsiusTemperature);

  //let lowTemp = document.querySelector("#today-low-temp");
  //lowTemp.innerHTML = Math.round(celsiusTemperature);

  //let feelsLike = document.querySelector("#feels-like");
  //feelsLike.innerHTML = Math.round(celsiusTemperature);

  //let wind = document.querySelector("#wind");
  //wind.innerHTML = Math.round(celsiusTemperature * 3.6);
}

//Convert to Fahrenheit
function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  //Original units are imperial; wrong values
  //let highTemp = document.querySelector("#today-high-temp");
  //highTemp.innerHTML = Math.round(fahrenheitTemperature);

  //let lowTemp = document.querySelector("#today-low-temp");
  //lowTemp.innerHTML = Math.round(fahrenheitTemperature);

  //let feelsLike = document.querySelector("#feels-like");
  //feelsLike.innerHTML = Math.round(fahrenheitTemperature);

  //let wind = document.querySelector("#wind");
  //wind.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null; // "fah...ture" is a global variable.

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

//Forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thr", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col">
            <div class="text-center forecast-day">
              <h5 class="dayOfWeek"><strong>${day}</strong></h5>
              <h6 class="forcast-day-number">Date</h6>
              <img src="" alt="" width="36" />
              <div class="forecast-temperatures">
                <h6 class="forecast-high-temp">day°F</h6>
                <p class="forecast-low-temp">night°F</p>
              </div>
            </div>
          </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

search("Washington"); //Default city when page loads
