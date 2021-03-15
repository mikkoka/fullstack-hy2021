import React from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const UserBloglistItem = ( { blog }) => {

  return (
    <ListGroup.Item>
      {blog.title}
    </ListGroup.Item>
  )


}

const User= ({ users }) => {
  const id = useParams().id
  // const history = useHistory()
  const user = users ? users.find(u => u.id === id) : null


  if (user)
    return (
      <div>
        <h1>{user.name} </h1>
        <h4>Blogs added <small className="textMuted">by {user.name}</small></h4>
        <ListGroup variant="flush">
          {user.blogs.map(b => <UserBloglistItem
            blog={b}
            key={b.id} />)
          }
        </ListGroup>
      </div>
    )
  else {
    // history.push('/users')
    return <p>Error, not found</p>
  }
}

export default User