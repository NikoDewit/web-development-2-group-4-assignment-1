"use strict";
const kilogramsToPounds = (kilograms) => kilograms * 2.20462;
const kgInput = document.getElementById("kg-input");
const kgButton = document.getElementById("kg-button");
const kgResult = document.getElementById("kg-result");
const handleKgConvert = () => {
  const values = kgInput.value.split(",").map((part) => Number(part.trim()));
  if (values.some((v) => isNaN(v) || v <= 0)) {
    kgResult.textContent = "Please enter positive numbers only";
    return;
  }
  const pounds = values.map(kilogramsToPounds);
  kgResult.textContent = pounds.map((p) => p.toFixed(2)).join(", ");
};
kgButton.addEventListener("click", handleKgConvert);
//# sourceMappingURL=WeightCalcLogic.js.map
