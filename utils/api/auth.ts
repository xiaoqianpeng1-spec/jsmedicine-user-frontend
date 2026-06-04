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
    return useApi('/api/v1/app/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  async updateUserInfo(token: string, userData: any) {
    return useApi('/api/v1/app/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: userData
    })
  },

  async uploadAvatar(token: string, formData: FormData) {
    return useApi('/api/v1/app/profile/upload/avatar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
  },

  async checkAvatar(token: string, fileName: string, fileSize: number, fileMd5: string) {
    return useApi('/api/v1/app/profile/check/certificate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: { fileName, fileSize, fileMd5 }
    })
  },

  async getCertificateList(token: string) {
    return useApi('/api/v1/app/profile/certificate/list', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  async submitCertificate(token: string, certificateData: any) {
    return useApi('/api/v1/app/profile/certificate/submit', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: certificateData
    })
  },

  async getCertificateDetail(token: string, certificateId: string) {
    return useApi(`/api/v1/app/profile/certificate/detail/${certificateId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  async applyCertificate(token: string, certificateData: any) {
    return useApi('/api/v1/app/profile/certificate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: certificateData
    })
  },

  async getProfileSummary(token: string) {
    return useApi('/api/v1/app/profile/summary', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  // 获取微信扫码配置
  async getWechatWebQrConfig() {
    return useApi('/api/v1/app/auth/wechat-web/qr-config', {
      method: 'GET'
    })
  },

  // 微信扫码登录
  async wechatWebLogin(code: string, state: string) {
    return useApi('/api/v1/app/auth/wechat-web/login', {
      method: 'POST',
      body: { code, state }
    })
  }
}