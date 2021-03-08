import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'


const AnecdoteList = (props) => {
  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state => state.anecdotes)
    .filter(a =>  a.content.toLowerCase()
    .includes(filter))
    .sort((a,b) => b.votes - a.votes)
  
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>{anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          {`has ${anecdote.votes} votes `}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}</div>
  )
}

export default AnecdoteList