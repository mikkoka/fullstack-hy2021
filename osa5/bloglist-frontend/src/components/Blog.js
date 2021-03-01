import React, { useState } from 'react'

const Blog = ({ blog, likeHandler }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    setAddedLikes(addedLikes + 1)
    likeHandler({
      author: blog.author,
      url: blog.url,
      title: blog.title,
      likes: blog.likes + addedLikes + 1,
      user: blog.user.id,
      id: blog.id
    })
  }


  const [allVisible, setAllVisible ] = useState(false)
  const [ addedLikes, setAddedLikes ] = useState(0)

  const toggleVisibility = () => {
    setAllVisible (allVisible ? false : true )
  }
  if (allVisible) return (
    <div style={blogStyle}>
      {blog.title} {blog.author}  <button onClick={toggleVisibility}>hide</button>
      <br/>
      {blog.url}
      <br/>
      likes {blog.likes + addedLikes} <button className='likeButton' onClick={addLike}>like</button>
      <br/>
      {blog.author}
      <br/>
      {/* {(blog.user.id === user.id)
        ? <button onClick={deleteBlog}>delete this blog</button>
        : <div><div/>
        } */}
    </div>)
  else return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
    </div>

  )
}

export default Blog