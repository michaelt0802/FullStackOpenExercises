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

const parseArguments = (args: string[]): { inputArray, target } => {
  if (args.length < 12) throw new Error('Not enough arguments');
  if (args.length > 12) throw new Error('Too many arguments');

  const inputArray = []
  let target: number;
  if (!isNaN(Number(args[2]))) {
    target = Number(args[2])
  } else {
    throw new Error('Provided values not numbers');
  }
  for (let i = 3; i < 12; i++) {
    if (!isNaN(Number(args[i]))) {
      inputArray.push(Number(args[i]))
    } else {
      throw new Error('Provided values not numbers');
    }
  }

  return { inputArray, target }
}

try {
const { inputArray, target } = parseArguments(process.argv)
console.log(calculateExercises(inputArray, target))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error: ', error.message)
  }
}


export {}