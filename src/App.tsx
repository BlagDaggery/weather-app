import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0);

  let api: string = 'https://fcc-weather-api.glitch.me/api/current';

  const [city, setCity] = useState('Your City');

  function getWeatherData() {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(positionData) {
    let longitude = positionData.coords.longitude;
    let latitude = positionData.coords.latitude;
    let endpoint: string = `${api}?lat=${latitude}&lon=${longitude}`;

    // do fetch/async + await here

  }

  function error(errorResponse) {
    console.error(errorResponse);
    // do something on the front end to let the user know it didn't work
  }

  return (
    <>
      <h1>How's the Weather in {city}?</h1>
      <div className="card">

      </div>
    </>
  )
}

export default App
