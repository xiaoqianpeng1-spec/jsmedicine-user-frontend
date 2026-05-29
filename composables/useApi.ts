import { useUserStore } from '~/stores/user'

export async function useApi(url: string, options: any = {}) {
  const userStore = useUserStore()
  
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }
  
  if (userStore.token && !headers.Authorization) {
    headers.Authorization = `Bearer ${userStore.token}`
  }
  
  const requestConfig = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  }
  
  try {
    const response = await fetch(`${baseUrl}${url}`, requestConfig)
    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.message || '请求失败')
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
