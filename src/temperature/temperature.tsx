
interface temperatureDataProps {
    currentTempCelsius: number,
    lowTempCelsius: number,
    highTempCelsius: number
}

function Temperature({currentTempCelsius, lowTempCelsius, highTempCelsius}: temperatureDataProps) {

    function convertToFahrenheit(temperature: number) {
        return temperature ? Math.round(temperature * 9 / 5 + 32) : NaN;
    }

    return (
        <>
            <div>
                <div>
                    <h3>Celsius</h3>
                    <div>Current Temperature: {currentTempCelsius ? currentTempCelsius : ''}</div>
                    <div>Today's High: {highTempCelsius ? highTempCelsius : ''}</div>
                    <div>Today's Low: {lowTempCelsius ? lowTempCelsius : ''}</div>
                </div>
                <div>
                    <h3>Fahrenheit</h3>
                    <div>Current Temperature: {currentTempCelsius ? convertToFahrenheit(currentTempCelsius) : ''}</div>
                    <div>Today's High: {highTempCelsius ? convertToFahrenheit(highTempCelsius) : ''}</div>
                    <div>Today's Low: {lowTempCelsius ? convertToFahrenheit(lowTempCelsius) : ''}</div>
                </div>
            </div>
        </>
    );
}

export default Temperature;
