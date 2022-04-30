let weather = {
    "apiKey": "de630b5970fa469b8da161239222904",
    fetchWeather: function (city) {
        fetch(
            "https://api.weatherapi.com/v1/current.json?key="+ this.apiKey +"&q="+ city +"&aqi=no",  
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name, region, country } = data.location;
        const { text, icon } = data.current.condition;
        const { temp_c, humidity, wind_kph } = data.current;
        document.querySelector(".city").innerHTML = "Weather in "+ name;
        document.querySelector(".weather-icon").src = "https:"+ icon;
        document.querySelector(".temperature").innerText = temp_c + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + wind_kph + "km/h";
        document.querySelector(".weather-description").innerHTML = text;
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button")
.addEventListener("click", () => {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if(event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Vilnius");