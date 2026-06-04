import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  const api = axios.create({
    baseURL: config.public.apiBase || '',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 请求拦截器
  api.interceptors.request.use(
    (config) => {
      if (userStore.token) {
        config.headers.Authorization = `Bearer ${userStore.token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  api.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      if (error.response?.status === 401) {
        userStore.logout()
        navigateTo('/')
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api
    }
  }
})