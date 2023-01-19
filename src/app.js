/* Show current day and time */

//let currentTime = new Date();
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
  /*
  let secondDay=document.querySelector("#second-day");
  let thirdDay=document.querySelector("#third-day");
  let fourthDay=document.querySelector("#fourth-day");
  let fifthDay=document.querySelector("#fifth-day");
  secondDay.innerHTML=days[date.getDay()+2];
  thirdDay.innerHTML=days[date.getDay()+3];
  fourthDay.innerHTML=days[date.getDay()+4];
  fifthDay.innerHTML=days[date.getDay()+5];*/
  return `${currentDay} ${hours}:${minutes}`;
}

function displayForecast(response){
  console.log(response.data.daily);
  let forecastElement=document.querySelector("#forecast");
  let days = ["Wed","Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML + `<div class="col">
      <div class="col">
        <div class="weather-forecast-date">${day}</div>
          <img class="img-sec" src="weather-icon-png/shower-rain.png" alt="" max-width="72"/>
          <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-min"> 12° </span>
                <span>&nbsp</span>
            <span class="weather-forecast-temperature-max"> 18° </span>
          </div>
      </div>
    </div>`;
  });

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
/* let apiKey = "743bee57fddbfaf52447193a87d5dd25";
 let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;*/
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
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecastValues(response.data.coordinates);
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
}

/*Click on current button and show city and temp */
function getLatLong(position) {
  let latitudeValue=position.coords.latitude;
  let longitudeValue=position.coords.longitude;
 /* let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeValue}&lon=${longitudeValue}&appid=${apiKey}&units=metric`;*/
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
  let unitDisplayed=document.querySelector(".units");
  let fahrenheitTemp=((celsiusTemperature * 9) / 5) + 32;
  unitDisplayed.innerHTML="°F";
  tempElement.innerHTML=Math.round(fahrenheitTemp);
}

function displayCelcius(event){
  event.preventDefault;
  let tempElement=document.querySelector(".city-temp");
  let unitDisplayed=document.querySelector(".units");
  unitDisplayed.innerHTML="°C";
  tempElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature=null;

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
//setCity("Barcelona");
document.addEventListener("DOMContentLoaded", function() {
  setCity("Barcelona");
  });