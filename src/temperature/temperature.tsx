import { useState, useRef } from 'react';
import './Temperature.css';

interface temperatureDataProps {
    currentTempCelsius: number,
    lowTempCelsius: number,
    highTempCelsius: number
}

interface tempData1 {
    currentTemp: number,
    lowTemp: number,
    highTemp: number,
    unit: string
}

interface tempData2 {
    Celsius: tempData1,
    Fahrenheit: tempData1
}

function Temperature({ currentTempCelsius, lowTempCelsius, highTempCelsius }: temperatureDataProps) {

    const [tempScale, setTempScale] = useState('Celsius');
    const buttonText = useRef('Fahrenheit');

    const tempData: tempData2 = {
        Celsius: {
            currentTemp: currentTempCelsius,
            lowTemp: lowTempCelsius,
            highTemp: highTempCelsius,
            unit: `${String.fromCharCode(0x00B0)} C`
        },
        Fahrenheit: {
            currentTemp: convertToFahrenheit(currentTempCelsius),
            lowTemp: convertToFahrenheit(lowTempCelsius),
            highTemp: convertToFahrenheit(highTempCelsius),
            unit: `${String.fromCharCode(0x00B0)} F`
        }
    };

    const shorthand = tempData[tempScale as keyof tempData2];

    function convertToFahrenheit(temperature: number) {
        return temperature ? Math.round(temperature * 9 / 5 + 32) : NaN;
    }

    function toggleTempScale() {
        tempScale === 'Fahrenheit' ? setTempScale('Celsius') : setTempScale('Fahrenheit');
        buttonText.current === 'Celsius' ? buttonText.current = 'Fahrenheit' : buttonText.current = 'Celsius';
    }

    return (
        <div>
            <div className='current-temp'>{shorthand.currentTemp} {shorthand.unit}</div>
            <div className='high-low'>
                <div>High: {shorthand.highTemp} {shorthand.unit}</div>
                <div>Low: {shorthand.lowTemp} {shorthand.unit}</div>
            </div>
            <button type="button" onClick={toggleTempScale}>Show me {buttonText.current}</button>
        </div>
    );
}

export default Temperature;
