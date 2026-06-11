import { useApi } from '~/composables/useApi'

// 个人资料响应
export interface AppProfileResponse {
  id: number
  username: string
  mobile: string
  email: string
  nickname: string
  profileSignature: string
  avatarUrl: string
  authProvider: string
  gender: 'UNKNOWN' | 'MALE' | 'FEMALE'
  status: 'DISABLED' | 'ENABLED'
  profileCompleted: boolean
  studentId: number
  certificationStatus: 'UNSUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED'
}

// 个人资料更新请求
export interface AppProfileUpdateRequest {
  nickname?: string
  profileSignature?: string
  avatarUrl?: string
  email?: string
  gender?: 'UNKNOWN' | 'MALE' | 'FEMALE'
}

// 个人资料响应包装
export interface ApiResponseAppProfileResponse {
  success: boolean
  code: string
  message: string
  data: AppProfileResponse
}

// 头像上传请求
export interface AppAvatarUploadRequest {
  originalName: string
  contentType: string
  fileSize: number
}

// 头像上传响应
export interface AppAvatarUploadResponse {
  method: string
  uploadUrl: string
  bucketName: string
  objectKey: string
  contentType: string
  fileSize: number
  expiresAt: string
}

// 头像上传响应包装
export interface ApiResponseAppAvatarUploadResponse {
  success: boolean
  code: string
  message: string
  data: AppAvatarUploadResponse
}

// 头像确认请求
export interface AppAvatarConfirmRequest {
  objectKey: string
  originalName?: string
}

// 学员认证文件请求
export interface AppStudentCertificationFileRequest {
  fileAssetId?: number
  sourceUrl?: string
  materialType?: string
  sortOrder?: number
}

// 学员认证请求
export interface AppStudentCertificationRequest {
  realName: string
  mobile?: string
  idCardNo?: string
  province?: string
  provinceCode?: string
  city?: string
  cityCode?: string
  district?: string
  districtCode?: string
  organization?: string
  organizationId?: number
  positionTitle?: string
  practiceTypeId?: number
  certificationMaterials?: string
  certificationFiles?: AppStudentCertificationFileRequest[]
}

// 学员认证文件响应
export interface AppStudentCertificationFileResponse {
  id: number
  fileAssetId?: number
  sourceUrl?: string
  materialType?: string
  sortOrder?: number
}

// 学员认证响应
export interface AppStudentCertificationResponse {
  studentId: number
  studentNo?: string
  realName?: string
  mobile?: string
  province?: string
  provinceCode?: string
  city?: string
  cityCode?: string
  district?: string
  districtCode?: string
  organization?: string
  organizationId?: number
  positionTitle?: string
  practiceTypeId?: number
  status: 'DISABLED' | 'ENABLED'
  certificationStatus: 'UNSUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED'
  certificationSubmittedAt?: string
  certificationReviewedAt?: string
  rejectReason?: string
  certificationMaterials?: string
  certificationFiles?: AppStudentCertificationFileResponse[]
  enrolledAt?: string
}

// 学员认证响应包装
export interface ApiResponseAppStudentCertificationResponse {
  success: boolean
  code: string
  message: string
  data: AppStudentCertificationResponse
}

// 收藏记录响应
export interface AppResourceRecordResponse {
  id: number
  resourceType: string
  resourceId: number
  source: string
  viewCount: number
  occurredAt: string
}

// 分页响应
export interface PageResponseAppResourceRecordResponse {
  records: AppResourceRecordResponse[]
  total: number
  page: number
  size: number
}

// 分页响应包装
export interface ApiResponsePageResponseAppResourceRecordResponse {
  success: boolean
  code: string
  message: string
  data: PageResponseAppResourceRecordResponse
}

export const authApi = {
  async login(username: string, password: string) {
    return useApi('/api/v1/app/auth/login', {
      method: 'POST',
      body: { username, password },
      headers: { Authorization: '' }  // 显式清空，避免带上旧token
    })
  },

  async smsLogin(mobile: string, code: string) {
    return useApi('/api/v1/app/auth/sms-login', {
      method: 'POST',
      body: { mobile, code },
      headers: { Authorization: '' }  // 显式清空，避免带上旧token
    })
  },

  async sendSmsCode(mobile: string) {
    return useApi('/api/v1/app/auth/sms-code', {
      method: 'POST',
      body: { mobile },
      headers: { Authorization: '' }  // 显式清空，避免带上旧token
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

// 个人资料API
export const profileApi = {
  // 获取个人资料
  async getProfile(): Promise<ApiResponseAppProfileResponse> {
    return useApi('/api/v1/app/profile', {
      method: 'GET'
    })
  },

  // 更新个人资料
  async updateProfile(data: AppProfileUpdateRequest): Promise<ApiResponseAppProfileResponse> {
    return useApi('/api/v1/app/profile', {
      method: 'PUT',
      body: data
    })
  },

  // 申请头像上传地址
  async applyAvatarUploadUrl(request: AppAvatarUploadRequest): Promise<ApiResponseAppAvatarUploadResponse> {
    return useApi('/api/v1/app/profile/avatar/upload-url', {
      method: 'POST',
      body: request
    })
  },

  // 确认头像上传
  async confirmAvatarUpload(request: AppAvatarConfirmRequest): Promise<ApiResponseAppProfileResponse> {
    return useApi('/api/v1/app/profile/avatar/confirm', {
      method: 'POST',
      body: request
    })
  },

  // 查询学员认证结果
  async getCertification(): Promise<ApiResponseAppStudentCertificationResponse> {
    return useApi('/api/v1/app/profile/certification', {
      method: 'GET'
    })
  },

  // 查询我的收藏
  async getFavorites(page: number, size: number, sort?: string): Promise<ApiResponsePageResponseAppResourceRecordResponse> {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    params.set('size', size.toString())
    if (sort) {
      params.set('sort', sort)
    }
    return useApi(`/api/v1/app/profile/favorites?${params.toString()}`, {
      method: 'GET'
    })
  },

  // 查询浏览记录
  async getBrowseHistories(page: number, size: number, sort?: string): Promise<ApiResponsePageResponseAppResourceRecordResponse> {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    params.set('size', size.toString())
    if (sort) {
      params.set('sort', sort)
    }
    return useApi(`/api/v1/app/profile/browse-histories?${params.toString()}`, {
      method: 'GET'
    })
  },

  // 提交学员认证申请
  async submitCertification(request: AppStudentCertificationRequest): Promise<ApiResponseAppStudentCertificationResponse> {
    return useApi('/api/v1/app/profile/certification', {
      method: 'POST',
      body: request
    })
  }
}