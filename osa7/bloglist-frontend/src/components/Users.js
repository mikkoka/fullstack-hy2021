import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserRow = ( { name, blogCount, id, index, username } ) => {

  return(

    <tr>
      <th>{index+1}</th>
      <th><Link to={`/users/${id}`}>{name}</Link></th>
      <th>{blogCount}</th>
      <th>{username}</th>
    </tr>

  )
}

const Users = ({ users }) => {




  if (users)
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Blogs created</th>
            <th>username</th>
          </tr>
        </thead>
        <tbody>
          {users.sort((u1,u2) => u2.blogs.length - u1.blogs.length).map((user, i) =>
            <UserRow
              key={user.id}
              name={user.name}
              username={user.username}
              blogCount={user.blogs.length}
              id={user.id}
              index={i}
            />)}
        </tbody>
      </Table>
    )
  else return null
}




export default Users