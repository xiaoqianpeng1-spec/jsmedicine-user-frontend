import { useApi } from '~/composables/useApi'

// 课程视频响应
export interface AppCourseVideoResponse {
  id: number
  courseId: number
  title: string
  videoUrl: string
  durationSeconds: number
  paperId: number
  sortOrder: number
}

// 课程响应
export interface AppCourseResponse {
  id: number
  courseName: string
  subtitle: string
  coverUrl: string
  lecturerName: string
  introduction: string
  paperId: number
  publishedAt: string
  browseCount: number
  favoriteCount: number
  favorited: boolean
  progressPercent: number
  studySeconds: number
  videos: AppCourseVideoResponse[]
}

// 播客音频响应
export interface AppPodcastAudioResponse {
  id: number
  podcastId: number
  title: string
  audioUrl: string
  durationSeconds: number
  paperId: number
  sortOrder: number
}

// 播客响应
export interface AppPodcastResponse {
  id: number
  title: string
  summary: string
  coverUrl: string
  speakerName: string
  tags: string[]
  publishedAt: string
  browseCount: number
  favoriteCount: number
  favorited: boolean
  progressPercent: number
  studySeconds: number
  audios: AppPodcastAudioResponse[]
}

// 课程查询参数
export interface CourseQueryParams {
  page: number
  size: number
  sort?: string
  keyword?: string
}

// 播客查询参数
export interface PodcastQueryParams {
  page: number
  size: number
  sort?: string
  keyword?: string
}

// 课程列表响应
export interface ApiResponsePageResponseAppCourseResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppCourseResponse>
}

// 课程详情响应
export interface ApiResponseAppCourseResponse {
  success: boolean
  code: string
  message: string
  data: AppCourseResponse
}

// 播客列表响应
export interface ApiResponsePageResponseAppPodcastResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppPodcastResponse>
}

// 播客详情响应
export interface ApiResponseAppPodcastResponse {
  success: boolean
  code: string
  message: string
  data: AppPodcastResponse
}

// 播客音频详情响应
export interface ApiResponseAppPodcastAudioResponse {
  success: boolean
  code: string
  message: string
  data: AppPodcastAudioResponse
}

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

export interface AppExamAssessmentResponse {
  id: number
  assessmentName: string
  paperId: number
  paperName: string
  assessmentType: 'FORMAL' | 'MAKEUP' | 'MOCK'
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'ENDED' | 'CANCELLED' | 'ARCHIVED'
  startAt: string
  endAt: string
  serverTime: string
  countdownSeconds: number
  durationMinutes: number
  participantRecordId: number
  participantStatus: 'IN_PROGRESS' | 'SUBMITTED' | 'FORCED_SUBMITTED' | 'TIMED_OUT'
}

export interface ApiResponsePageResponseAppExamAssessmentResponse {
  success: boolean
  code: string
  message: string
  data: PageResponse<AppExamAssessmentResponse>
}

export interface ExamAssessmentQueryParams {
  page: number
  size: number
}

// 考核场次详情响应
export interface ApiResponseAppExamAssessmentResponse {
  success: boolean
  code: string
  message: string
  data: AppExamAssessmentResponse
}

// 进入考核场次请求
export interface AppExamAssessmentEnterRequest {
  requestId: string
}

// 试题选项响应
export interface AppExamQuestionOptionResponse {
  id: number
  optionKey: string
  optionContent: string
  sortOrder: number
}

// 答题结果响应
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

// 考核记录响应
export interface AppExamRecordResponse {
  id: number
  studentId: number
  paperId: number
  assessmentId: number
  paperName: string
  sourceType: string
  sourceId: number
  score: number
  passed: number
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'FORCED_SUBMITTED' | 'TIMED_OUT'
  submitType: 'NORMAL' | 'FORCED' | 'TIMEOUT'
  startedAt: string
  submittedAt: string
  lastActiveAt: string
  answers: AppExamAnswerResultResponse[]
}

// 考核记录API响应
export interface ApiResponseAppExamRecordResponse {
  success: boolean
  code: string
  message: string
  data: AppExamRecordResponse
}

