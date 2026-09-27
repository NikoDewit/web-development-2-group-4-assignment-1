"use strict";
// Higher-order function for distance conversion
const createDistanceConverter = (fromUnit, toUnit) => {
    return (value) => {
        const convertValue = (distance) => {
            if (fromUnit === "km" && toUnit === "mi") {
                return distance * 0.621371;
            }
            if (fromUnit === "mi" && toUnit === "km") {
                return distance / 0.621371;
            }
            return distance;
        };
        if (Array.isArray(value)) {
            return value.map(convertValue);
        }
        return convertValue(value);
    };
};
// Two distance conversion functions
const kilometresToMiles = createDistanceConverter("km", "mi");
const milesToKilometres = createDistanceConverter("mi", "km");
// Get HTML elements
const kmInput = document.getElementById("km-input");
const conversionButtonKm = document.getElementById("conversion-button-km");
const kmResult = document.getElementById("km-result");
const inputUnitKm = document.getElementById("input-unit-km");
const resultUnitKm = document.getElementById("result-unit-km");
const descriptionKm = document.getElementById("description-km");
const switchButtonKm = document.getElementById("switch-button-km");
// false = Kilometres to Miles
// true = Miles to Kilometres
let currentValueKm = false;
// Convert Kilometres to Miles
const handleKmConvert = () => {
    const values = kmInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    // Check for invalid input
    if (values.some((value) => isNaN(value) || value <= 0)) {
        kmResult.textContent = "Please enter positive numbers separated by commas";
        return;
    }
    // Convert kilometres to miles
    const miles = kilometresToMiles(values);
    // Display the converted values
    kmResult.textContent = miles.map((value) => value.toFixed(2)).join(", ");
};
// Convert Miles to Kilometres
const handleMiConvert = () => {
    const values = kmInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    // Check for invalid input
    if (values.some((value) => isNaN(value) || value <= 0)) {
        kmResult.textContent = "Please enter positive numbers separated by commas";
        return;
    }
    // Convert miles to kilometres
    const kilometres = milesToKilometres(values);
    // Display the converted values
    kmResult.textContent = kilometres.map((value) => value.toFixed(2)).join(", ");
};
// Convert button
conversionButtonKm.addEventListener("click", () => {
    if (currentValueKm === false) {
        handleKmConvert();
    }
    else {
        handleMiConvert();
    }
});
// Switch between Kilometres and Miles
switchButtonKm.addEventListener("click", () => {
    currentValueKm = !currentValueKm;
    // Reset input and result when switching
    kmInput.value = "0";
    kmResult.textContent = "0.00";
    if (currentValueKm === false) {
        conversionButtonKm.textContent = "Convert to Miles";
        inputUnitKm.textContent = "Kilometres";
        resultUnitKm.textContent = "Miles";
        descriptionKm.textContent = "Kilometres to Miles";
    }
    else {
        conversionButtonKm.textContent = "Convert to Kilometres";
        inputUnitKm.textContent = "Miles";
        resultUnitKm.textContent = "Kilometres";
        descriptionKm.textContent = "Miles to Kilometres";
    }
});
//# sourceMappingURL=DistanceCalcLogic.js.map