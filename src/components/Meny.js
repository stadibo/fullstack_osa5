import React from 'react'
import { Link } from 'react-router-dom'

const Meny = (props) => {
  return (
    <div>
      <Link to="/blogs">Blogs</Link> &nbsp;
      <Link to="/users">Users</Link> &nbsp;
      {props.user
        && (<span>
          <label htmlFor="logout"><strong>{props.user.name}</strong> logged in</label>
          <input id="logout" value="LOGOUT" type="button" onClick={props.logout} />
        </span>)
      }
    </div>
  )
}

export default Meny