import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookie } from 'nuxt/app'
import { authApi } from '~/utils/api/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const isLoggedIn = ref(false)
  const userInfo = ref({
    id: '',
    username: '',
    nickname: '',
    mobile: '',
    avatar: '',
    role: '',
    motto: '',
    gender: '',
    education: '',
    city: '',
    company: ''
  })

  const tokenCookie = useCookie('token', { maxAge: 86400 })

  // 字段映射：后端字段 -> 前端字段
  const mapUserFields = (data: any) => {
    return {
      id: data.id || data.userId || '',
      username: data.username || data.userName || data.loginName || '',
      nickname: data.nickname || data.nickName || data.name || '',
      mobile: data.mobile || data.phone || data.tel || '',
      avatar: data.avatar || data.avatarUrl || data.avatar_url || '',
      role: data.role || data.roleName || '',
      motto: data.motto || data.signature || '',
      gender: data.gender || '',
      education: data.education || data.edu || '',
      city: data.city || '',
      company: data.company || data.orgName || ''
    }
  }

  const login = async (newToken: string, userData?: any) => {
    token.value = newToken
    isLoggedIn.value = true
    tokenCookie.value = newToken
    
    if (userData) {
      const mappedData = mapUserFields(userData)
      updateUserInfo(mappedData)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout(token.value)
    } catch (err) {
      console.error('Logout failed:', err)
    }
    
    token.value = ''
    isLoggedIn.value = false
    userInfo.value = {
      id: '',
      username: '',
      nickname: '',
      mobile: '',
      avatar: '',
      role: '',
      motto: '',
      gender: '',
      education: '',
      city: '',
      company: ''
    }
    tokenCookie.value = null
  }

  const updateUserInfo = (info: any) => {
    userInfo.value = {
      ...userInfo.value,
      ...info
    }
  }

  const loadFromCookie = () => {
    const savedToken = tokenCookie.value
    if (savedToken) {
      token.value = savedToken
      isLoggedIn.value = true
    }
  }

  const fetchUserInfo = async () => {
    if (!token.value) return
    
    try {
      const response = await authApi.getCurrentUser(token.value)
      if (response.data) {
        const mappedData = mapUserFields(response.data)
        updateUserInfo(mappedData)
      }
    } catch (err) {
      console.error('Failed to fetch user info:', err)
    }
  }

  return {
    token,
    isLoggedIn,
    userInfo,
    login,
    logout,
    updateUserInfo,
    loadFromCookie,
    fetchUserInfo
  }
}, {
  persist: true // 开启持久化，刷新页面数据不丢失
})