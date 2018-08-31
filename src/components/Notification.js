import React from 'react'

const Notification = ({ message, type }) => {
  if (type === 's') {
    return <p className="success">{message}</p>
  } else if (type === 'f') {
    return <p className="fail">{message}</p>
  } else {
    return null
  }
}

export default Notification