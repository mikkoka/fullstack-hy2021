
const User = require('../moderls/user')

const userExtractor = (request, response, next) => {
  const user = await User.findOne({ username: body.username })
  request.user = user.id
  next()
  
}

module.exports = userExtractor