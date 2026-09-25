"use strict";
const kilogramsToPounds = (kilograms) => kilograms * 2.20462;
const poundsToKilograms = (pounds) => pounds / 2.20462;
const kgInput = document.getElementById("kg-input");
const conversionButton = document.getElementById("conversion-button");
const kgResult = document.getElementById("kg-result");
const inputUnit = document.getElementById("input-unit");
const resultUnit = document.getElementById("result-unit");
const description = document.getElementById("description");
const switchButton = document.getElementById("switch-button");
let currentValue = false;
const handleKgConvert = () => {
    const values = kgInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    if (values.some((v) => isNaN(v) || v <= 0)) {
        kgResult.textContent = "Please enter positive numbers separated by commas";
        return;
    }
    const pounds = values.map(kilogramsToPounds);
    kgResult.textContent = pounds.map((p) => p.toFixed(2)).join(", ");
};
const handleLbConvert = () => {
    const values = kgInput.value
        .split(",")
        .map((part) => Number(part.trim()));
    if (values.some((v) => isNaN(v) || v <= 0)) {
        kgResult.textContent = "Please enter positive numbers separated by commas";
        return;
    }
    const kilograms = values.map(poundsToKilograms);
    kgResult.textContent = kilograms.map((k) => k.toFixed(2)).join(", ");
};
if (currentValue === false) {
    conversionButton.addEventListener("click", handleKgConvert);
}
else if (currentValue === true) {
    conversionButton.addEventListener("click", handleLbConvert);
}
switchButton.addEventListener("click", () => {
    if (currentValue === false) {
        currentValue = true;
        conversionButton.removeEventListener("click", handleKgConvert);
        conversionButton.addEventListener("click", handleLbConvert);
        conversionButton.textContent = "Convert to Kilograms";
        inputUnit.textContent = "Pounds";
        resultUnit.textContent = "Kilograms";
        description.textContent = "Pounds to Kilograms";
    }
    else {
        currentValue = false;
        conversionButton.removeEventListener("click", handleLbConvert);
        conversionButton.addEventListener("click", handleKgConvert);
        conversionButton.textContent = "Convert to Pounds";
        inputUnit.textContent = "Kilograms";
        resultUnit.textContent = "Pounds";
        description.textContent = "Kilograms to Pounds";
    }
});
//# sourceMappingURL=WeightCalcLogic.js.map