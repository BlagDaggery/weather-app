let api = "https://fcc-weather-api.glitch.me/";
let longitude;
let latitude;

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    longitude = Math.round(position.coords.longitude);
    latitude = Math.round(position.coords.latitude);
    let endpoint = `${api}/api/current?lat=${latitude}&lon=${longitude}`;
    $.get(endpoint, function(data) {
      console.log(data);
      console.log("Success!");
    });
  });
});
