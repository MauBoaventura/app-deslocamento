import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DESLOCAMENTO_URL,

  headers: {
    'Content-Type': 'application/json'
  }
})
