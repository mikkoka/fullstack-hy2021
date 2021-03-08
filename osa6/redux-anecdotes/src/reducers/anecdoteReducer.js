import anecdoteService from '../services/anecdoteService'
import { setNotification } from '../reducers/notificationReducer'

export const voteAnecdote = id => {

  return async dispatch => {

    const oldAnecdote = await anecdoteService.getAnecdote(id)
    const updatedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }    
    const resp = await anecdoteService.updateAnecdote(updatedAnecdote)
      
    dispatch({
      type: 'VOTE',
      data: resp
    })
    dispatch(setNotification(`You voted '${resp.content}'`, 5))
  }
}


export const addAnecdote = content => {

  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch ({
        type: 'ADD',
        data: newAnecdote
      })
      dispatch(setNotification(`You added '${content}'`, 5))
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
        type: 'INIT_ANECDOTES',
        data: anecdotes
      })
  }
}

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data
      return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)

    case 'ADD':
        return [...state, action.data]

    case 'INIT_ANECDOTES':
        return action.data

    default: return state
  }
}

export default reducer