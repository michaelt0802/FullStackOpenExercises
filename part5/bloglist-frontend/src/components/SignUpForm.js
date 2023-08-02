import { resetLogin, setUsername, setPassword } from '../features/loginSlice'
import { useDispatch, useSelector } from 'react-redux'

const SignUpForm = ({ handleSignUp }) => {
  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)

  const dispatch = useDispatch()

  const handleLoginButton = () => {
    dispatch(resetLogin())
  }

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
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