let cityName = "";
let searchButton = document.querySelector('#searchButton');
let searchInput = document.querySelector('#searchInput')
let CurrentWeatherDiv = document.querySelector('#currentWeather');
console.log(dayjs().hour())
searchButton.addEventListener('click', () => {
    cityName = searchInput.value;
    let weatherCurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=26533fca4e43095b1b7c7c281ba63a18&units=imperial`;
    let weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=26533fca4e43095b1b7c7c281ba63a18&units=imperial`;


    function getWeather() {
        fetch(weatherCurrentURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                weatherTemperature = document.createElement('p');
                weatherTemperature.innerHTML =
                    `<div id="cwTop" class="d-flex justify-content-between">
                    <h3>${cityName}</h3>
                    <h3>${dayjs().format('MMMM-DD-YYYY')}</h3>
                </div>
                <div id="cwBottom" class="d-flex justify-content-between p-2">
                    <h4>${data.weather[0].description}</h4>
                    <h4>${data.main.temp}\u00B0F</h4>
                    <h4>${data.main.humidity}%</h4>
                    <h4>${data.wind.speed} mph</h4>
                </div>`
                CurrentWeatherDiv.appendChild(weatherTemperature);
                // `For the city of ${cityName}:<br>
                // ${data.main.temp} Degrees Fahrenheit <br> 
                // ${data.main.humidity}% relative humidity <br>
                // Current weather conditions: ${data.weather[0].description} <br>
                // Wind speed is ${data.wind.speed} mph`
                // CurrentWeatherDiv.appendChild(weatherTemperature);

            });
    }
    function getForecast() {
        fetch(weatherForecastURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            })
    }

    getWeather();
    getForecast();
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