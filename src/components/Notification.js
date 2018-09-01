import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.status === 's') {
    return <p className="success">{props.message}</p>
  } else if (props.status === 'f') {
    return <p className="fail">{props.message}</p>
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    status: state.notification.status
  }
}

export default connect(
  mapStateToProps
)(Notification)