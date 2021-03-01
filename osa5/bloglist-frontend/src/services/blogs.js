import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`

}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newEntry) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newEntry, config)
  return response.body


}

const updateLikes = async (blog) => {

  const config = {
    headers: { Authorization: token },
  }
  const resourceId = `${baseUrl}/${blog.id}`
  const result = await axios.put(resourceId, blog, config)
  return result.data



}

export default { getAll, create, setToken, updateLikes }