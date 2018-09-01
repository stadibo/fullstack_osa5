import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Meny from './Meny'
import User from './User'

const UserView = ({ user, users, logout }) => {
  return user
    ? (
      <div>
        <Meny user={user} logout={logout} />
        <div>
          <h2>Users</h2>
          <table>
            <thead>
              <td><strong>Name</strong></td>
              <td><strong>Blogs added</strong></td>
            </thead>
            <tbody>
              {users.map(user => <User key={user.id} user={user} />)}
            </tbody>
          </table>
        </div>
      </div>
    )
    : <Redirect to="/login" />
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.loggedIn
  }
}

export default connect(
  mapStateToProps
)(UserView)