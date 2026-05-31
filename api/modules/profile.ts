import { request } from '../request'
import type {
  AppProfileResponse,
  AppCertificationResponse,
  AppFavoriteResponse,
  AppBrowseHistoryResponse,
  AppProfileSummaryResponse,
  PageResponse,
} from '../types'

export function getProfile(): Promise<AppProfileResponse> {
  return request({
    url: '/app/profile',
    method: 'get',
  })
}

export function updateProfile(data: Partial<AppProfileResponse>): Promise<AppProfileResponse> {
  return request({
    url: '/app/profile',
    method: 'put',
    data,
  })
}

export function getCertification(): Promise<AppCertificationResponse> {
  return request({
    url: '/app/profile/certification',
    method: 'get',
  })
}

export function submitCertification(data: {
  realName: string
  idCard: string
}): Promise<AppCertificationResponse> {
  return request({
    url: '/app/profile/certification',
    method: 'post',
    data,
  })
}

export function getFavorites(params?: {
  page?: number
  size?: number
  resourceType?: string
}): Promise<PageResponse<AppFavoriteResponse>> {
  return request({
    url: '/app/profile/favorites',
    method: 'get',
    params,
  })
}

export function addFavorite(data: {
  resourceType: string
  resourceId: number
}): Promise<void> {
  return request({
    url: '/app/profile/favorites',
    method: 'post',
    data,
  })
}

export function removeFavorite(id: number): Promise<void> {
  return request({
    url: `/app/profile/favorites/${id}`,
    method: 'delete',
  })
}

export function getBrowseHistories(params?: {
  page?: number
  size?: number
}): Promise<PageResponse<AppBrowseHistoryResponse>> {
  return request({
    url: '/app/profile/browse-histories',
    method: 'get',
    params,
  })
}

export function getProfileSummary(): Promise<AppProfileSummaryResponse> {
  return request({
    url: '/app/profile/summary',
    method: 'get',
  })
}
