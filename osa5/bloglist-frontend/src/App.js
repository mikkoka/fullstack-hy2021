import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const successStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState()
  const [ notificationStyle, setNotificationStyle ] = useState(successStyle)
  const createFormRef = useRef()
  const likeHandler = async blog => {
    await blogService.updateLikes(blog)
  }
  const deleteHandler = async blog => {
    await blogService.deleteBlog(blog)
  }


  // const errorStyle = {
  //   color: 'red',
  //   background: 'lightgrey',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // }



  const notify = (msg, style) => {
    console.log(`notifying ${msg}`)
    setNotificationMessage(msg)
    setNotificationStyle(style)

    setTimeout(() => {
      setNotificationMessage('')
      setNotificationStyle(null)
    }, 5000)
  }

  const handleLogin = async () => {
    try {
      const u = await loginService.login({
        username,
        password,
      })
      console.log(u)
      setUser(u)
      blogService.setToken(u.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(u)
      )

    } catch(err) {
      console.log(err)
    }
    setUsername('')
    setPassword('')
  }

  const handleNewBlog = async (newBlog) => {

    const resp = await blogService.create(newBlog)
    //debugger // eslint-disable-line no-debugger
    notify(`New blog ${resp.title} by ${resp.author} added.`, successStyle)

  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  if (!user)
  {
    return (
      <div>
        <h2>log into application</h2>
        <Login
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}>
        </Login>
      </div>
    )}
  else return (
    <div>
      {notificationMessage ? <p style={notificationStyle}>{notificationMessage}</p>
        : <div></div>
      }
      <h4>{user.name} logged in</h4>
      <h2>Blogs</h2>
      <Togglable buttonLabel="new blog" ref={createFormRef}>

        <CreateForm handleNewBlog={handleNewBlog}
        />

      </Togglable>

      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={likeHandler}
            deleteHandler={deleteHandler}
            user={user}/>
        )}


    </div>
  )
}


const Login = ( { setPassword, setUsername, handleLogin } ) => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <br/>
        <input
          type="text"
          name="passWord"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br/>
        <button
          onClick={handleLogin}
          type="button">Login
        </button>
      </form>
    </div>
  )}

export default App