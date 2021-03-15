import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


const Menu = ({ user, handleLogout }) => {

  const padding = {
    paddingRight: 5,
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
  console.log(user)
  const userText = user ? `${user.name} logged in` : ''

  return (
    <div>
      <li><Link to='/' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link> {userText}</li>
      {user&&(
        <>{user.name} logged in <Button onClick={handleLogout}>logout</Button></>
      )}
      {/* user ? {user.name} logged in <button onClick={handleLogout}>logout</button> : <div></div> */}
    </div>
  )
}

export default Menu