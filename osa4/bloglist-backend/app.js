const express = require('express')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./utils/tokenExtractor')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
})
.then(logger.info('Connected to MongoDB'))
.catch ((err) => {
  logger.info(`db connection failed: ${err}`)
})

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


module.exports = app

