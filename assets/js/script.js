let cityName = "";
let searchButton = document.querySelector('#searchButton');
let searchInput = document.querySelector('#searchInput')
let CurrentWeatherDiv = document.querySelector('#currentWeather');
let forecastBlocks = document.querySelector('#forecastBlocks');
let pastSearches = document.querySelector('#pastSearches');
renderButtons();

// This function saves the input in the search bar to local storage. It will determine if an array exists (first if), determine if the object is already in the array, and push it to the back if it is (else if) and finally, will just add the object to the array if the first two conditions are false.
function saveSearch(cityString) {
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
}
// This function will render buttons based on the searches saved in the local storage, and will run the functions that get the weather and forecast if clicked.
function renderButtons() {
    pastSearches.innerHTML = '';
    const localReadAgain = JSON.parse(localStorage.getItem("historyArray"))
    if (localReadAgain){
    for (var i = 0; i < localReadAgain.length; i++) {
        var pastButton = document.createElement('button');
        pastButton.textContent = localReadAgain[i];
        pastButton.classList.add("btn", "btn-outline-dark", "btn-sm", "btn-secondary")
        pastButton.addEventListener('click', (e) => {
            getWeather(e.target.textContent);
            getForecast(e.target.textContent);
        })
        pastSearches.appendChild(pastButton);
    }}
}
// This function will get the weather data based on the input in the search bar. The function will create an element to display the weather data and append it to a pre-existing element in the HTML.
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
                    `<div id="cwTop" class="d-flex justify-content-evenly border-solid-1px-black">
                    <h3>${data.name}</h3>
                    <h3>${dayjs().format('MMMM-DD-YYYY')}</h3>
                </div>
                <div id="cwBottom" class="d-flex justify-content-evenly p-2">
                    <h4><img alt="weather icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> ${data.weather[0].description}</h4>
                    <h4 class="p-4"> ${data.main.temp}\u00B0F</h4>
                    <h4 class="p-4"> ${data.main.humidity}% humidity</h4>
                    <h4 class="p-4"> ${data.wind.speed} mph</h4>
                </div>`
                CurrentWeatherDiv.innerHTML = '';
                CurrentWeatherDiv.appendChild(weatherTemperature);
            }
        });
}
// Similar to the getWeather function, this function will grab weather data for 5 days after the current day. It will create an element to display the data in, which will be repeated 4 more times.
function getForecast(cityName) {
    let weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=26533fca4e43095b1b7c7c281ba63a18&units=imperial`;
    fetch(weatherForecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecastBlocks.innerHTML = '';
            for (var i = 5; i < data.list.length; i += 8) {
                var forecastBlock = document.createElement('div');
                forecastBlock.classList.add('col');
                forecastBlock.innerHTML = `<b>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</b> <br>
                <img alt="weather icon" src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/> <br> 
                ${data.list[i].main.temp}\u00B0F <br>
                ${data.list[i].main.humidity}% humidity <br>
                ${data.list[i].wind.speed} mph`
                forecastBlocks.appendChild(forecastBlock);
            }
        })
}
// This event listener will run all functions when clicked.
searchButton.addEventListener('click', () => {
    cityName = searchInput.value;
    getWeather(cityName);
    getForecast(cityName);
})
