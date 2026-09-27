// Higher-order function for weight conversion
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

// Two weight conversion functions
const kilogramsToPounds = createWeightConverter("kg", "lb");

const poundsToKilograms = createWeightConverter("lb", "kg");

// Get HTML elements
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

// false = Kilograms to Pounds
// true = Pounds to Kilograms
let weightCurrentValue: boolean = false;

// Convert Kilograms to Pounds
const handleKgConvert = (): void => {
  const values: number[] = weightInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  // Check for invalid input
  if (values.some((value) => isNaN(value) || value <= 0)) {
    weightResult.textContent =
      "Please enter positive numbers separated by commas";
    return;
  }

  // Convert kilograms to pounds
  const pounds = kilogramsToPounds(values) as number[];

  // Display the converted values
  weightResult.textContent = pounds.map((value) => value.toFixed(2)).join(", ");
};

// Convert Pounds to Kilograms
const handleLbConvert = (): void => {
  const values: number[] = weightInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  // Check for invalid input
  if (values.some((value) => isNaN(value) || value <= 0)) {
    weightResult.textContent =
      "Please enter positive numbers separated by commas";
    return;
  }

  // Convert pounds to kilograms
  const kilograms = poundsToKilograms(values) as number[];

  // Display the converted values
  weightResult.textContent = kilograms
    .map((value) => value.toFixed(2))
    .join(", ");
};

// Convert button
weightConversionButton.addEventListener("click", (): void => {
  if (weightCurrentValue === false) {
    handleKgConvert();
  } else {
    handleLbConvert();
  }
});

// Switch between Kilograms and Pounds
weightSwitchButton.addEventListener("click", (): void => {
  weightCurrentValue = !weightCurrentValue;

  // Reset input and result when switching
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
