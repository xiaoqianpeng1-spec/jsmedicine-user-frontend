import { request } from '../request'
import type {
  AppCourseResponse,
  AppBookCategoryResponse,
  AppBookResponse,
  AppBookChapterResponse,
  AppPodcastResponse,
  AppExamPaperResponse,
  AppExamRecordResponse,
  AppTopicResponse,
  AppLearningRecordResponse,
  PageResponse,
} from '../types'

export function getCourseList(params?: {
  page?: number
  size?: number
  sort?: string
  keyword?: string
}): Promise<PageResponse<AppCourseResponse>> {
  return request({
    url: '/app/learning/courses',
    method: 'get',
    params,
  })
}

export function getCourseDetail(id: number): Promise<AppCourseResponse> {
  return request({
    url: `/app/learning/courses/${id}`,
    method: 'get',
  })
}

export function getCourseVideo(courseId: number, videoId: number): Promise<any> {
  return request({
    url: `/app/learning/courses/${courseId}/videos/${videoId}`,
    method: 'get',
  })
}

export function getBookCategories(): Promise<AppBookCategoryResponse[]> {
  return request({
    url: '/app/learning/book-categories',
    method: 'get',
  })
}

export function getBookList(params?: {
  page?: number
  size?: number
  categoryId?: number
  keyword?: string
}): Promise<PageResponse<AppBookResponse>> {
  return request({
    url: '/app/learning/books',
    method: 'get',
    params,
  })
}

export function getBookDetail(id: number): Promise<AppBookResponse> {
  return request({
    url: `/app/learning/books/${id}`,
    method: 'get',
  })
}

export function getBookChapter(bookId: number, chapterId: number): Promise<AppBookChapterResponse> {
  return request({
    url: `/app/learning/books/${bookId}/chapters/${chapterId}`,
    method: 'get',
  })
}

export function getPodcastList(params?: {
  page?: number
  size?: number
  keyword?: string
}): Promise<PageResponse<AppPodcastResponse>> {
  return request({
    url: '/app/learning/podcasts',
    method: 'get',
    params,
  })
}

export function getPodcastDetail(id: number): Promise<AppPodcastResponse> {
  return request({
    url: `/app/learning/podcasts/${id}`,
    method: 'get',
  })
}

export function getExamPapers(params?: {
  page?: number
  size?: number
  keyword?: string
}): Promise<PageResponse<AppExamPaperResponse>> {
  return request({
    url: '/app/learning/exam-papers',
    method: 'get',
    params,
  })
}

export function getExamPaperDetail(id: number): Promise<AppExamPaperResponse> {
  return request({
    url: `/app/learning/exam-papers/${id}`,
    method: 'get',
  })
}

export function submitExam(data: {
  sourceType: string
  sourceId: number
  answers: { questionId: number; answerContent: string }[]
}): Promise<void> {
  return request({
    url: '/app/learning/exam-submit',
    method: 'post',
    data,
  })
}

export function getExamRecords(params?: {
  page?: number
  size?: number
}): Promise<PageResponse<AppExamRecordResponse>> {
  return request({
    url: '/app/learning/exam-records',
    method: 'get',
    params,
  })
}

export function getExamRecordDetail(id: number): Promise<AppExamRecordResponse> {
  return request({
    url: `/app/learning/exam-records/${id}`,
    method: 'get',
  })
}

export function getTopicList(params?: {
  page?: number
  size?: number
  keyword?: string
}): Promise<PageResponse<AppTopicResponse>> {
  return request({
    url: '/app/learning/topics',
    method: 'get',
    params,
  })
}

export function getTopicDetail(id: number): Promise<AppTopicResponse> {
  return request({
    url: `/app/learning/topics/${id}`,
    method: 'get',
  })
}

export function getLearningRecord(resourceType: string, resourceId: number): Promise<AppLearningRecordResponse> {
  return request({
    url: `/app/learning/records/${resourceType}/${resourceId}`,
    method: 'get',
  })
}

export function updateLearningRecord(data: {
  resourceType: string
  resourceId: number
  studySeconds?: number
  progressPercent?: number
  completed?: boolean
}): Promise<void> {
  return request({
    url: '/app/learning/records',
    method: 'post',
    data,
  })
}
