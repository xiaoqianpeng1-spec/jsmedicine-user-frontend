import { useApi } from '~/composables/useApi'

export interface AppExpertCategoryResponse {
  id: number
  parentId: number
  categoryName: string
  sortOrder: number
}

export interface ExpertExperienceResponse {
  id: number
  expertId: number
  experienceType: 'EDUCATION' | 'WORK' | 'ACHIEVEMENT'
  title: string
  description: string
  startDate: string
  endDate: string
  sortOrder: number
}

export interface AppExpertResponse {
  id: number
  realName: string
  gender: 'UNKNOWN' | 'MALE' | 'FEMALE'
  birthDate: string
  mobile: string
  avatarUrl: string
  coverUrl: string
  title: string
  organization: string
  specialty: string
  introduction: string
  consultationNotice: string
  sortOrder: number
  categoryIds: number[]
  experiences: ExpertExperienceResponse[]
}

export interface PageResponse<T> {
  records: T[]
  total: number
  page: number
  size: number
}

export interface ApiResponsePageResponseAppExpertCategoryResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppExpertCategoryResponse>
}

export interface ApiResponsePageResponseAppExpertResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppExpertResponse>
}

export interface ApiResponseAppExpertResponse {
  success: boolean
  code: string
  message: string
  data: AppExpertResponse
}

export interface ExpertCategoryQueryParams {
  page: number
  size: number
  keyword?: string
  parentId?: number
}

export interface ExpertQueryParams {
  page: number
  size: number
  keyword?: string
  categoryId?: number
}

export const expertsApi = {
  async getExpertCategories(params: ExpertCategoryQueryParams): Promise<ApiResponsePageResponseAppExpertCategoryResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.keyword) queryParams.append('keyword', params.keyword)
    if (params.parentId !== undefined) queryParams.append('parentId', params.parentId.toString())
    
    return useApi(`/api/v1/app/experts/categories?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  async getExperts(params: ExpertQueryParams): Promise<ApiResponsePageResponseAppExpertResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.keyword) queryParams.append('keyword', params.keyword)
    if (params.categoryId !== undefined) queryParams.append('categoryId', params.categoryId.toString())
    
    return useApi(`/api/v1/app/experts?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  async getExpertDetail(id: number): Promise<ApiResponseAppExpertResponse> {
    return useApi(`/api/v1/app/experts/${id}`, {
      method: 'GET'
    })
  },

  // 发起咨询
  async createQuestion(data: AppQaQuestionRequest): Promise<ApiResponseAppQaQuestionResponse> {
    return useApi('/api/v1/app/interaction/qa/questions', {
      method: 'POST',
      body: data
    })
  },

  // 我的咨询列表
  async getMyQuestions(params: MyQuestionsQueryParams): Promise<ApiResponsePageResponseAppQaQuestionResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    return useApi(`/api/v1/app/interaction/qa/questions?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  // 我的咨询详情
  async getQuestionDetail(id: number): Promise<ApiResponseAppQaQuestionResponse> {
    return useApi(`/api/v1/app/interaction/qa/questions/${id}`, {
      method: 'GET'
    })
  },

  // 提交反馈
  async submitFeedback(data: AppFeedbackRequest): Promise<ApiResponseFeedbackResponse> {
    return useApi('/api/v1/app/interaction/feedbacks', {
      method: 'POST',
      body: data
    })
  },

  // 收藏或取消收藏资源
  async toggleFavorite(data: AppFavoriteRequest): Promise<ApiResponseAppResourceInteractionResponse> {
    return useApi('/api/v1/app/interaction/favorites', {
      method: 'POST',
      body: data
    })
  }
}

// ===== 咨询问答相关类型 =====

export interface AppQaQuestionRequest {
  expertCategoryId?: number
  expertId?: number
  title: string
  content: string
}

export interface QaAnswerResponse {
  id: number
  questionId: number
  adminId: number
  expertId: number
  content: string
  answeredAt: string
}

export interface AppQaQuestionResponse {
  id: number
  expertCategoryId: number
  expertId: number
  title: string
  content: string
  status: 'PENDING' | 'ANSWERED' | 'CLOSED'
  statusCode: string
  statusLabel: string
  answers: QaAnswerResponse[]
}

export interface ApiResponseAppQaQuestionResponse {
  success: boolean
  code: string
  message: string
  data: AppQaQuestionResponse
}

export interface MyQuestionsQueryParams {
  page: number
  size: number
}

// PageResponse<T> 已在文件顶部定义，复用
export interface ApiResponsePageResponseAppQaQuestionResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppQaQuestionResponse>
}

// ===== 反馈相关类型 =====

export interface AppFeedbackRequest {
  feedbackType?: string
  content: string
  contact?: string
}

export interface FeedbackResponse {
  id: number
  userId: number
  studentId: number
  nickname: string
  avatarUrl: string
  mobile: string
  feedbackType: string
  content: string
  contact: string
  status: 'PENDING' | 'PROCESSED'
  processedBy: number
  processedAt: string
  processNote: string
  createdAt: string
}

export interface ApiResponseFeedbackResponse {
  success: boolean
  code: string
  message: string
  data: FeedbackResponse
}

// ===== 收藏相关类型 =====

export interface AppFavoriteRequest {
  resourceType: string    // 资源类型（如 ARTICLE, VIDEO, BOOK 等）
  resourceId: number      // 资源ID
  favorited: boolean      // true=收藏, false=取消收藏
}

export interface AppResourceInteractionResponse {
  resourceType: string
  resourceId: number
  browseCount: number
  favoriteCount: number
  favorited: boolean
}

export interface ApiResponseAppResourceInteractionResponse {
  success: boolean
  code: string
  message: string
  data: AppResourceInteractionResponse
}
