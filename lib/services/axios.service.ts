import axios, { AxiosError } from 'axios'
import { SpotifyErrorType } from '../types/error.type'

const axiosClient = axios.create({
  adapter: require('axios/lib/adapters/http'),
})

axiosClient.interceptors.request.use((request) => {
  if (request.headers && !request.headers['Authorization']) {
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  }

  return request
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<SpotifyErrorType>) => {
    if (error.code === 'ERR_NETWORK') {
      throw error
    }

    throw {
      path: error.request?.path,
      method: error.request?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    }
  }
)

export default axiosClient
