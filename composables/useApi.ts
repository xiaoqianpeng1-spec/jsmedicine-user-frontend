import { useUserStore } from '~/stores/user'

export async function useApi(url: string, options: any = {}) {
  const userStore = useUserStore()
  
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || ''
  
  const headers: any = {
    'Content-Type': 'application/json',
    ...options.headers
  }
  
  if (userStore.token && !headers.Authorization) {
    headers.Authorization = `Bearer ${userStore.token}`
  }
  
  const requestConfig: any = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  }
  
  try {
    const fullUrl = baseUrl ? `${baseUrl}${url}` : url
    console.log('[API Request]', fullUrl, requestConfig)
    const response = await fetch(fullUrl, requestConfig)
    console.log('[API Response Status]', response.status, response.statusText)
    const data = await response.json()
    console.log('[API Response Data]', data)
    
    if (!response.ok) {
      throw new Error(data.message || `请求失败 (${response.status})`)
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
