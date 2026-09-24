"use strict";
const kilogramsToPounds = (kilograms) => kilograms * 2.20462;
const kgInput = document.getElementById("kg-input");
const kgButton = document.getElementById("kg-button");
const kgResult = document.getElementById("kg-result");
const handleKgConvert = () => {
    const kilograms = Number(kgInput.value);
    if (kilograms <= 0) {
        kgResult.textContent = "Please enter a positive number";
        return;
    }
    else {
        const pounds = kilogramsToPounds(kilograms);
        kgResult.textContent = pounds.toFixed(2);
    }
};
kgButton.addEventListener("click", handleKgConvert);
//# sourceMappingURL=WeightCalcLogic.js.map