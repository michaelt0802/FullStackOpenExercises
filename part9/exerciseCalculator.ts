interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
  const average = hours.reduce((accum: number, curr: number) => accum + curr, 0) / hours.length
  const rating = average > target ? 3 : average === target ? 2 : 1

  return {
    periodLength: hours.length,
    trainingDays: hours.reduce((accum: number, curr: number) => (curr > 0) ? accum + 1 : accum, 0),
    success: average >= target,
    rating: rating,
    ratingDescription: rating === 3 ? 'Exceeded target goal' : rating === 2 ? 'Met target goal' : 'Didn\'t accomplish goal :(',
    target: target,
    average: average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))