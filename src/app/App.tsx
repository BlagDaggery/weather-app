import { useState } from 'react';
import Temperature from '../temperature/Temperature';
import './App.css';


function App() {

    const [weatherData, setWeatherData] = useState({
        city: 'Your City',
        country: 'Your Country',
        currentConditions: ''
    });

    const [temperatureData, setTemperatureData] = useState({
        currentTempCelsius: NaN,
        lowTempCelsius: NaN,
        highTempCelsius: NaN
    });

    const [hiddenClass, setHiddenClass] = useState('hidden');

    const api: string = 'https://fcc-weather-api.glitch.me/api/current';

    function getWeatherData() {
        setHiddenClass('hidden');
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(positionData: GeolocationPosition) {
        const longitude: number = positionData.coords.longitude;
        const longitudeRounded: number = +positionData.coords.longitude.toFixed(2);

        const latitude: number = positionData.coords.latitude;
        const latitudeRounded: number = +positionData.coords.latitude.toFixed(2);

        const endpoint: string = `${api}?lat=${latitude}&lon=${longitude}`;

        async function fetchWeatherData() {
            const response = await fetch(endpoint);
            const data = await response.json();

            const responseLongitude: number = +data.coord.lon.toFixed(2);
            const responseLatitude: number = +data.coord.lat.toFixed(2);

            try {
                if (longitudeRounded !== responseLongitude || latitudeRounded !== responseLatitude) {
                    throw new Error('The returned coordinates from the API were not the same coordinates provided by the user agent.');
                }

                setWeatherData({
                    city: data.name,
                    country: data.sys.country,
                    currentConditions: data.weather[0].main
                });

                setTemperatureData({
                    currentTempCelsius: Math.round(data.main.temp),
                    lowTempCelsius: Math.round(data.main.temp_min),
                    highTempCelsius: Math.round(data.main.temp_max)
                });

            } catch (error) {
                console.error(error);
                setHiddenClass('');
            }
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
            <div className={`error-msg ${hiddenClass}`}>Looks like something went wrong. Wait a few seconds and try again.</div>
            {weatherData.currentConditions ? (
                <div>
                    <h2>{weatherData.city}, {weatherData.country}</h2>
                    <p>Current Conditions: {weatherData.currentConditions}</p>
                    <Temperature
                        currentTempCelsius={temperatureData.currentTempCelsius}
                        lowTempCelsius={temperatureData.lowTempCelsius}
                        highTempCelsius={temperatureData.highTempCelsius}
                    />
                </div>
            ) : null}
        </>
    );
}

export default App;
