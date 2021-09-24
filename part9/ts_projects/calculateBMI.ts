export const BMICalculator = (height: number, weight: number): string => {
  if (height === 0) {
    throw new Error("Zero division error: height cannot be zero.");
  }
  if (height < 0 || weight <= 0) {
    throw new Error(
      "Negative numbers are not allowed: height and weight must be positive numbers."
    );
  }
  const index = Number((weight / (height / 100) ** 2).toFixed(1));
  if (index < 16) {
    return `Underweight (severe thinness)`;
  } else if (16 <= index && index <= 16.9) {
    return `Underweight (moderate thinness)`;
  } else if (17 <= index && index <= 18.4) {
    return `Underweight (mild thinness)`;
  } else if (18.5 <= index && index <= 24.9) {
    return `Normal (healthy weight)`;
  } else if (25 <= index && index <= 29.9) {
    return `Overweight (pre-obese)`;
  } else if (30 <= index && index <= 34.9) {
    return `Overweight (obese class 1)`;
  } else if (35 <= index && index < 40) {
    return `Overweight (obese class 2)`;
  } else {
    return `Overweight (obese class 3)`;
  }
};
