/* Show current day and time */
function formatDate(timestamp) {
  let date= new Date(timestamp);
  let hours= date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes=date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];
  return `${currentDay} ${hours}:${minutes}`;
}

function forecastDate(timestamp){
  let date= new Date(timestamp*1000);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thr",
    "Fri",
    "Sat"
  ];
  let forecastDay = days[date.getDay()];
  return `${forecastDay}`;
}

function displayForecast(response){
  let forecast=response.data.daily;
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
  if (index>0){
  forecastmin=Math.round(forecastDay.temperature.minimum);
  forecastmax=Math.round(forecastDay.temperature.maximum);

    forecastHTML =
      forecastHTML + `<div class="col">
      <div class="col">
        <div class="weather-forecast-date">${forecastDate(forecastDay.time)}</div>
          <img class="img-sec" src="${displayForecastIcon(forecastDay.condition.icon)}" alt="" max-width="80"/>
          <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-min">${forecastmin}</span>
                <span>&nbsp</span>
            <span class="weather-forecast-temperature-max">${forecastmax}</span>
          </div>
      </div>
    </div>`;
  }});

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecastValues(coordinates){
  let apiKey = "cb0145od1153t706df98a650170dc2a9";
  let lon= coordinates.longitude;
  let lat= coordinates.latitude;
  let apiURL=`https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}


/* Search engine returns value of city introduced */
function searchEngine(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#search");
  let cityValue=document.querySelector(".city-name");
  cityValue.innerHTML=searchValue.value;
  setCity(searchValue.value);
}

function setCity(city) {
 let apiKey = "cb0145od1153t706df98a650170dc2a9";
 let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
 axios.get(url).then(displayWeather);
}

/* With the city introduced by the search engine we return the temperature and update the values in the HTML */
function displayWeather(response) {
  let currentCity = document.querySelector(".city-name");
  let tempCity = document.querySelector(".city-temp");
  let dateElement =  document.querySelector(".city-date");
  currentCity.innerHTML = response.data.city;
  celsiusTemperature=response.data.temperature.current;
  tempCity.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity-value").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind-value").innerHTML = Math.round(
    response.data.wind.speed
  );
  let description = response.data.condition.description;
  let descriptionCap=  description.charAt(0).toUpperCase() + description.slice(1);
  document.querySelector("#description").innerHTML =
  descriptionCap;
  dateElement.innerHTML =formatDate(response.data.time*1000);
  let iconValue=response.data.condition.icon;
  displayIcons(iconValue);
 
  getForecastValues(response.data.coordinates);
}

function displayForecastIcon(value){
   if (value==="broken-clouds-day"){
    value='weather-icon-png/broken-clouds.png';
  } else if (value==="clear-sky-day"){
    value=`weather-icon-png/clear-day.png`;
  } else if (value==="clear-sky-night"){
    value=
    `weather-icon-png/clear-night.png`;
  } else if (value==="few-clouds-day"){
    value=
    `weather-icon-png/few-clouds-day.png`;
  } else if (value==="few-clouds-night"){
    value=
    `weather-icon-png/few-clouds-night.png`;
  } else if ((value==="scattered-clouds-day") || (value==="scattered-clouds-night")){
    value=
    `weather-icon-png/scattered-clouds.png`;
  } else if ((value==="broken-clouds-day") || (value==="broken-clouds-night")){
    value=
    `weather-icon-png/broken-clouds.png`;
  } else if ((value==="shower-rain-day") || (value==="shower-rain-night")){
    value=
    `weather-icon-png/shower-rain.png`;
  } else if (value==="rain-day"){
    value=
    `weather-icon-png/rain-day.png`;
  } else if (value==="rain-night"){
    value=
    `weather-icon-png/rain-night.png`;
  } else if ((value==="thunderstorm-day") || (value==="thunderstorm-night")){
    value=
    `weather-icon-png/thunderstorm.png`;
  } else if ((value==="snow-day") || (value==="snow-night")){
    value=
    `weather-icon-png/snow.png`;
  } else if ((value==="mist-day") || (value==="mist-night")){
    value=
    `weather-icon-png/mist.png`;
  }
  return value;
}

function displayIcons(value){
 let iconElement=document.querySelector("#img-main");
 if (value==="broken-clouds-day"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/broken-clouds.png`
    );
  } else if (value==="clear-sky-day"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/clear-day.png`
    );
  } else if (value==="clear-sky-night"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/clear-night.png`
    );
  } else if (value==="few-clouds-day"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/few-clouds-day.png`
    );
  } else if (value==="few-clouds-night"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/few-clouds-night.png`
    );
  } else if ((value==="scattered-clouds-day") || (value==="scattered-clouds-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/scattered-clouds.png`
    );
  } else if ((value==="broken-clouds-day") || (value==="broken-clouds-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/broken-clouds.png`
    );
  } else if ((value==="shower-rain-day") || (value==="shower-rain-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/shower-rain.png`
    );
  } else if (value==="rain-day"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/rain-day.png`
    );
  } else if (value==="rain-night"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/rain-night.png`
    );
  } else if ((value==="thunderstorm-day") || (value==="thunderstorm-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/thunderstorm.png`
    );
  } else if ((value==="snow-day") || (value==="snow-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/snow.png`
    );
  } else if ((value==="mist-day") || (value==="mist-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/mist.png`
    );
  }
