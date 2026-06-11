import { useApi } from '~/composables/useApi'

export interface AppTopicItemResponse {
  id: number
  topicId: number
  itemType: string
  itemId: number
  sortOrder: number
  resource: Record<string, any>
}

export interface AppTopicResponse {
  id: number
  title: string
  summary: string
  learningRequirements: string
  coverUrl: string
  viewCount: number
  publishedAt: string
  favoriteCount: number
  favorited: boolean
  items: AppTopicItemResponse[]
}

// 专题详情响应（新格式）
export interface AppTopicSectionResponse {
  sectionType: string
  sectionLabel: string
  total: number
  hasMore: boolean
  items: AppTopicResourceCardResponse[]
}

export interface AppTopicDetailResponse {
  id: number
  title: string
  summary: string
  learningRequirements: string
  coverUrl: string
  tags: string[]
  viewCount: number
  publishedAt: string
  favoriteCount: number
  favorited: boolean
  sections: AppTopicSectionResponse[]
}

export interface ApiResponseAppTopicDetailResponse {
  success: boolean
  code: string
  message: string
  data: AppTopicDetailResponse
}

export interface PageResponse<T> {
  records: T[]
  total: number
  page: number
  size: number
}

export interface ApiResponsePageResponseAppTopicResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppTopicResponse>
}

export interface ApiResponseAppTopicResponse {
  success: boolean
  code: string
  message: string
  data: AppTopicResponse
}

export interface TopicQueryParams {
  page: number
  size: number
  sort?: string
  keyword?: string
}

// 专题卡片响应（新格式）
export interface AppTopicCardResponse {
  id: number
  title: string
  summary: string
  learningRequirements: string
  coverUrl: string
  tags: string[]
  viewCount: number
  publishedAt: string
  favoriteCount: number
  favorited: boolean
}

export interface PageResponseAppTopicCardResponse {
  records: AppTopicCardResponse[]
  total: number
  page: number
  size: number
}

export interface ApiResponsePageResponseAppTopicCardResponse {
  success: boolean
  code: string
  message: string
  data: PageResponseAppTopicCardResponse
}

// 专题资源卡片响应
export interface AppTopicResourceCardResponse {
  resourceType: string
  resourceTypeLabel: string
  resourceId: number
  title: string
  subtitle: string
  coverUrl: string
  tags: string[]
  browseCount: number
  favoriteCount: number
  favorited: boolean
  progressPercent: number
  studySeconds: number
}

export interface PageResponseAppTopicResourceCardResponse {
  records: AppTopicResourceCardResponse[]
  total: number
  page: number
  size: number
}

export interface ApiResponsePageResponseAppTopicResourceCardResponse {
  success: boolean
  code: string
  message: string
  data: PageResponseAppTopicResourceCardResponse
}

export interface TopicSectionQueryParams {
  page: number
  size: number
}

export const topicsApi = {
  async getTopics(params: TopicQueryParams): Promise<ApiResponsePageResponseAppTopicCardResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.keyword) queryParams.append('keyword', params.keyword)
    
    return useApi(`/api/v1/app/learning/topics?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  async getTopicDetail(id: number): Promise<ApiResponseAppTopicDetailResponse> {
    return useApi(`/api/v1/app/learning/topics/${id}`, {
      method: 'GET'
    })
  },

  // 分页查询专题分区内容
  async getTopicSections(
    id: number, 
    sectionType: string, 
    params: TopicSectionQueryParams
  ): Promise<ApiResponsePageResponseAppTopicResourceCardResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    
    return useApi(`/api/v1/app/learning/topics/${id}/sections/${sectionType}?${queryParams.toString()}`, {
      method: 'GET'
    })
  }
}
