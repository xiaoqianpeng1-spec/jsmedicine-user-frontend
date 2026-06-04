import { useApi } from '~/composables/useApi'

export interface AppBookChapterResponse {
  id: number
  bookId: number
  parentId: number
  chapterTitle: string
  content: string
  startPage: number
  pageCount: number
  paperId: number
  sortOrder: number
}

export interface AppBookResponse {
  id: number
  categoryId: number
  bookName: string
  author: string
  publisher: string
  coverUrl: string
  introduction: string
  totalPages: number
  paperId: number
  publishedAt: string
  browseCount: number
  favoriteCount: number
  favorited: boolean
  progressPercent: number
  studySeconds: number
  chapters: AppBookChapterResponse[]
}

export interface ApiResponseAppBookResponse {
  success: boolean
  code: string
  message: string
  data: AppBookResponse
}

export interface ApiResponseAppBookChapterResponse {
  success: boolean
  code: string
  message: string
  data: AppBookChapterResponse
}

export interface AppBookCategoryResponse {
  id: number
  parentId: number
  categoryName: string
  sortOrder: number
}

export interface PageResponse<T> {
  records: T[]
  total: number
  page: number
  size: number
}

export interface ApiResponsePageResponseAppBookCategoryResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppBookCategoryResponse>
}

export interface BookCategoryQueryParams {
  page: number
  size: number
  sort?: string
  keyword?: string
  parentId?: number
}

export interface ApiResponsePageResponseAppBookResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppBookResponse>
}

export interface BookQueryParams {
  page: number
  size: number
  sort?: string
  keyword?: string
  categoryId?: number
}

export const booksApi = {
  async getBookDetail(id: number): Promise<ApiResponseAppBookResponse> {
    return useApi(`/api/v1/app/learning/books/${id}`, {
      method: 'GET'
    })
  },

  async getChapterDetail(bookId: number, chapterId: number): Promise<ApiResponseAppBookChapterResponse> {
    return useApi(`/api/v1/app/learning/books/${bookId}/chapters/${chapterId}`, {
      method: 'GET'
    })
  },

  async getBookCategories(params: BookCategoryQueryParams): Promise<ApiResponsePageResponseAppBookCategoryResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.keyword) queryParams.append('keyword', params.keyword)
    if (params.parentId !== undefined) queryParams.append('parentId', params.parentId.toString())
    
    return useApi(`/api/v1/app/learning/book-categories?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  async getBooks(params: BookQueryParams): Promise<ApiResponsePageResponseAppBookResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.keyword) queryParams.append('keyword', params.keyword)
    if (params.categoryId !== undefined) queryParams.append('categoryId', params.categoryId.toString())
    
    return useApi(`/api/v1/app/learning/books?${queryParams.toString()}`, {
      method: 'GET'
    })
  }
}
