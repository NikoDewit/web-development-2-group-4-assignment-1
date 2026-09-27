// Higher-order function for temperature conversion
const createTemperatureConverter = (
  fromUnit: string,
  toUnit: string,
): ((value: number | number[]) => number | number[]) => {
  return (value: number | number[]): number | number[] => {
    const convertValue = (temperature: number): number => {
      if (fromUnit === "C" && toUnit === "F") {
        return (temperature * 9) / 5 + 32;
      }

      if (fromUnit === "F" && toUnit === "C") {
        return ((temperature - 32) * 5) / 9;
      }

      return temperature;
    };

    if (Array.isArray(value)) {
      return value.map(convertValue);
    }

    return convertValue(value);
  };
};

// Create the two temperature conversion functions
const celsiusToFahrenheit = createTemperatureConverter("C", "F");

const fahrenheitToCelsius = createTemperatureConverter("F", "C");

// Get HTML elements
const temperatureInput = document.getElementById(
  "temperature-input",
) as HTMLInputElement;

const temperatureButton = document.getElementById(
  "temperature-button",
) as HTMLButtonElement;

const switchTemperatureButton = document.getElementById(
  "switch-temperature-button",
) as HTMLButtonElement;

const temperatureResult = document.getElementById(
  "temperature-result",
) as HTMLParagraphElement;

const temperatureInputUnit = document.getElementById(
  "input-unit",
) as HTMLLabelElement;

const temperatureResultUnit = document.getElementById(
  "result-unit",
) as HTMLParagraphElement;

const temperatureDescription = document.getElementById(
  "description",
) as HTMLParagraphElement;

// false = Celsius to Fahrenheit
// true = Fahrenheit to Celsius
let temperatureCurrentValue: boolean = false;

// Convert Celsius to Fahrenheit
const handleCelsiusConvert = (): void => {
  const values: number[] = temperatureInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  // Check for invalid input
  if (values.some((value) => isNaN(value))) {
    temperatureResult.textContent =
      "Please enter valid numbers separated by commas";
    return;
  }

  // Convert Celsius values to Fahrenheit
  const fahrenheit = celsiusToFahrenheit(values) as number[];

  // Display the converted values
  temperatureResult.textContent = fahrenheit
    .map((value) => value.toFixed(2))
    .join(", ");
};

// Convert Fahrenheit to Celsius
const handleFahrenheitConvert = (): void => {
  const values: number[] = temperatureInput.value
    .split(",")
    .map((part) => Number(part.trim()));

  // Check for invalid input
  if (values.some((value) => isNaN(value))) {
    temperatureResult.textContent =
      "Please enter valid numbers separated by commas";
    return;
  }

  // Convert Fahrenheit values to Celsius
  const celsius = fahrenheitToCelsius(values) as number[];

  // Display the converted values
  temperatureResult.textContent = celsius
    .map((value) => value.toFixed(2))
    .join(", ");
};

// Convert button
temperatureButton.addEventListener("click", (): void => {
  if (temperatureCurrentValue === false) {
    handleCelsiusConvert();
  } else {
    handleFahrenheitConvert();
  }
});

// Switch between Celsius and Fahrenheit
switchTemperatureButton.addEventListener("click", (): void => {
  temperatureCurrentValue = !temperatureCurrentValue;

  // Reset input and result when switching
  temperatureInput.value = "0";
  temperatureResult.textContent = "0.00";

  if (temperatureCurrentValue === false) {
    temperatureButton.textContent = "Convert to Fahrenheit";
    temperatureInputUnit.textContent = "Celsius";
    temperatureResultUnit.textContent = "Fahrenheit";
    temperatureDescription.textContent = "Celsius to Fahrenheit";
  } else {
    temperatureButton.textContent = "Convert to Celsius";
    temperatureInputUnit.textContent = "Fahrenheit";
    temperatureResultUnit.textContent = "Celsius";
    temperatureDescription.textContent = "Fahrenheit to Celsius";
  }
});
