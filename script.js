const form = document.querySelector("form");
const displayContainer = document.getElementById("displayContainer")
const tempUnitSelector = document.getElementById("tempUnit");
const temperatureP = document.getElementById("temperatureDisplay");
const celsiusP = document.getElementById("celsiusTemp")

const apiKey = "2a4256cdc8f295a14762fb79c5eb822d"

function displayTemperatureUnit (unit) {
    const temperature = parseInt(celsiusP.textContent)

    if(unit === "fahrenheit") {
        temperatureP.textContent = ((temperature * 9/5) + 32);
    } else if (unit === "kelvin") {
        temperatureP.textContent = (temperature + 273.15);
    } else {
        temperatureP.textContent = temperature;
    }
    
}

function renderInfo(data) {
    const cityName = data.name;
    const windSpeed = data.wind.speed;
    const weatherDesc = data.weather[0].main;
    const temperature = data.main.temp;

    displayContainer.innerHTML = `
        <h2>City name: ${cityName}</h2>
        <p>Wind speed: ${windSpeed}</p>
        <p>Weather condition: ${weatherDesc}</p>
    `
    celsiusP.textContent = temperature;
}

async function getInfo(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const info = await response.json();
        renderInfo(info);
        
    } catch (error) {
        console.log("Error fetching data", error)
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = form.targetCity.value;
    getInfo(city);
})

tempUnitSelector.addEventListener("change", (event) => {
    const currentUnit = event.target.value;
    displayTemperatureUnit(currentUnit);
})
