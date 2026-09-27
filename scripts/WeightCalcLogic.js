"use strict";
// Higher-order function for weight conversion
const createWeightConverter = (fromUnit, toUnit) => {
    return (value) => {
        const convertValue = (weight) => {
            if (fromUnit === "kg" && toUnit === "lb") {
                return weight * 2.20462;
            }
            if (fromUnit === "lb" && toUnit === "kg") {
                return weight / 2.20462;
            }
            return weight;
        };
        if (Array.isArray(value)) {
            return value.map(convertValue);
        }
        return convertValue(value);
    };
};
// Two weight conversion functions
const kilogramsToPounds = createWeightConverter("kg", "lb");
const poundsToKilograms = createWeightConverter("lb", "kg");
// Get HTML elements
const weightInput = document.getElementById("kg-input");
const weightConversionButton = document.getElementById("conversion-button");
const weightResult = document.getElementById("kg-result");
const weightInputUnit = document.getElementById("input-unit");
const weightResultUnit = document.getElementById("result-unit");
const weightDescription = document.getElementById("description");
const weightSwitchButton = document.getElementById("switch-button");
// false = Kilograms to Pounds
// true = Pounds to Kilograms
let weightCurrentValue = false;
// Convert Kilograms to Pounds
const handleKgConvert = () => {
    const values = weightInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    // Check for invalid input
    if (values.some((value) => isNaN(value) || value <= 0)) {
        weightResult.textContent =
            "Please enter positive numbers separated by commas";
        return;
    }
    // Convert kilograms to pounds
    const pounds = kilogramsToPounds(values);
    // Display the converted values
    weightResult.textContent = pounds.map((value) => value.toFixed(2)).join(", ");
};
// Convert Pounds to Kilograms
const handleLbConvert = () => {
    const values = weightInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    // Check for invalid input
    if (values.some((value) => isNaN(value) || value <= 0)) {
        weightResult.textContent =
            "Please enter positive numbers separated by commas";
        return;
    }
    // Convert pounds to kilograms
    const kilograms = poundsToKilograms(values);
    // Display the converted values
    weightResult.textContent = kilograms
        .map((value) => value.toFixed(2))
        .join(", ");
};
// Convert button
weightConversionButton.addEventListener("click", () => {
    if (weightCurrentValue === false) {
        handleKgConvert();
    }
    else {
        handleLbConvert();
    }
});
// Switch between Kilograms and Pounds
weightSwitchButton.addEventListener("click", () => {
    weightCurrentValue = !weightCurrentValue;
    // Reset input and result when switching
    weightInput.value = "0";
    weightResult.textContent = "0.00";
    if (weightCurrentValue === false) {
        weightConversionButton.textContent = "Convert to Pounds";
        weightInputUnit.textContent = "Kilograms";
        weightResultUnit.textContent = "Pounds";
        weightDescription.textContent = "Kilograms to Pounds";
    }
    else {
        weightConversionButton.textContent = "Convert to Kilograms";
        weightInputUnit.textContent = "Pounds";
        weightResultUnit.textContent = "Kilograms";
        weightDescription.textContent = "Pounds to Kilograms";
    }
});
//# sourceMappingURL=WeightCalcLogic.js.map