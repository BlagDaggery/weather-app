let api = 'https://fcc-weather-api.glitch.me/api/current';

function convertToFahrenheit(temperature) {
  return temperature * 9 / 5 + 32;
}

$(document).ready(function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let endpoint = `${api}?lat=${latitude}&lon=${longitude}`;

    async function fetchWeatherData() {
      const response = await fetch(endpoint);
      const data = await response.json();

      let iconURL = data.weather[0].icon;
      let temperatureCelsius = Math.round(data.main.temp);
      let temperatureFahrenheit = Math.round(convertToFahrenheit(temperatureCelsius));
      let lowCelsius = data.main.temp_min;
      let lowFahrenheit = Math.round(convertToFahrenheit(lowCelsius));
      let highCelsius = data.main.temp_max;
      let highFahrenheit = Math.round(convertToFahrenheit(highCelsius));
      let temperatureUnit = " &deg;F";

      $("#location").html(`${data.name}, ${data.sys.country}`);
      $("#icon").html(`<img src=${iconURL} />`);
      $("#category").html(data.weather[0].main);
      $("#description").html(data.weather[0].description);
      $("#temp").html(temperatureFahrenheit + temperatureUnit);
      $("#low").html(lowFahrenheit + temperatureUnit);
      $("#high").html(highFahrenheit + temperatureUnit);
      $("#temp-switch").click(function () {
        if (temperatureUnit === " &deg;F") {
          temperatureUnit = " &deg;C";
          $("#temp").html(temperatureCelsius + temperatureUnit);
          $("#low").html(lowCelsius + temperatureUnit);
          $("#high").html(highCelsius + temperatureUnit);
        } else if (temperatureUnit === " &deg;C") {
          temperatureUnit = " &deg;F";
          $("#temp").html(temperatureFahrenheit + temperatureUnit);
          $("#low").html(lowFahrenheit + temperatureUnit);
          $("#high").html(highFahrenheit + temperatureUnit);
        }
      });
    }

    fetchWeatherData();

  });
});
