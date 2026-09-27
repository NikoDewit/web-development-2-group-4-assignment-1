// Higher-order function for distance conversion
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

// Two distance conversion functions
const kilometresToMiles = createDistanceConverter("km", "mi");

const milesToKilometres = createDistanceConverter("mi", "km");

// Get HTML elements
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

// false = Kilometres to Miles
// true = Miles to Kilometres
let currentValueKm: boolean = false;

// Convert Kilometres to Miles
const handleKmConvert = (): void => {
  const values: number[] = kmInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  // Check for invalid input
  if (values.some((value) => isNaN(value) || value <= 0)) {
    kmResult.textContent = "Please enter positive numbers separated by commas";
    return;
  }

  // Convert kilometres to miles
  const miles = kilometresToMiles(values) as number[];

  // Display the converted values
  kmResult.textContent = miles.map((value) => value.toFixed(2)).join(", ");
};

// Convert Miles to Kilometres
const handleMiConvert = (): void => {
  const values: number[] = kmInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  // Check for invalid input
  if (values.some((value) => isNaN(value) || value <= 0)) {
    kmResult.textContent = "Please enter positive numbers separated by commas";
    return;
  }

  // Convert miles to kilometres
  const kilometres = milesToKilometres(values) as number[];

  // Display the converted values
  kmResult.textContent = kilometres.map((value) => value.toFixed(2)).join(", ");
};

// Convert button
conversionButtonKm.addEventListener("click", (): void => {
  if (currentValueKm === false) {
    handleKmConvert();
  } else {
    handleMiConvert();
  }
});

// Switch between Kilometres and Miles
switchButtonKm.addEventListener("click", (): void => {
  currentValueKm = !currentValueKm;

  // Reset input and result when switching
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
