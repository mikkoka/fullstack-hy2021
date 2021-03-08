// import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux' 

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    props.addAnecdote(newAnecdote)
    
    // dispatch(addAnecdote(newAnecdote))
   
  }
  return ( 
    <div>   
      <h2>create new</h2>   
      <form onSubmit={handleNewAnecdote}>
      <input name='newAnecdote' />
      <button type='submit'>create</button>
      </form>
    </div>  )
}


export default connect(
  null,
  { addAnecdote }
)(AnecdoteForm)

// export default AnecdoteForm