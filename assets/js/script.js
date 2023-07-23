let cityName = "Detroit";
let weatherCurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=26533fca4e43095b1b7c7c281ba63a18`;
let weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=26533fca4e43095b1b7c7c281ba63a18`
let button = document.querySelector('#test');
let buttonForecast = document.querySelector('#test2');

function getWeather(){
fetch(weatherCurrentURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
    });
}

function getForecast(){
    fetch(weatherForecastURL)
    .then(function (response){
        return response.json();
    })
    .then (function (data){
        console.log(data);
    })
}

button.addEventListener('click', getWeather());
buttonForecast.addEventListener('click', getForecast());