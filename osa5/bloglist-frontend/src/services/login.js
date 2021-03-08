import axios from 'axios'
// const baseUrl = '/api/login'

const login = async credentials => {
  console.log('creds' ,credentials)

  const response = axios.post('http://localhost:3003/api/login/', credentials)
  console.log(response.data) // ALWAYS 'undefined'!!!
  return response.data

  // return {
  //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1haGFrYXMiLCJpZCI6IjYwMzQwZTJkOTgzNWZlZjQ5MWI2N2ZkOCIsImlhdCI6MTYxNDM0NDY3M30._3Tqov_2DTk6jGSpBmCYshOpA11jJLSSKWCqW-r5hUQ',
  //   username: 'Mahakas',
  //   name: 'Mikko Mahakas'
  // }

}

export default { login }