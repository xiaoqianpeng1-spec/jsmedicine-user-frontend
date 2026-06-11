import { useApi } from '~/composables/useApi'

export interface AppArticleResponse {
  id: number
  title: string
  summary: string
  coverUrl: string
  content: string
  authorName: string
  source: string
  tags: string[]
  viewCount: number
  favoriteCount: number
  favorited: boolean
  publishedAt: string
}

export interface PageResponseAppArticleResponse {
  records: AppArticleResponse[]
  total: number
  page: number
  size: number
}

export interface ApiResponsePageResponseAppArticleResponse {
  success: boolean
  code: string
  message: string
  data: PageResponseAppArticleResponse
}

export interface ApiResponseAppArticleResponse {
  success: boolean
  code: string
  message: string
  data: AppArticleResponse
}

export interface ArticleQueryParams {
  page: number
  size: number
  sort?: string
  keyword?: string
}

// 首页相关类型
export interface AppHomeItemResponse {
  id: number
  contentType: string
  contentTypeLabel: string
  targetId: number
  title: string
  subtitle: string
  summary: string
  coverUrl: string
  linkUrl: string
  sortOrder: number
}

export interface AppHomeSectionResponse {
  id: number
  categoryName: string
  categoryCode: string
  iconUrl: string
  description: string
  sortOrder: number
  items: AppHomeItemResponse[]
}

export interface AppHomeResponse {
  sections: AppHomeSectionResponse[]
}

export interface ApiResponseAppHomeResponse {
  success: boolean
  code: string
  message: string
  data: AppHomeResponse
}

export const contentApi = {
  // 分页查询资讯
  async getArticles(params: ArticleQueryParams): Promise<ApiResponsePageResponseAppArticleResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.keyword) queryParams.append('keyword', params.keyword)
    
    return useApi(`/api/v1/app/content/articles?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  // 获取资讯详情
  async getArticleDetail(id: number): Promise<ApiResponseAppArticleResponse> {
    return useApi(`/api/v1/app/content/articles/${id}`, {
      method: 'GET'
    })
  },

  // 获取首页聚合数据
  async getHome(): Promise<ApiResponseAppHomeResponse> {
    return useApi('/api/v1/app/home', {
      method: 'GET'
    })
  }
}
