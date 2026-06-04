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

export const topicsApi = {
  async getTopics(params: TopicQueryParams): Promise<ApiResponsePageResponseAppTopicResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.keyword) queryParams.append('keyword', params.keyword)
    
    return useApi(`/api/v1/app/learning/topics?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  async getTopicDetail(id: number): Promise<ApiResponseAppTopicResponse> {
    return useApi(`/api/v1/app/learning/topics/${id}`, {
      method: 'GET'
    })
  }
}
