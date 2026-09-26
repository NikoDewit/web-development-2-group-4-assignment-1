"use strict";
const kilometresToMiles = (kilometres) => kilometres * 0.621371;
const milesToKilometres = (miles) => miles / 0.621371;
const kmInput = document.getElementById("km-input");
const conversionButtonKm = document.getElementById("conversion-button-km");
const kmResult = document.getElementById("km-result");
const inputUnitKm = document.getElementById("input-unit-km");
const resultUnitKm = document.getElementById("result-unit-km");
const descriptionKm = document.getElementById("description-km");
const switchButtonKm = document.getElementById("switch-button-km");
let currentValueKm = false;
const handleMiConvert = () => {
    const values = kmInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    if (values.some((v) => isNaN(v) || v <= 0)) {
        kmResult.textContent = "Please enter positive numbers separated by commas";
        return;
    }
    const miles = values.map(milesToKilometres);
    kmResult.textContent = miles.map((p) => p.toFixed(2)).join(", ");
};
const handleKmConvert = () => {
    const values = kmInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    if (values.some((v) => isNaN(v) || v <= 0)) {
        kmResult.textContent = "Please enter positive numbers separated by commas";
        return;
    }
    const kilometres = values.map(kilometresToMiles);
    kmResult.textContent = kilometres.map((k) => k.toFixed(2)).join(", ");
};
if (currentValueKm === false) {
    conversionButtonKm.addEventListener("click", handleKmConvert);
}
else if (currentValueKm === true) {
    conversionButtonKm.addEventListener("click", handleMiConvert);
}
switchButtonKm.addEventListener("click", () => {
    if (currentValueKm === false) {
        currentValueKm = true;
        conversionButtonKm.removeEventListener("click", handleKmConvert);
        conversionButtonKm.addEventListener("click", handleMiConvert);
        conversionButtonKm.textContent = "Convert to Kilometres";
        inputUnitKm.textContent = "Miles";
        resultUnitKm.textContent = "Kilometres";
        descriptionKm.textContent = "Miles to Kilometres";
        kmInput.value = "0";
        kmResult.textContent = "0.00";
    }
    else {
        currentValueKm = false;
        conversionButtonKm.removeEventListener("click", handleMiConvert);
        conversionButtonKm.addEventListener("click", handleKmConvert);
        conversionButtonKm.textContent = "Convert to Miles";
        inputUnitKm.textContent = "Kilometres";
        resultUnitKm.textContent = "Miles";
        descriptionKm.textContent = "Kilometres to Miles";
        kmInput.value = "0";
        kmResult.textContent = "0.00";
    }
});
//# sourceMappingURL=DistanceCalcLogic.js.map