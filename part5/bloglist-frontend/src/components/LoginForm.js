import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword, signUp } from '../features/loginSlice'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin }) => {

  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)

  const dispatch = useDispatch()

  const handleSignUpButton = () => {
    dispatch(signUp())
  }

  return (
    <div>
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
        </Form.Group>
      </Form>
      <Button onClick={handleSignUpButton}>
        Sign Up
      </Button>
    </div>
  )
}

export default LoginForm
