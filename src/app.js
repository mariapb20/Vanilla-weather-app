/* Show current day and time */

let currentTime = new Date();
function formatDate(date) {
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
  let currentHour=date.getHours();
  let currentMinutes=date.getMinutes();

  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  let todaysDate=document.querySelector(".city-date");
  todaysDate.innerHTML=formattedDate;
  let secondDay=document.querySelector("#second-day");
  let thirdDay=document.querySelector("#third-day");
  let fourthDay=document.querySelector("#fourth-day");
  let fifthDay=document.querySelector("#fifth-day");
  secondDay.innerHTML=days[date.getDay()+2];
  thirdDay.innerHTML=days[date.getDay()+3];
  fourthDay.innerHTML=days[date.getDay()+4];
  fifthDay.innerHTML=days[date.getDay()+5];
}

formatDate(currentTime);


/* Search engine returns value of city introduced */
function searchEngine(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#search");
  let cityValue=document.querySelector(".city-name");
  cityValue.innerHTML=searchValue.value;
  setCity(searchValue.value);
}

function setCity(city) {
 let apiKey = "743bee57fddbfaf52447193a87d5dd25";
 let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(url).then(displayWeather);
}

/* With the city introduced by the search engine we return the temperature and update the values in the HTML */
function displayWeather(response) {
  let currentCity = document.querySelector(".city-name");
  let tempCity = document.querySelector(".city-temp");
  currentCity.innerHTML = response.data.name;
  tempCity.innerHTML =  `${Math.round(response.data.main.temp)}`;
  document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-value").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
  response.data.weather[0].main;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);

/*Click on current button and show city and temp */
function getLatLong(position) {
  let latitudeValue=position.coords.latitude;
  let longitudeValue=position.coords.longitude;
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeValue}&lon=${longitudeValue}&appid=${apiKey}&units=metric`;
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
 let apiKey = "743bee57fddbfaf52447193a87d5dd25";
 let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(url).then(displayWeather);
}
function getMontevideo() {
 let city="Montevideo";
 let apiKey = "743bee57fddbfaf52447193a87d5dd25";
 let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(url).then(displayWeather);
}

function getBarcelona() {
 let city="Barcelona";
 let apiKey = "743bee57fddbfaf52447193a87d5dd25";
 let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(url).then(displayWeather);
}

function getParis() {
 let city="Paris";
 let apiKey = "743bee57fddbfaf52447193a87d5dd25";
 let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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