import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const randomIndex = (curr) => {
    let candidate = Math.floor(Math.random() * (anecdotes.length))
    while (candidate === curr) 
      candidate = Math.floor(Math.random() * (anecdotes.length))
    return candidate
  }
  const [selected, setSelected] = useState(randomIndex(-1))
  const [favorite, setFavorite] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (copy[selected] > copy[favorite]) setFavorite(selected)
    setVotes(copy) 
  }
 
  return (
    <>
    <h1>Anecdote of day</h1>
      <h4>
        {anecdotes[selected]}<br/>
        has {votes[selected]} votes<br/>
        <button onClick={addVote}>vote</button>
        <button onClick={() => setSelected(randomIndex(selected))}>next anecdote</button>
      </h4>
      <h1>anecdote with most votes</h1>
        <h4>{anecdotes[favorite]}<br/>
        has {votes[favorite]} votes</h4>
    </>
  )
}

export default App
