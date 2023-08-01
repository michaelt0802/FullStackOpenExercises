// import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword, signUp } from '../features/loginSlice'

const LoginForm = ({ handleLogin }) => {
  // LoginForm.prototype = {
  //   handleLogin: PropTypes.func.isRequired,
  //   username: PropTypes.string.isRequired,
  //   setUsername: PropTypes.func.isRequired,
  //   password: PropTypes.string.isRequired,
  //   setPassword: PropTypes.func.isRequired,
  // }

  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)

  const dispatch = useDispatch()

  const handleSignUpButton = () => {
    dispatch(signUp())
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignUpButton}>
        Sign Up
      </button>
    </div>
  )
}

export default LoginForm