export interface Answer {
  questionId: number
  answerContent: string
}

export interface AppExamSubmitRequest {
  requestId: string
  sourceType?: string
  sourceId?: number
  answers: Answer[]
}

// 学习记录请求
export interface AppLearningRecordRequest {
  resourceType: string
  resourceId: number
  studySeconds?: number
  progressPercent?: number
  completed?: boolean
}

// 学习记录响应
export interface AppLearningRecordResponse {
  id: number
  studentId: number
  resourceType: string
  resourceId: number
  studySeconds: number
  progressPercent: number
  completed: number
  completedAt: string
  lastStudiedAt: string
}

// 学习记录API响应
export interface ApiResponseAppLearningRecordResponse {
  success: boolean
  code: string
  message: string
  data: AppLearningRecordResponse
}

// 图书章节响应
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

// 图书章节API响应
export interface ApiResponseAppBookChapterResponse {
  success: boolean
  code: string
  message: string
  data: AppBookChapterResponse
}

export const learningApi = {
  // 分页查询课程
  async getCourses(params: CourseQueryParams): Promise<ApiResponsePageResponseAppCourseResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.keyword) queryParams.append('keyword', params.keyword)
    
    return useApi(`/api/v1/app/learning/courses?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  // 获取课程详情
  async getCourseDetail(id: number): Promise<ApiResponseAppCourseResponse> {
    return useApi(`/api/v1/app/learning/courses/${id}`, {
      method: 'GET'
    })
  },

  // 获取课程视频详情
  async getCourseVideoDetail(courseId: number, videoId: number): Promise<ApiResponseAppCourseVideoResponse> {
    return useApi(`/api/v1/app/learning/courses/${courseId}/videos/${videoId}`, {
      method: 'GET'
    })
  },

  // 分页查询播客
  async getPodcasts(params: PodcastQueryParams): Promise<ApiResponsePageResponseAppPodcastResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.keyword) queryParams.append('keyword', params.keyword)
    
    return useApi(`/api/v1/app/learning/podcasts?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  // 获取播客详情
  async getPodcastDetail(id: number): Promise<ApiResponseAppPodcastResponse> {
    return useApi(`/api/v1/app/learning/podcasts/${id}`, {
      method: 'GET'
    })
  },

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
      body: data
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
  },

  // 同步学习记录
  async syncLearningRecord(data: AppLearningRecordRequest): Promise<ApiResponseAppLearningRecordResponse> {
    return useApi(`/api/v1/app/learning/records`, {
      method: 'POST',
      body: data
    })
  },

  // 分页查询考核场次
  async getExamAssessments(params: ExamAssessmentQueryParams): Promise<ApiResponsePageResponseAppExamAssessmentResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('page', params.page.toString())
    queryParams.append('size', params.size.toString())
    
    return useApi(`/api/v1/app/learning/exam-assessments?${queryParams.toString()}`, {
      method: 'GET'
    })
  },

  // 查询考核场次详情
  async getExamAssessmentDetail(id: number): Promise<ApiResponseAppExamAssessmentResponse> {
    return useApi(`/api/v1/app/learning/exam-assessments/${id}`, {
      method: 'GET'
    })
  },

  // 进入考核场次
  async enterExamAssessment(id: number, data: AppExamAssessmentEnterRequest): Promise<ApiResponseAppExamRecordResponse> {
    return useApi(`/api/v1/app/learning/exam-assessments/${id}/enter`, {
      method: 'POST',
      body: data
    })
  },

  // 提交考核场次答案
  async submitExamAssessment(id: number, data: AppExamSubmitRequest): Promise<ApiResponseAppExamRecordResponse> {
    return useApi(`/api/v1/app/learning/exam-assessments/${id}/submit`, {
      method: 'POST',
      body: data
    })
  },

  // 获取图书章节详情
  async getBookChapterDetail(bookId: number, chapterId: number): Promise<ApiResponseAppBookChapterResponse> {
    return useApi(`/api/v1/app/learning/books/${bookId}/chapters/${chapterId}`, {
      method: 'GET'
    })
  }
}