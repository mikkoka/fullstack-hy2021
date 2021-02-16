
import axios from 'axios'


const baseUrl = 'http://localhost:3001/api/persons'


const getAll = () => {
  return axios
    .get(baseUrl)
    .then(resp => resp.data)  
}

const post = newPerson => {
  return axios
    .post(baseUrl, newPerson)
    .then(resp => {
      return resp.data
    })
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (updatedPerson) => {
  const id = updatedPerson.id
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then(resp => resp.data)
}

const toExp = { getAll, post, deletePerson, updatePerson }

export default toExp 