import { useApi } from '~/composables/useApi'

export const authApi = {
  async login(username: string, password: string) {
    return useApi('/api/v1/app/auth/login', {
      method: 'POST',
      body: { username, password }
    })
  },

  async smsLogin(mobile: string, code: string) {
    return useApi('/api/v1/app/auth/sms-login', {
      method: 'POST',
      body: { mobile, code }
    })
  },

  async sendSmsCode(mobile: string) {
    return useApi('/api/v1/app/auth/sms-code', {
      method: 'POST',
      body: { mobile }
    })
  },

  async wechatLogin(code: string, nickname?: string, avatarUrl?: string) {
    return useApi('/api/v1/app/auth/wechat-login', {
      method: 'POST',
      body: { code, nickname, avatarUrl }
    })
  },

  async logout(token: string) {
    return useApi('/api/v1/app/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  async checkStatus(token: string) {
    return useApi('/api/v1/app/auth/status', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  async getCurrentUser(token: string) {
    return useApi('/api/v1/app/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
