let cityName = "Detroit";
let weatherCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=26533fca4e43095b1b7c7c281ba63a18`;
let button = document.querySelector('#test');

function getWeather(){
fetch(weatherCall)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
    });
}

button.addEventListener('click', getWeather());