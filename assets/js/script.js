let cityName = "";
let searchButton = document.querySelector('#searchButton');
let searchInput = document.querySelector('#searchInput')
let CurrentWeatherDiv = document.querySelector('#currentWeather');
let forecastBlocks = document.querySelector('#forecastBlocks');
let pastSearches = document.querySelector('#pastSearches');
renderButtons();

function saveSearch(cityString){
    const localRead = JSON.parse(localStorage.getItem("historyArray"));
    if (!localRead || localRead.length === 0) {
        localStorage.setItem("historyArray", JSON.stringify([cityString]))
    } else if (localRead.includes(cityString)) {
        var firstCity = localRead.indexOf(cityString);
        localRead.splice(firstCity, 1);
        localRead.push(cityString);
        localStorage.setItem("historyArray", JSON.stringify(localRead));
    } else {
        localRead.push(cityString);
        localStorage.setItem("historyArray", JSON.stringify(localRead));
    }
    renderButtons();
    // const localReadAgain = JSON.parse(localStorage.getItem("historyArray"))
    // for (var i = 0; i < localReadAgain.length; i++){
    //     var pastButton = document.createElement('button');
    //     pastButton.textContent = localReadAgain[i];
    //     pastSearches.appendChild(pastButton);
    // }
}
function renderButtons() {
    pastSearches.innerHTML='';
    const localReadAgain = JSON.parse(localStorage.getItem("historyArray"))
    for (var i = 0; i < localReadAgain.length; i++){
        var pastButton = document.createElement('button');
        pastButton.textContent = localReadAgain[i];
        pastButton.addEventListener('click', (e)=>{
            getWeather(e.target.textContent);
            getForecast(e.target.textContent);
            // getWeather(localReadAgain[i]);
            // getForecast(localReadAgain[i]);
        })
        pastSearches.appendChild(pastButton);
}}

function getWeather(cityName) {
    let weatherCurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=26533fca4e43095b1b7c7c281ba63a18&units=imperial`;
    fetch(weatherCurrentURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.name) {
                saveSearch(data.name);
                console.log(data);
                weatherTemperature = document.createElement('p');
                weatherTemperature.innerHTML =
                    `<div id="cwTop" class="d-flex justify-content-between border-solid-1px-black">
                    <h3>${data.name}</h3>
                    <h3>${dayjs().format('MMMM-DD-YYYY')}</h3>
                </div>
                <div id="cwBottom" class="d-flex justify-content-between p-2">
                    <h4>${data.weather[0].description}</h4>
                    <h4>${data.main.temp}\u00B0F</h4>
                    <h4>${data.main.humidity}%</h4>
                    <h4>${data.wind.speed} mph</h4>
                </div>`
                CurrentWeatherDiv.innerHTML = '';
                CurrentWeatherDiv.appendChild(weatherTemperature);
            } 
            // `For the city of ${cityName}:<br>
            // ${data.main.temp} Degrees Fahrenheit <br> 
            // ${data.main.humidity}% relative humidity <br>
            // Current weather conditions: ${data.weather[0].description} <br>
            // Wind speed is ${data.wind.speed} mph`
            // CurrentWeatherDiv.appendChild(weatherTemperature);

        });
}

function getForecast(cityName) {
    let weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=26533fca4e43095b1b7c7c281ba63a18&units=imperial`;
    fetch(weatherForecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            forecastBlocks.innerHTML='';
            for (var i = 5; i < data.list.length; i+=8){
                // console.log(data.list[i]);
                var forecastBlock = document.createElement('div');
                forecastBlock.classList.add('col');
                forecastBlock.innerHTML = `<b>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</b> <br>
                <img alt="weather icon" src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>, ${data.list[i].main.temp} <br>
                ${data.list[i].main.humidity}, ${data.list[i].wind.speed} `
                forecastBlocks.appendChild(forecastBlock);
            }
        })
}

searchButton.addEventListener('click', () => {
    cityName = searchInput.value;
    getWeather(cityName);
    getForecast(cityName);
})


// On click, the variable "city name" needs to be redefined as the searchInput
// Once redefined, the weatherCurrentURL and weatherForecastURL APIs need to be called
// Once called, we need to create an element to display the current weather of the called city, this should include:
    // The name of the city called (.name)
    // The date (.dt) the date is in unix, a conversion may be necessary. Alternatively, use new Date function?
    // current weather conditions (sunny, rainy, etc) (weather.main)
    // an icon that appropriately displays weather conditions
    // The current temperature (main.feels_like)
    // The humidity (main.humidity)
    // The wind speed (wind.speed)
//These elements should be appended to the #currentWeather div

//Additonally, the 5 day forcast should be displayed in a seperate div (#weatherForecast). It should include:
    // The date of each day forecasted
    // An icon representative of the weather condition
    // The temperature
    // The wind speed
    // The humidity

//The city name should be saved to local storage
//The final function should create a button(?) That is appended to #pastSearches and will get the text pulled from local storage.
//Clicking the button will run the getWeather and getForecast options, but will not re-save the search to local storage.