import { request } from '../request'
import type {
  LiveSessionResponse,
  PageResponse,
} from '~/api/types'

export interface GetLiveSessionsParams {
  page: number
  size: number
  keyword?: string
  liveStatus?: 'NOT_STARTED' | 'LIVE' | 'ENDED' | 'CANCELED'
}

export function getLiveSessions(params: GetLiveSessionsParams) {
  return request<PageResponse<LiveSessionResponse>>({
    url: '/app/live-sessions',
    method: 'GET',
    params,
  })
}

export function getLiveSessionDetail(id: number) {
  return request<LiveSessionResponse>({
    url: `/app/live-sessions/${id}`,
    method: 'GET',
  })
}
