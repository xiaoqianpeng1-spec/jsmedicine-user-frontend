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
  }
}
