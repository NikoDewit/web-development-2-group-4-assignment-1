const kilometresToMiles = (kilometres: number): number => kilometres * 0.621371;
const milesToKilometres = (miles: number): number => miles / 0.621371;

const kmInput = document.getElementById("km-input") as HTMLInputElement;
const conversionButtonKm = document.getElementById(
  "conversion-button-km",
) as HTMLButtonElement;
const kmResult = document.getElementById("km-result") as HTMLParagraphElement;
const inputUnitKm = document.getElementById(
  "input-unit-km",
) as HTMLLabelElement;
const resultUnitKm = document.getElementById(
  "result-unit-km",
) as HTMLParagraphElement;
const descriptionKm = document.getElementById(
  "description-km",
) as HTMLParagraphElement;
const switchButtonKm = document.getElementById(
  "switch-button-km",
) as HTMLButtonElement;
let currentValueKm: boolean = false;

const handleMiConvert = (): void => {
  const values: number[] = kmInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  if (values.some((v) => isNaN(v) || v <= 0)) {
    kmResult.textContent = "Please enter positive numbers separated by commas";
    return;
  }

  const miles: number[] = values.map(milesToKilometres);
  kmResult.textContent = miles.map((p) => p.toFixed(2)).join(", ");
};

const handleKmConvert = (): void => {
  const values: number[] = kmInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  if (values.some((v) => isNaN(v) || v <= 0)) {
    kmResult.textContent = "Please enter positive numbers separated by commas";
    return;
  }

  const kilometres: number[] = values.map(kilometresToMiles);
  kmResult.textContent = kilometres.map((k) => k.toFixed(2)).join(", ");
};

if (currentValueKm === false) {
  conversionButtonKm.addEventListener("click", handleKmConvert);
} else if (currentValueKm === true) {
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
  } else {
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
