import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const loginCall = async (password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, { password })
  return response.data
}
