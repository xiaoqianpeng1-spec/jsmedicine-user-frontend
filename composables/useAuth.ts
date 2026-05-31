import { ref, computed } from 'vue'
import type { CurrentAppUserResponse } from '~/api/types'

export function useAuth() {
  const token = useCookie<string | null>('auth_token')
  const user = ref<CurrentAppUserResponse | null>(null)
  const loading = ref(false)

  const isLoggedIn = computed(() => !!token.value)

  async function loginWithCredentials(username: string, password: string) {
    loading.value = true
    try {
      const { login } = await import('~/api')
      const result = await login({ username, password })
      token.value = result.accessToken
      await fetchCurrentUser()
      return result
    } finally {
      loading.value = false
    }
  }

  async function loginWithSms(mobile: string, code: string) {
    loading.value = true
    try {
      const { smsLogin } = await import('~/api')
      const result = await smsLogin({ mobile, code })
      token.value = result.accessToken
      await fetchCurrentUser()
      return result
    } finally {
      loading.value = false
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) return
    try {
      const { getCurrentUser } = await import('~/api')
      user.value = await getCurrentUser()
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  async function logout() {
    try {
      const { logout: apiLogout } = await import('~/api')
      await apiLogout()
    } finally {
      token.value = null
      user.value = null
      navigateTo('/login')
    }
  }

  return {
    token,
    user,
    loading,
    isLoggedIn,
    loginWithCredentials,
    loginWithSms,
    fetchCurrentUser,
    logout,
  }
}
