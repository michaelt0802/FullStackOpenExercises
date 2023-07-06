import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notification, dispatch] = useContext(NotificationContext)

  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return null
}

export default Notification
