
let timeoutID = null
const reducer = (state = '', action) => {

  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return ''
    default: return state
  }

}

export const setNotification = (msg, sec) => {
  clearTimeout(timeoutID)

  return async dispatch => {

    dispatch({
        type: 'SET_NOTIFICATION',
        notification: msg
      })

    timeoutID = setTimeout(() => dispatch({
      type: 'SET_NOTIFICATION',
      notification: ''
    }), sec*1000)

  }
  
}

export default reducer