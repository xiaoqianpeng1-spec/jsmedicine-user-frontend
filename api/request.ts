import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function setupInterceptors() {
  apiClient.interceptors.request.use(
    (config) => {
      const token = useCookie<string | null>('auth_token')
      if (token.value) {
        config.headers.Authorization = `Bearer ${token.value}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      const { data } = response
      if (data.success) {
        return data.data
      }
      return Promise.reject(new Error(data.message || '请求失败'))
    },
    (error: AxiosError) => {
      if (error.response) {
        const { status } = error.response
        switch (status) {
          case 401:
            const token = useCookie<string | null>('auth_token')
            token.value = null
            navigateTo('/login')
            break
          case 403:
            console.error('没有权限访问')
            break
          case 404:
            console.error('请求的资源不存在')
            break
          case 500:
            console.error('服务器错误')
            break
          default:
            console.error('请求失败:', error.message)
        }
      }
      return Promise.reject(error)
    }
  )
}

export function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return apiClient.request<any, T>(config)
}

export default apiClient
