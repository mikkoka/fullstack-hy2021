import React from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import NewComment from './NewComment'
import { Button, ListGroup } from 'react-bootstrap'
// import PropTypes from 'prop-types' poistettu kun nyt propseissa onkin blogs

const ListItem = ( { comment }) => {

  return (
    <ListGroup.Item>
      {comment}
    </ListGroup.Item>
  )


}


const Blog = ({ blogs, handleLike, setBlogs  }) => {
//handleRemove

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if (!blog) return null

  const createComment = ({ comment }) => {

    blogService
      .comment(id, { comment })
      .then(r => setBlogs(blogs.map(b => b.id === id ? r : b)))
      .catch((err) => { console.log(err) })
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} className='blog'>
      <div>
        <h3>{blog.title} <small className="textMuted">by {blog.author}</small></h3>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes <Button onClick={() => handleLike(blog.id)}>like</Button><br/>
        {`added by ${blog.user.name}`}
        <h4>comments </h4>
        <NewComment createComment={createComment} />
        <ListGroup variant="flush">
          {blog.comments.map(c =>
            <ListItem key={c} comment={c} />)}
        </ListGroup>
      </div>
    </div>
  )
}


export default Blog


