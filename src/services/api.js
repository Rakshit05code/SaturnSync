import axios from 'axios'
import { useAuthStore } from '../state/authStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      const authStore = useAuthStore.getState()
      authStore.logout()
      window.location.href = '/login'
    }

    if (error.response?.status === 403) {
      console.warn('Forbidden: insufficient permissions')
    }

    return Promise.reject({
      message: error.response?.data?.message || 'API Error',
      status: error.response?.status,
      data: error.response?.data,
    })
  },
)

// API methods for common operations
export const apiService = {
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
}

export default apiClient
