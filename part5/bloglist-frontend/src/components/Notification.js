import PropTypes from 'prop-types'

const Notifiction = ({ message, messageType }) => {
  Notifiction.propTypes = {
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired
  }

  if (message === null) {
    return null
  }

  if (messageType === 'success') {
    return (
      <div className="notification success">
        {message}
      </div>
    )
  } else if (messageType === 'error') {
    return (
      <div className="notification error">
        {message}
      </div>
    )
  }

  return (
    <div className="notification">
      {message}
    </div>
  )


}

export default Notifiction