import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword, signUp } from '../features/loginSlice'
import { Form, Button } from 'react-bootstrap'
import Notification from './Notification'

const LoginForm = ({ handleLogin }) => {
  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)

  const dispatch = useDispatch()

  const handleSignUpButton = () => {
    dispatch(signUp())
  }

  return (
    <div className='login'>
      <h1>Log in</h1>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
          <Button variant='primary' type="submit">Login</Button>
          <Button variant='secondary' onClick={handleSignUpButton}>
            Sign Up
          </Button>
          <div>
          </div>
        </Form.Group>
      </Form>

    </div>
  )
}

export default LoginForm
