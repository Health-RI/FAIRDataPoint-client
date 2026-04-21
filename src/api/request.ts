import axios from 'axios'
import config from '@/config'

const request = axios.create({
  baseURL: config.apiURL,
  headers: {
    Accept: 'application/json',
  },
})

// Add response interceptor for detailed logging
request.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config: reqConfig, response, message } = error
    console.error(
      `API Request Failed: ${reqConfig?.method?.toUpperCase()} ${reqConfig?.url || 'unknown'}`,
      {
        status: response?.status,
        statusText: response?.statusText,
        message,
        url: reqConfig?.baseURL,
        responseData: response?.data,
      },
    )
    return Promise.reject(error)
  },
)

export default request
