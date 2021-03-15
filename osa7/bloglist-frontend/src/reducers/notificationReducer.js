

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'ERROR':
    return action.message

  case 'SUCCESS':
    state // eslint
    return action.message
  }
}


export const notify = (message, type='SUCCESS') => {

  return ({
    type: type,
    message: message
  })

}

export default notificationReducer