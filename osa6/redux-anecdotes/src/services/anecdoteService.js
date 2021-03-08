import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'



const createNew = async (content) => {
  const obj = { content, votes: 0 }
  const resp = await axios.post(baseUrl, obj)
  return resp.data
}

const updateAnecdote = async (anecdote) => { 
  const url = `${baseUrl}/${anecdote.id}`
  const resp = await axios.put(url, anecdote)
  return resp.data
}

const getAnecdote = async id => {
  const url = `${baseUrl}/${id}`
  const resp = await axios.get(url)
  return resp.data
}

const getAll = async () => {
  const resp = await axios.get(baseUrl)
  return resp.data

  
}
const exportable = { getAll, getAnecdote, createNew, updateAnecdote }

export default exportable

