import { useUserStore } from '~/stores/user'

export async function useApi(url: string, options: any = {}) {
  const userStore = useUserStore()
  
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || ''
  
  const headers: any = {
    'Content-Type': 'application/json; charset=utf-8',
    ...(options.headers || {})
  }
  
  // 登录相关接口不自动添加 Authorization 头
  const isAuthRequest = url.includes('/auth/login') || url.includes('/auth/sms-login') || url.includes('/auth/sms-code')
  
  // 只有当用户有token，且没有在 options.headers 中显式设置 Authorization，且不是登录请求时才添加
  if (userStore.token && !(options.headers && 'Authorization' in options.headers) && !isAuthRequest) {
    headers.Authorization = `Bearer ${userStore.token}`
  }
  
  const requestConfig: any = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  }
  
  try {
    // 确保路径不会重复
    let fullUrl = url
    
    // 使用 Nuxt 代理（通过 /api/v1 前缀）
    // 代理配置在 nuxt.config.js 中：
    //   devProxy: { '/api/v1': { target: 'https://api-test.arez.cc.cd', ... } }
    if (baseUrl && !url.startsWith(baseUrl)) {
      fullUrl = `${baseUrl}${url}`
    }
    
    // 防止路径重复，移除所有重复的路径段
    const apiPattern = /(\/api\/v1){2,}/g
    fullUrl = fullUrl.replace(apiPattern, '/api/v1')
    
    const appPattern = /(\/app){2,}/g
    fullUrl = fullUrl.replace(appPattern, '/app')
    
    const authPattern = /(\/auth){2,}/g
    fullUrl = fullUrl.replace(authPattern, '/auth')
    
    // 确保路径格式正确（防止多个斜杠）
    fullUrl = fullUrl.replace(/\/{2,}/g, '/')
    
    console.log('[API Request] baseUrl:', baseUrl, 'url:', url, 'fullUrl:', fullUrl)
    const response = await fetch(fullUrl, requestConfig)
    console.log('[API Response Status]', response.status, response.statusText)
    
    // 处理 401 未授权错误（排除登录相关接口）
    if (response.status === 401 && !url.includes('/auth/login') && !url.includes('/auth/sms-login') && !url.includes('/auth/sms-code')) {
      console.warn('未授权访问，跳转到登录页')
      userStore.logout()
      // 在客户端跳转到登录页
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
      throw new Error('未授权，请登录')
    }
    
    // 尝试解析响应为 JSON，如果失败则处理为非 JSON 响应
    let data
    try {
      data = await response.json()
      console.log('[API Response Data]', data)
    } catch (parseError) {
      // 如果响应不是 JSON（比如 HTML 错误页面），返回错误信息
      console.error('[API Parse Error] Response is not valid JSON:', parseError)
      if (response.status >= 500) {
        throw new Error('服务器内部错误，请稍后重试')
      } else {
        throw new Error(`请求失败 (${response.status})`)
      }
    }
    
    if (!response.ok) {
      // 显示详细的错误信息
      const errorMsg = data.message || data.error || `请求失败 (${response.status})`
      console.error('[API Error Details]', {
        status: response.status,
        statusText: response.statusText,
        body: data
      })
      
      // 对于登录接口的401错误，返回更友好的错误消息
      if (response.status === 401 && (url.includes('/auth/login') || url.includes('/auth/sms-login'))) {
        throw new Error('用户名或密码错误，请重新输入')
      }
      
      throw new Error(errorMsg)
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
