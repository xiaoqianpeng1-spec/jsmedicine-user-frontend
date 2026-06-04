import { useApi } from '~/composables/useApi'

export interface AppExamQuestionOptionResponse {
  id: number
  optionKey: string
  optionContent: string
  sortOrder: number
}

export interface AppExamQuestionResponse {
  questionId: number
  questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER'
  title: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  score: number
  sortOrder: number
  options: AppExamQuestionOptionResponse[]
}

export interface AppExamPaperResponse {
  id: number
  paperName: string
  description: string
  totalScore: number
  passScore: number
  durationMinutes: number
  status: 'DISABLED' | 'ENABLED'
  questions: AppExamQuestionResponse[]
}

export interface AppExamAnswerResultResponse {
  questionId: number
  questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER'
  title: string
  answerContent: string
  correctAnswer: string
  analysis: string
  score: number
  correct: number
  options: AppExamQuestionOptionResponse[]
}

export interface AppExamRecordResponse {
  id: number
  studentId: number
  paperId: number
  paperName: string
  sourceType: string
  sourceId: number
  score: number
  passed: number
  startedAt: string
  submittedAt: string
  answers: AppExamAnswerResultResponse[]
}

export interface PageResponse<T> {
  records: T[]
  total: number
  page: number
  size: number
}

export interface ApiResponsePageResponseAppExamPaperResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppExamPaperResponse>
}

export interface ApiResponseAppExamPaperResponse {
  success: boolean
  code: string
  message: string
  data: AppExamPaperResponse
}

export interface ApiResponsePageResponseAppExamRecordResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppExamRecordResponse>
}

export interface ApiResponseAppExamRecordResponse {
  success: boolean
  code: string
  message: string
  data: AppExamRecordResponse
}

export interface ExamPaperQueryParams {
  page: number
  size: number
  sort?: string
  keyword?: string
}

export interface ExamRecordQueryParams {
  page: number
  size: number
}

export interface Answer {
  questionId: number
  answerContent: string
}

export interface AppExamSubmitRequest {
  sourceType?: string
  sourceId?: number
  answers: Answer[]
}

export const learningApi = {
  async getExamPapers(params: ExamPaperQueryParams): Promise<ApiResponsePageResponseAppExamPaperResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.keyword) queryParams.append('keyword', params.keyword)
    
    return useApi(`/api/v1/app/learning/exam-papers?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  async getExamPaperDetail(id: number): Promise<ApiResponseAppExamPaperResponse> {
    return useApi(`/api/v1/app/learning/exam-papers/${id}`, {
      method: 'GET'
    })
  },

  async submitExamPaper(id: number, data: AppExamSubmitRequest): Promise<ApiResponseAppExamRecordResponse> {
    return useApi(`/api/v1/app/learning/exam-papers/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  async getExamRecords(params: ExamRecordQueryParams): Promise<ApiResponsePageResponseAppExamRecordResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    
    return useApi(`/api/v1/app/learning/exam-records?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  async getExamRecordDetail(id: number): Promise<ApiResponseAppExamRecordResponse> {
    return useApi(`/api/v1/app/learning/exam-records/${id}`, {
      method: 'GET'
    })
  }
}