import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