//   iconElement.setAttribute("alt", response.data.condition.description);
}

/*Click on current button and show city and temp */
function getLatLong(position) {
  let latitudeValue=position.coords.latitude;
  let longitudeValue=position.coords.longitude;
  let apiKey = "cb0145od1153t706df98a650170dc2a9";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${longitudeValue}&lat=${latitudeValue}&key=${apiKey}`;
  axios.get(url).then(displayWeather);  
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLatLong);
}

/*Favorite cities*/
function getCaracas() {
 let city="Caracas";
 let apiKey = "cb0145od1153t706df98a650170dc2a9";
 let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
 axios.get(url).then(displayWeather);
}
function getMontevideo() {
 let city="Montevideo";
 let apiKey = "cb0145od1153t706df98a650170dc2a9";
 let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
 axios.get(url).then(displayWeather);
}

function getBarcelona() {
 let city="Barcelona";
 let apiKey = "cb0145od1153t706df98a650170dc2a9";
 let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
 axios.get(url).then(displayWeather);
}

function getParis() {
 let city="Paris";
 let apiKey = "cb0145od1153t706df98a650170dc2a9";
 let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
 axios.get(url).then(displayWeather);
}

function displayFahrenheit(event){
  event.preventDefault;
  let tempElement=document.querySelector(".city-temp");
 // let forecastTempMin=document.querySelector(".weather-forecast-temperature-min");
 // let forecastTempMax=document.querySelector(".weather-forecast-temperature-max");
  let unitDisplayed=document.querySelector(".units");
  let fahrenheitTemp=((celsiusTemperature * 9) / 5) + 32;
  unitDisplayed.innerHTML="°F";
  tempElement.innerHTML=Math.round(fahrenheitTemp);
 // let minFahTemp=((forecastmin * 9) / 5) + 32;
 // forecastTempMin.innerHTML=Math.round(minFahTemp);
 // let maxFahTemp=((forecastmax * 9) / 5) + 32;
 // forecastTempMax.innerHTML=Math.round(maxFahTemp);
}

function displayCelcius(event){
  event.preventDefault;
  let tempElement=document.querySelector(".city-temp");
  let unitDisplayed=document.querySelector(".units");
 // let forecastTempMin=document.querySelector(".weather-forecast-temperature-min");
 // let forecastTempMax=document.querySelector(".weather-forecast-temperature-max");
  unitDisplayed.innerHTML="°C";
  tempElement.innerHTML=Math.round(celsiusTemperature);
 // forecastTempMin.innerHTML=Math.round(forecastmin);
 // forecastTempMax.innerHTML=Math.round(forecastmax);
}

let celsiusTemperature=null;
let forecastmin=null;
let forecastmax=null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);

let currentButton = document.querySelector("#btn-current");
currentButton.addEventListener("click",getCurrentCity);

let fahrenheitButton = document.querySelector("#temp-button-fahrenheit");
fahrenheitButton.addEventListener("click",displayFahrenheit);

let celsiusButton = document.querySelector("#temp-button-celsius");
celsiusButton.addEventListener("click",displayCelcius);

let CaracasButton = document.querySelector("#Caracas");
CaracasButton.addEventListener("click",getCaracas);

let MontevideoButton = document.querySelector("#Montevideo");
MontevideoButton.addEventListener("click",getMontevideo);

let BarcelonaButton = document.querySelector("#Barcelona");
BarcelonaButton.addEventListener("click",getBarcelona);

let ParisButton = document.querySelector("#Paris");
ParisButton.addEventListener("click",getParis);
/*Load page and show weather in barcelona by default */
document.addEventListener("DOMContentLoaded", function() {
  setCity("Barcelona");
  });