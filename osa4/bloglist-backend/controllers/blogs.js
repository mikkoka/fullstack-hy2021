const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {

  const allBlogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(allBlogs)
    
})

blogsRouter.post('/', async (request, response) => {
  

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.body.user)

  let blogJSON = request.body
  blogJSON.likes = blogJSON.likes ? blogJSON.likes : 0
  

  try {

    const blog = new Blog(blogJSON)
    const result = await blog.save()
    response.status(201).json(result)

    try {
      user.blogs = user.blogs.concat(result.id)
      await user.save()
    } catch (e) {
      console.log(e)
    }

  } catch (err) {
    console.log(err);
    
    response.status(400).end()
  
  }

  

})



blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  
  const blog  = await Blog.findByIdAndRemove(id)

  if (blog) response.status(204).end()

  else response.status(500).send({ error: "delete failed" })

})

blogsRouter.put('/:id', async (request, response) => {
  const receivedBlog = request.body
  
  const  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, receivedBlog, { new: true })
  response.json(updatedBlog)

})

module.exports = blogsRouter;