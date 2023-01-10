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
 // let todaysDate=document.querySelector(".city-date");
  let secondDay=document.querySelector("#second-day");
  let thirdDay=document.querySelector("#third-day");
  let fourthDay=document.querySelector("#fourth-day");
  let fifthDay=document.querySelector("#fifth-day");
  //todaysDate.innerHTML=formattedDate;
  secondDay.innerHTML=days[date.getDay()+2];
  thirdDay.innerHTML=days[date.getDay()+3];
  fourthDay.innerHTML=days[date.getDay()+4];
  fifthDay.innerHTML=days[date.getDay()+5];
  return `${currentDay} ${hours}:${minutes}`;
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
  let iconElement=document.querySelector("#img-main");
  //currentCity.innerHTML = response.data.name;
  currentCity.innerHTML = response.data.city;
  tempCity.innerHTML =  `${Math.round(response.data.temperature.current)}`;
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
  if (iconValue==="broken-clouds-day"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/broken-clouds.png`
    );
  } else if (iconValue==="clear-sky-day"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/clear-day.png`
    );
  } else if (iconValue==="clear-sky-night"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/clear-night.png`
    );
  } else if (iconValue==="few-clouds-day"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/few-clouds-day.png`
    );
  } else if (iconValue==="few-clouds-night"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/few-clouds-night.png`
    );
  } else if ((iconValue==="scattered-clouds-day") || (iconValue==="scattered-clouds-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/scattered-clouds.png`
    );
  } else if ((iconValue==="broken-clouds-day") || (iconValue==="broken-clouds-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/broken-clouds.png`
    );
  } else if ((iconValue==="shower-rain-day") || (iconValue==="shower-rain-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/shower-rain.png`
    );
  } else if (iconValue==="rain-day"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/rain-day.png`
    );
  } else if (iconValue==="rain-night"){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/rain-night.png`
    );
  } else if ((iconValue==="thunderstorm-day") || (iconValue==="thunderstorm-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/thunderstorm.png`
    );
  } else if ((iconValue==="snow-day") || (iconValue==="snow-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/snow.png`
    );
  } else if ((iconValue==="mist-day") || (iconValue==="mist-night")){
    iconElement.setAttribute(
    "src",
    `weather-icon-png/mist.png`
    );
  }
    iconElement.setAttribute("alt", response.data.condition.description);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);

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

let currentButton = document.querySelector("#btn-current");
currentButton.addEventListener("click",getCurrentCity);

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

let CaracasButton = document.querySelector("#Caracas");
CaracasButton.addEventListener("click",getCaracas);

let MontevideoButton = document.querySelector("#Montevideo");
MontevideoButton.addEventListener("click",getMontevideo);

let BarcelonaButton = document.querySelector("#Barcelona");
BarcelonaButton.addEventListener("click",getBarcelona);

let ParisButton = document.querySelector("#Paris");
ParisButton.addEventListener("click",getParis);

/* Temperature unit *//*
function tempUnitCelsius(event){
    event.preventDefault();
    let tempValue=document.querySelector(".city-temp");
    let tempCelsius= 20;
    tempValue.innerHTML=tempCelsius+ ` ºC`;
}
function tempUnitFahrenheit(event){
    event.preventDefault();
    let tempValue=document.querySelector(".city-temp");
    let tempCelsius= 20;
    let tempFahrenheit= Math.round((tempCelsius * 9) / 5) + 32;
    tempValue.innerHTML=tempFahrenheit + ` ºF`;
}

    let unitValueCelsius = document.querySelector("#temp-button-celsius");
    unitValueCelsius.addEventListener("click",tempUnitCelsius);

    let unitValueFahrenheit = document.querySelector("#temp-button-fahrenheit");
    unitValueFahrenheit.addEventListener("click",tempUnitFahrenheit);
*/