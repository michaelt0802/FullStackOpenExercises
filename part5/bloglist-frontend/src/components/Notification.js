import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
// import { setMessage, reset } from '../features/counter/notificationSlice'

const Notifiction = () => {
  const { message, messageType } = useSelector((state) => state.notification)

  if (message === null) {
    return null
  }


  if (messageType === 'success') {
    return <Alert variant='success'>{message}</Alert>
  } else if (messageType === 'error') {
    return <Alert variant='danger'>{message}</Alert>
  }

  return <div className="notification">{message}</div>
}

export default Notifiction

