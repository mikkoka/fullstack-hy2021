
const User = require('../moderls/user')

const userExtractor = (request, response, next) => {
  const user = await User.findOne({ username: body.username })
  //console.log('auth: ', authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
  
}

module.exports = userExtractor