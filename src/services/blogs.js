import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = (id, newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const request = axios.put(`${baseUrl}/${id}`, newBlog, config)
  return request.then(response => response.data)
}

const remove = (id, newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const request = axios.delete(`${baseUrl}/${id}`, newBlog, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove, setToken }