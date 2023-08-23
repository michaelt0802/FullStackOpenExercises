import { resetLogin, setUsername, setPassword } from '../features/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const SignUpForm = ({ handleSignUp }) => {
  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)

  const dispatch = useDispatch()

  const handleLoginButton = () => {
    dispatch(resetLogin())
  }

  return (
    <div>
      <Form onSubmit={handleSignUp}>
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
          <Button variant='primary' type="submit">Sign Up</Button>
        </Form.Group>
      </Form>
      <Button onClick={handleLoginButton}>
        Login
      </Button>
    </div>
  )
}

export default SignUpForm