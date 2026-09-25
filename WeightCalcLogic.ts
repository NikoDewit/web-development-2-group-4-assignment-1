const kilogramsToPounds = (kilograms: number): number => kilograms * 2.20462;
const poundsToKilograms = (pounds: number): number => pounds / 2.20462;

const kgInput = document.getElementById("kg-input") as HTMLInputElement;
const conversionButton = document.getElementById("conversion-button") as HTMLButtonElement;
const kgResult = document.getElementById("kg-result") as HTMLParagraphElement;
const inputUnit = document.getElementById("input-unit") as HTMLLabelElement;
const resultUnit = document.getElementById("result-unit") as HTMLParagraphElement;
const switchButton = document.getElementById("switch-button") as HTMLButtonElement;
let currentValue : boolean = false;

const handleKgConvert = (): void => {
  const values: number[] = kgInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  if (values.some((v) => isNaN(v) || v <= 0)) {
    kgResult.textContent = "Please enter positive numbers separated by commas";
    return;
  }

  const pounds: number[] = values.map(kilogramsToPounds);
  kgResult.textContent = pounds.map((p) => p.toFixed(2)).join(", ");
};

const handleLbConvert = (): void => {
  const values: number[] = kgInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  if (values.some((v) => isNaN(v) || v <= 0)) {
    kgResult.textContent = "Please enter positive numbers separated by commas";
    return;
  }

  const kilograms: number[] = values.map(poundsToKilograms);
  kgResult.textContent = kilograms.map((k) => k.toFixed(2)).join(", ");
};

if (currentValue === false) {
  conversionButton.addEventListener("click", handleKgConvert);
} else if (currentValue === true) {
  conversionButton.addEventListener("click", handleLbConvert);
}

switchButton.addEventListener("click", () => {
  if (currentValue === false) {
    console.log("Switching to pounds to kilograms conversion");
    currentValue = true;
    conversionButton.removeEventListener("click", handleKgConvert);
    conversionButton.addEventListener("click", handleLbConvert);
    conversionButton.textContent = "Convert to Kilograms";
    inputUnit.textContent = "Pounds";
    resultUnit.textContent = "Kilograms";
  } else {
    console.log("Switching to kilograms to pounds conversion");
    currentValue = false;
    conversionButton.removeEventListener("click", handleLbConvert);
    conversionButton.addEventListener("click", handleKgConvert);
    conversionButton.textContent = "Convert to Pounds";
    inputUnit.textContent = "Kilograms";
    resultUnit.textContent = "Pounds";
  }
});
  