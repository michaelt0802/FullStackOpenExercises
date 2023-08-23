import { resetLogin, setUsername, setPassword } from '../features/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Notification from './Notification'

const SignUpForm = ({ handleSignUp }) => {
  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)

  const dispatch = useDispatch()

  const handleLoginButton = () => {
    dispatch(resetLogin())
  }

  return (
    <div className='login center'>
      <h1>Sign Up</h1>
      <Notification />
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
          <div className="button-container">
            <Button variant='primary' type="submit">Sign Up</Button>
            <div>
              <Button variant='secondary' onClick={handleLoginButton}>
                Login
              </Button>
            </div>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SignUpForm