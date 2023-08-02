import axios from 'axios'
const baseUrl = '/api/users'

const signUp = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {
    console.error('Sign up error: ', error)
    throw error
  }
}

export default { signUp }
