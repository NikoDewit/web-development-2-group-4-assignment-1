/*
  Assignment 1: Unit Converter Web Application
  Names: Doug Dickens, Niko Dewit, Daniel Carpintero, and Caelan Abugan
  Date: September 28, 2026
  This program converts weights between kilograms and pounds in either direction.
  It reads comma-separated positive numeric weights from the page, parses them, and rejects invalid or non-positive values.
  It applies the appropriate conversion factor to each accepted value and formats the results to two decimal places.
  The program displays converted values or a validation message and lets the user switch the conversion direction.
*/

// Conversion factory: selects the weight formula and converts one value or an array of values.
const createWeightConverter = (
  fromUnit: string,
  toUnit: string,
): ((value: number | number[]) => number | number[]) => {
  return (value: number | number[]): number | number[] => {
    const convertValue = (weight: number): number => {
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

// Configure conversion functions for both supported directions.
const kilogramsToPounds = createWeightConverter("kg", "lb");

const poundsToKilograms = createWeightConverter("lb", "kg");

// Cache the page controls used to read input and display conversion results.
const weightInput = document.getElementById("kg-input") as HTMLInputElement;

const weightConversionButton = document.getElementById(
  "conversion-button",
) as HTMLButtonElement;

const weightResult = document.getElementById(
  "kg-result",
) as HTMLParagraphElement;

const weightInputUnit = document.getElementById(
  "input-unit",
) as HTMLLabelElement;

const weightResultUnit = document.getElementById(
  "result-unit",
) as HTMLParagraphElement;

const weightDescription = document.getElementById(
  "description",
) as HTMLParagraphElement;

const weightSwitchButton = document.getElementById(
  "switch-button",
) as HTMLButtonElement;

// Track whether the calculator is converting kilograms to pounds or the reverse.
let weightCurrentValue: boolean = false;

// Parse and validate input, convert kilograms to pounds, and display formatted results.
const handleKgConvert = (): void => {
  const values: number[] = weightInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  if (values.some((value) => isNaN(value) || value <= 0)) {
    weightResult.textContent =
      "Please enter positive numbers separated by commas";
    return;
  }

  const pounds = kilogramsToPounds(values) as number[];

  weightResult.textContent = pounds.map((value) => value.toFixed(2)).join(", ");
};

// Parse and validate input, convert pounds to kilograms, and display formatted results.
const handleLbConvert = (): void => {
  const values: number[] = weightInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  if (values.some((value) => isNaN(value) || value <= 0)) {
    weightResult.textContent =
      "Please enter positive numbers separated by commas";
    return;
  }

  const kilograms = poundsToKilograms(values) as number[];

  weightResult.textContent = kilograms
    .map((value) => value.toFixed(2))
    .join(", ");
};

// Run the conversion handler for the currently selected direction.
weightConversionButton.addEventListener("click", (): void => {
  if (weightCurrentValue === false) {
    handleKgConvert();
  } else {
    handleLbConvert();
  }
});

// Toggle conversion direction and update the input, result, and unit labels.
weightSwitchButton.addEventListener("click", (): void => {
  weightCurrentValue = !weightCurrentValue;

  weightInput.value = "0";
  weightResult.textContent = "0.00";

  if (weightCurrentValue === false) {
    weightConversionButton.textContent = "Convert to Pounds";
    weightInputUnit.textContent = "Kilograms";
    weightResultUnit.textContent = "Pounds";
    weightDescription.textContent = "Kilograms to Pounds";
  } else {
    weightConversionButton.textContent = "Convert to Kilograms";
    weightInputUnit.textContent = "Pounds";
    weightResultUnit.textContent = "Kilograms";
    weightDescription.textContent = "Pounds to Kilograms";
  }
});
