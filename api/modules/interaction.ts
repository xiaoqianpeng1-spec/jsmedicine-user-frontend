import { request } from '../request'
import type {
  AppQaQuestionRequest,
  AppQaQuestionResponse,
  AppFeedbackRequest,
  FeedbackResponse,
  PageResponse,
} from '~/api/types'

export interface GetQuestionsParams {
  page: number
  size: number
}

export function createQuestion(data: AppQaQuestionRequest) {
  return request<AppQaQuestionResponse>({
    url: '/app/interaction/qa/questions',
    method: 'POST',
    data,
  })
}

export function getMyQuestions(params: GetQuestionsParams) {
  return request<PageResponse<AppQaQuestionResponse>>({
    url: '/app/interaction/qa/questions',
    method: 'GET',
    params,
  })
}

export function getQuestionDetail(id: number) {
  return request<AppQaQuestionResponse>({
    url: `/app/interaction/qa/questions/${id}`,
    method: 'GET',
  })
}

export function submitFeedback(data: AppFeedbackRequest) {
  return request<FeedbackResponse>({
    url: '/app/interaction/feedbacks',
    method: 'POST',
    data,
  })
}
