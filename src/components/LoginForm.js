import React from 'react'
import Notification from './Notification'
import InputField from './InputField'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => (
  <div>
    <h2>Login to view blogs</h2>

    <Notification />

    <form onSubmit={handleSubmit} className="loginForm">
      <table>
        <tbody>
          <InputField
            type="text"
            name={"username"}
            id="Username"
            value={username}
            onChange={handleChange}
          />

          <InputField
            type="password"
            name="password"
            id="Password"
            value={password}
            onChange={handleChange}
          />
        </tbody>
      </table>
      <input
        type="submit"
        value="LOGIN"
        name="submitUser"
      />
    </form>
  </div>
)

export default LoginForm