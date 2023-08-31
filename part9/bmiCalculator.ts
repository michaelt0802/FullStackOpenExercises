interface heightWeight {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 703
  if (bmi < 18.5) return 'Underweight'
  else if (bmi < 24.9) return 'Healthy Weight'
  else if (bmi < 29.9) return 'Overweight'
  else return 'Obese'
}

const parseArguments = (args: string[]): heightWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values not numbers');
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error: ', error.message)
  }
}


export {}