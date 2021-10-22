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

//Format Forecast date
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
  return days[day];
}
function formatMonth(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month];
}

function formatDayNumber(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  return day;
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
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let todayHighTempElement = document.querySelector("#today-high-temp");
  let todayLowTempElement = document.querySelector("#today-low-temp");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  todayHighTempElement.innerHTML = Math.round(response.data.main.temp_max);
  todayLowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
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

//Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
            <div class="text-center forecast-day">
              <h5><strong>${formatDay(forecastDay.dt)}</strong></h5>
              <h6> ${formatMonth(forecastDay.dt)} ${formatDayNumber(
          forecastDay.dt
        )}
        </h6>
              <img src="media/weather icons/${
                forecastDay.weather[0].icon
              }.svg" alt="${
          forecastDay.weather[0].description
        }" width="60" class="filter-white"/>
              <div class="forecast-temperatures">
                <h6 class="forecast-high-temp">${Math.round(
                  forecastDay.temp.max
                )}°F</h6>
                <p class="forecast-low-temp">${Math.round(
                  forecastDay.temp.min
                )}°F</p>
              </div>
            </div>
          </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

search("Washington"); //Default city when page loads
