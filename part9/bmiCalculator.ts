const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 703
  if (bmi < 18.5) return 'Underweight'
  else if (bmi < 24.9) return 'Healthy Weight'
  else if (bmi < 29.9) return 'Overweight'
  else return 'Obese'
}

const getBmi = (height: number, weight: number): string => {
  try {
    return calculateBmi(height, weight)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error: ', error.message)
    }
    return 'Error calculating BMI'
  }

}

export default getBmi;