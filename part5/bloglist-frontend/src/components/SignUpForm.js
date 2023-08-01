import { useState } from 'react'
import { resetLogin } from '../features/loginSlice'
import { useDispatch } from 'react-redux'

const SignUpForm = ({ handleSignUp }) => {
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const dispatch = useDispatch()

  const handleLoginButton = () => {
    dispatch(resetLogin())
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSignUp({ username: newUsername, password: newPassword })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={newUsername}
            name="Username"
            onChange={({ target }) => setNewUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={newPassword}
            name="Password"
            onChange={({ target }) => setNewPassword(target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleLoginButton}>
        Login
      </button>
    </div>
  )
}

export default SignUpForm