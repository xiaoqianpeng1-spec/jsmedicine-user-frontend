export interface ApiResponse<T = any> {
  success: boolean
  code: string
  message: string
  data: T
}

export interface PageResponse<T = any> {
  records: T[]
  total: number
  page: number
  size: number
}

export interface AppLoginRequest {
  username: string
  password: string
}

export interface AppSmsCodeRequest {
  mobile: string
}

export interface AppSmsLoginRequest {
  mobile: string
  code: string
}

export interface AppWechatLoginRequest {
  code: string
  nickname: string
  avatarUrl: string
}

export interface AppWechatBindMobileRequest {
  bindToken: string
  mobile: string
  code: string
}

export interface AppUserInfo {
  id: number
  username: string
  nickname: string
  avatarUrl: string
  lastLoginAt: string
}

export interface CurrentAppUserResponse {
  id: number
  username: string
  nickname: string
  avatarUrl: string
  mobile: string
  email: string
  profileCompleted: boolean
  studentId: number
  certificationStatus: 'UNSUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED'
}

export interface AppLoginResponse {
  tokenType: string
  accessToken: string
  expiresIn: number
  user: AppUserInfo
}

export interface AppWechatLoginResponse {
  registered: boolean
  needBindMobile: boolean
  bindToken: string
  tokenType: string
  accessToken: string
  expiresIn: number
  user: AppUserInfo
}

export interface AppQaQuestionRequest {
  expertCategoryId: number
  expertId: number
  title: string
  content: string
}

export interface AppQaAnswer {
  id: number | null
  questionId: number | null
  adminId: number | null
  expertId: number | null
  content: string | null
  answeredAt: string | null
}

export interface AppQaQuestionResponse {
  id: number
  expertCategoryId: number
  expertId: number
  title: string
  content: string
  status: 'PENDING' | 'ANSWERED' | 'CLOSED'
  answers: AppQaAnswer[]
}

export interface AppFeedbackRequest {
  feedbackType: string
  content: string
  contact: string
}

export interface FeedbackResponse {
  id: number
  userId: number
  studentId: number
  feedbackType: string
  content: string
  contact: string
  status: 'PENDING' | 'PROCESSING' | 'RESOLVED'
  processedBy: number
  processedAt: string
  processNote: string
}

export interface AppKnowledgeCategoryResponse {
  id: number
  parentId: number
  categoryName: string
  categoryCode: string
  description: string
  sortOrder: number
  children: AppKnowledgeCategoryResponse[]
}

export interface AppKnowledgeSearchResult {
  id: number
  title: string
  summary: string
  categoryId: number
  categoryName: string
  categoryCode: string
}

export interface AppKnowledgeEntryResponse {
  id: number
  categoryId: number
  title: string
  summary: string
  coverUrl: string
  content: string
  keywords: string
  source: string
  sortOrder: number
  viewCount: number
  publishedAt: string
}

export interface LiveSessionVideo {
  id: number | null
  liveSessionId: number | null
  title: string | null
  videoUrl: string | null
  durationSeconds: number | null
  sortOrder: number | null
  status: 'DISABLED' | 'ENABLED' | null
}

export interface LiveSessionResponse {
  id: number
  title: string
  coverUrl: string
  anchorName: string
  speakerName: string
  tags: string[]
  liveUrl: string
  playbackUrl: string
  startAt: string
  endAt: string
  reviewStatus: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED'
  liveStatus: 'NOT_STARTED' | 'LIVE' | 'ENDED' | 'CANCELED'
  videos: LiveSessionVideo[]
}

export interface CourseVideo {
  id: number | null
  courseId: number | null
  title: string | null
  videoUrl: string | null
  durationSeconds: number | null
  paperId: number | null
  sortOrder: number | null
}

export interface AppCourseResponse {
  id: number
  courseName: string
  subtitle: string
  coverUrl: string
  lecturerName: string
  introduction: string
  paperId: number
  publishedAt: string
  progressPercent: number
  studySeconds: number
  videos: CourseVideo[]
}

export interface AppBookCategoryResponse {
  id: number
  parentId: number
  categoryName: string
  categoryCode: string
  description: string
  sortOrder: number
  children: AppBookCategoryResponse[]
}

export interface AppBookResponse {
  id: number
  title: string
  author: string
  coverUrl: string
  introduction: string
  categoryId: number
  categoryName: string
  publishedAt: string
  viewCount: number
}

export interface AppBookChapterResponse {
  id: number
  bookId: number
  title: string
  content: string
  sortOrder: number
}

export interface AppPodcastResponse {
  id: number
  title: string
  description: string
  coverUrl: string
  audioUrl: string
  durationSeconds: number
  publishedAt: string
  playCount: number
}

export interface AppExamPaperResponse {
  id: number
  paperName: string
  description: string
  totalScore: number
  passScore: number
  durationMinutes: number
  questionCount: number
  publishedAt: string
}

export interface Answer {
  questionId: number
  answerContent: string
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
  answers: any[]
}

export interface AppTopicItemResponse {
  id: number
  topicId: number
  itemType: string
  itemId: number
  sortOrder: number
  resource: any
}

export interface AppTopicResponse {
  id: number
  title: string
  summary: string
  learningRequirements: string
  coverUrl: string
  viewCount: number
  publishedAt: string
  items: AppTopicItemResponse[]
}

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

export interface AppProfileResponse {
  id: number
  username: string
  mobile: string
  email: string
  nickname: string
  profileSignature: string
  avatarUrl: string
  authProvider: string
  gender: string
  status: string
  profileCompleted: boolean
  studentId: number
  certificationStatus: string
}

export interface AppCertificationResponse {
  id: number
  userId: number
  realName: string
  idCard: string
  status: 'UNSUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED'
  submittedAt: string
  reviewedAt: string
  rejectReason: string
}

export interface AppFavoriteResponse {
  id: number
  userId: number
  resourceType: string
  resourceId: number
  resourceTitle: string
  resourceCover: string
  createdAt: string
}

export interface AppBrowseHistoryResponse {
  id: number
  userId: number
  resourceType: string
  resourceId: number
  resourceTitle: string
  resourceCover: string
  browsedAt: string
}

export interface AppProfileSummaryResponse {
  studyHours: number
  completedCourses: number
  examCount: number
  totalStudySeconds: number
}

export type CourseListResponse = PageResponse<AppCourseResponse>
export type CourseDetailResponse = AppCourseResponse
export type ChapterListResponse = AppBookChapterResponse[]
export type LearningProgressResponse = AppLearningRecordResponse
