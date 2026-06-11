import type { UseFetchOptions } from '#app'

const BASE_URL = ''

export function request<T = any>(url: string, options: UseFetchOptions<T> = {}) {
  const token = useCookie<string | null>('token')

  return $fetch<T>(url, {
    baseURL: BASE_URL,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    },
    onResponse({ response }) {
      const { data } = response
      if (data && (data as any).success !== undefined) {
        if ((data as any).success) {
          return (data as any).data
        }
        throw new Error((data as any).message || '请求失败')
      }
      return data
    },
    onResponseError({ response }) {
      const { status } = response
      switch (status) {
        case 401:
          const token = useCookie<string | null>('token')
          token.value = null
          navigateTo('/')
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
          console.error('请求失败:', response.statusText)
      }
    },
  })
}

export default request