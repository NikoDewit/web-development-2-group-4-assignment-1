const kilogramsToPounds = (kilograms: number): number => kilograms * 2.20462;
const poundsToKilograms = (pounds: number): number => pounds / 2.20462;

const kgInput = document.getElementById("kg-input") as HTMLInputElement;
const kgButton = document.getElementById("kg-button") as HTMLButtonElement;
const kgResult = document.getElementById("kg-result") as HTMLParagraphElement;
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
  kgButton.addEventListener("click", handleKgConvert);
} else if (currentValue === true) {
  kgButton.addEventListener("click", handleLbConvert);
}
  