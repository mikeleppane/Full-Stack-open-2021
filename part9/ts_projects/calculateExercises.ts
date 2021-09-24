export {};

interface ExerciseValues {
  exerciseHours: Array<number>;
  target: number;
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const [, , targetValue, ...exerciseHourValues] = args;
  const target = Number(targetValue);
  if (isNaN(target)) {
    throw new Error("Provided target value must be a number!");
  }
  const exerciseHours: Array<number> = exerciseHourValues.map((v) => Number(v));
  exerciseHours.forEach((v) => {
    if (isNaN(v)) {
      throw new Error("Provided exercises values must be numbers!");
    }
  });
  return { exerciseHours: exerciseHours, target: target };
};

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): ExerciseResult => {
  const average =
    exerciseHours.reduce((a, b) => a + b, 0) / exerciseHours.length;
  const ratingDesc: { [index: string]: string } = {
    1: "more effort needed. target is too far away.",
    2: "not too bad but could be better",
    3: "well done. target reached!",
  };
  const rating = (average: number, target: number): number => {
    if (average > target) {
      return 3;
    }
    if (average < target && average >= target - 1) {
      return 2;
    }
    return 1;
  };

  const calculatedRating: number = rating(average, target);

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((h) => h > 0).length,
    target: target,
    average: average,
    success: average >= target,
    rating: calculatedRating,
    ratingDescription: ratingDesc[calculatedRating],
  };
};

try {
  const { exerciseHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (e) {
  if (e instanceof Error) {
    console.log("Error, something bad happened, message: ", e.message);
  }
}
