"use strict";
/*
  Assignment 1: Unit Converter Web Application
  Names: Doug Dickens, Niko Dewit, Daniel Carpintero, and Caelan Abugan
  Date: September 28, 2026
  This program converts temperatures between Celsius and Fahrenheit in either direction.
  It reads comma-separated numeric temperatures from the page, parses them, and rejects invalid values.
  It applies the appropriate temperature formula to each accepted value and formats the results to two decimal places.
  The program displays converted values or a validation message and lets the user switch the conversion direction.
*/
// Conversion factory: selects the temperature formula and converts one value or an array of values.
const createTemperatureConverter = (fromUnit, toUnit) => {
    return (value) => {
        const convertValue = (temperature) => {
            if (fromUnit === "C" && toUnit === "F") {
                return (temperature * 9) / 5 + 32;
            }
            if (fromUnit === "F" && toUnit === "C") {
                return ((temperature - 32) * 5) / 9;
            }
            return temperature;
        };
        if (Array.isArray(value)) {
            return value.map(convertValue);
        }
        return convertValue(value);
    };
};
// Configure conversion functions for both supported directions.
const celsiusToFahrenheit = createTemperatureConverter("C", "F");
const fahrenheitToCelsius = createTemperatureConverter("F", "C");
// Cache the page controls used to read input and display conversion results.
const temperatureInput = document.getElementById("temperature-input");
const temperatureButton = document.getElementById("temperature-button");
const switchTemperatureButton = document.getElementById("switch-temperature-button");
const temperatureResult = document.getElementById("temperature-result");
const temperatureInputUnit = document.getElementById("input-unit");
const temperatureResultUnit = document.getElementById("result-unit");
const temperatureDescription = document.getElementById("description");
// Track whether the calculator is converting Celsius to Fahrenheit or the reverse.
let temperatureCurrentValue = false;
// Parse and validate input, convert Celsius to Fahrenheit, and display formatted results.
const handleCelsiusConvert = () => {
    const values = temperatureInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    if (values.some((value) => isNaN(value))) {
        temperatureResult.textContent =
            "Please enter valid numbers separated by commas";
        return;
    }
    const fahrenheit = celsiusToFahrenheit(values);
    temperatureResult.textContent = fahrenheit
        .map((value) => value.toFixed(2))
        .join(", ");
};
// Parse and validate input, convert Fahrenheit to Celsius, and display formatted results.
const handleFahrenheitConvert = () => {
    const values = temperatureInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    if (values.some((value) => isNaN(value))) {
        temperatureResult.textContent =
            "Please enter valid numbers separated by commas";
        return;
    }
    const celsius = fahrenheitToCelsius(values);
    temperatureResult.textContent = celsius
        .map((value) => value.toFixed(2))
        .join(", ");
};
// Run the conversion handler for the currently selected direction.
temperatureButton.addEventListener("click", () => {
    if (temperatureCurrentValue === false) {
        handleCelsiusConvert();
    }
    else {
        handleFahrenheitConvert();
    }
});
// Toggle conversion direction and update the input, result, and unit labels.
switchTemperatureButton.addEventListener("click", () => {
    temperatureCurrentValue = !temperatureCurrentValue;
    temperatureInput.value = "0";
    temperatureResult.textContent = "0.00";
    if (temperatureCurrentValue === false) {
        temperatureButton.textContent = "Convert to Fahrenheit";
        temperatureInputUnit.textContent = "Celsius";
        temperatureResultUnit.textContent = "Fahrenheit";
        temperatureDescription.textContent = "Celsius to Fahrenheit";
    }
    else {
        temperatureButton.textContent = "Convert to Celsius";
        temperatureInputUnit.textContent = "Fahrenheit";
        temperatureResultUnit.textContent = "Celsius";
        temperatureDescription.textContent = "Fahrenheit to Celsius";
    }
});
//# sourceMappingURL=TemperatureCalcLogic.js.map