/*
  Assignment 1: Unit Converter Web Application
  Names: Doug Dickens, Niko Dewit, Daniel Carpintero, and Caelan Abugan
  Date: September 28, 2026
  This program converts distances between kilometres and miles in either direction.
  It reads comma-separated positive numeric distances from the page, parses them, and rejects invalid or non-positive values.
  It applies the appropriate conversion factor to each accepted value and formats the results to two decimal places.
  The program displays converted values or a validation message and lets the user switch the conversion direction.
*/

// Conversion factory: selects the distance formula and converts one value or an array of values.
const createDistanceConverter = (
  fromUnit: string,
  toUnit: string,
): ((value: number | number[]) => number | number[]) => {
  return (value: number | number[]): number | number[] => {
    const convertValue = (distance: number): number => {
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

// Configure conversion functions for both supported directions.
const kilometresToMiles = createDistanceConverter("km", "mi");

const milesToKilometres = createDistanceConverter("mi", "km");

// Cache the page controls used to read input and display conversion results.
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

// Track whether the calculator is converting kilometres to miles or the reverse.
let currentValueKm: boolean = false;

// Parse and validate input, convert kilometres to miles, and display formatted results.
const handleKmConvert = (): void => {
  const values: number[] = kmInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  if (values.some((value) => isNaN(value) || value <= 0)) {
    kmResult.textContent = "Please enter positive numbers separated by commas";
    return;
  }

  const miles = kilometresToMiles(values) as number[];

  kmResult.textContent = miles.map((value) => value.toFixed(2)).join(", ");
};

// Parse and validate input, convert miles to kilometres, and display formatted results.
const handleMiConvert = (): void => {
  const values: number[] = kmInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  if (values.some((value) => isNaN(value) || value <= 0)) {
    kmResult.textContent = "Please enter positive numbers separated by commas";
    return;
  }

  const kilometres = milesToKilometres(values) as number[];

  kmResult.textContent = kilometres.map((value) => value.toFixed(2)).join(", ");
};

// Run the conversion handler for the currently selected direction.
conversionButtonKm.addEventListener("click", (): void => {
  if (currentValueKm === false) {
    handleKmConvert();
  } else {
    handleMiConvert();
  }
});

// Toggle conversion direction and update the input, result, and unit labels.
switchButtonKm.addEventListener("click", (): void => {
  currentValueKm = !currentValueKm;

  kmInput.value = "0";
  kmResult.textContent = "0.00";

  if (currentValueKm === false) {
    conversionButtonKm.textContent = "Convert to Miles";
    inputUnitKm.textContent = "Kilometres";
    resultUnitKm.textContent = "Miles";
    descriptionKm.textContent = "Kilometres to Miles";
  } else {
    conversionButtonKm.textContent = "Convert to Kilometres";
    inputUnitKm.textContent = "Miles";
    resultUnitKm.textContent = "Kilometres";
    descriptionKm.textContent = "Miles to Kilometres";
  }
});
