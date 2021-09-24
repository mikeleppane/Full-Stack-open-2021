interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (
  exerciseHours: Array<number>,
  target: number
): ExerciseResult => {
  if (exerciseHours.length === 0) {
    throw new Error("Provided exercises values does not contain any values!");
  }

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
