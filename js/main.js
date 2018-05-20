let api = "https://fcc-weather-api.glitch.me/";
let longitude;
let latitude;

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    let endpoint = `${api}/api/current?lat=${latitude}&lon=${longitude}`;
    $.get(endpoint, function(data) {
      console.log(data);
      console.log("Success!");
      $("#location").html(`${data.name}, ${data.sys.country}`);
      $("#temp").html(data.main.temp);
      $("#low").html(data.main.temp_min);
      $("#high").html(data.main.temp_max);
      $("#category").html(data.weather[0].main);
      $("#description").html(data.weather[0].description);
      let iconURL = data.weather[0].icon;
      $("#icon").html(`<img src=${iconURL} />`);
    });
  });
});
