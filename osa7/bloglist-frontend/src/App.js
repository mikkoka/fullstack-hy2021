import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
// import Menu from './components/Menu'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import storage from './utils/storage'

import { notify } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
// import BlogListItem from './components/BlogListItem'
import { Navbar, Nav, Button, ListGroup } from 'react-bootstrap'

const BloglistItem = ({ blog }) => {

  return (
    <ListGroup.Item>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </ListGroup.Item>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState(null)
  const notification = useSelector(state => state)
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {

    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (message, type='success') => {

    dispatch(notify({
      message, type
    }))
    setTimeout(() => {
      dispatch(notify(null))
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div className="container">
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes


  return (
    <div className="container">
      <Menu
        user={user}
        handleLogout={handleLogout}
      />

      <h2>blogs app</h2>

      <Notification notification={notification} />

      <Switch >

        <Route path="/users/:id">
          <User users={users}/>
        </Route>

        <Route path="/users">
          <h2>Users</h2>
          <Users users={users}/>
        </Route>

        <Route path="/blogs/:id">
          <Blog
            blogs={blogs}
            handleLike={handleLike}
            handleRemove={handleRemove}
            setBlogs={setBlogs} />
        </Route>

        <Route path="/">
          <Togglable
            buttonLabel='create new blog'
            ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>

          {blogs.sort(byLikes).map(blog =>
            <BloglistItem
              key={blog.id}
              blog={blog}
            />
          )}

        </Route>

      </Switch>

    </div>
  )
}


const Menu = ({ user, handleLogout }) => {

  const padding = {
    paddingRight: 8,

  }
  const userText = user ? `${user.name} logged in` : ''

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <span style={padding}>{userText}</span>
            <Button style={padding} variant="secondary" onClick={handleLogout}>logout</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  )
}



export default App

