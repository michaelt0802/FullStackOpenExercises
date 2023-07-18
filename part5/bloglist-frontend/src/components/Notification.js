import { useSelector } from 'react-redux'
// import { setMessage, reset } from '../features/counter/notificationSlice'

// const Notifiction = ({ message, messageType }) => {
const Notifiction = () => {
  const { message, messageType } = useSelector((state) => state.notification)

  if (message === null) {
    return null
  }

  if (messageType === 'success') {
    return <div className="notification success">{message}</div>
  } else if (messageType === 'error') {
    return <div className="notification error">{message}</div>
  }

  return <div className="notification">{message}</div>
}

export default Notifiction

