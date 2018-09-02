import React from 'react'
import { connect } from 'react-redux'
import Meny from './Meny'
import User from './User'

const UserView = ({ user, users, logout }) => {
  console.log('users', user)
  return (<div>
      <Meny user={user} logout={logout} />
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Blogs added</td>
            </tr>
          </thead>
          <tbody>
            {users.map(user => <User key={user.id} user={user} />)}
          </tbody>
        </table>
      </div>
    </div>)
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