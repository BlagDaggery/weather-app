import { useState } from 'react'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState({
    city: 'Your City',
    country: 'Your Country',
    currentConditions: '',
    currentTempCelsius: NaN,
    lowTempCelsius: NaN,
    highTempCelsius: NaN
  });

  const [fahrenheitTemps, setfahrenheitTemps] = useState({
    currentTempFahrenheit: convertToFahrenheit(weatherData.currentTempCelsius),
    lowTempFahrenheit: convertToFahrenheit(weatherData.lowTempCelsius),
    highTempFahrenheit: convertToFahrenheit(weatherData.highTempCelsius)
  });

  const api: string = 'https://fcc-weather-api.glitch.me/api/current';

  function getWeatherData() {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function convertToFahrenheit(temperature: number) {
    return temperature ? Math.round(temperature * 9 / 5 + 32) : NaN;
  }

  function success(positionData: GeolocationPosition) {
    const longitude = positionData.coords.longitude;
    const latitude = positionData.coords.latitude;
    const endpoint: string = `${api}?lat=${latitude}&lon=${longitude}`;

    async function fetchWeatherData() {
      const response = await fetch(endpoint);
      const data = await response.json();
      
      setWeatherData({
        city: data.name,
        country: data.sys.country,
        currentConditions: data.weather[0].main,
        currentTempCelsius: Math.round(data.main.temp),
        lowTempCelsius: Math.round(data.main.temp_min),
        highTempCelsius: Math.round(data.main.temp_max)
      });

      setfahrenheitTemps({
        currentTempFahrenheit: convertToFahrenheit(data.main.temp),
        lowTempFahrenheit: convertToFahrenheit(data.main.temp_min),
        highTempFahrenheit: convertToFahrenheit(data.main.temp_max)
      });
    }

    fetchWeatherData();
  }

  function error(errorResponse: GeolocationPositionError) {
    console.error(errorResponse);
  }

  return (
    <>
      <h1>How's the Weather in {weatherData.city}?</h1>
      <button type="button" onClick={getWeatherData}>Get My Local Weather Data</button>
      <h2>{weatherData.city}, {weatherData.country}</h2>
      <div>Current Conditions: {weatherData.currentConditions}</div>
      <h3>Celsius</h3>
      <div>Current Temperature: {weatherData.currentTempCelsius ? weatherData.currentTempCelsius : ''}</div>
      <div>Today's High: {weatherData.highTempCelsius ? weatherData.highTempCelsius : ''}</div>
      <div>Today's Low: {weatherData.lowTempCelsius ? weatherData.lowTempCelsius : ''}</div>
      <h3>Fahrenheit</h3>
      <div>Current Temperature: {fahrenheitTemps.currentTempFahrenheit ? fahrenheitTemps.currentTempFahrenheit : ''}</div>
      <div>Today's High: {fahrenheitTemps.highTempFahrenheit ? fahrenheitTemps.highTempFahrenheit : ''}</div>
      <div>Today's Low: {fahrenheitTemps.lowTempFahrenheit ? fahrenheitTemps.lowTempFahrenheit : ''}</div>
    </>
  )
}

export default App