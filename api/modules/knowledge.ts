import { request } from '../request'
import type {
  AppKnowledgeCategoryResponse,
  AppKnowledgeSearchResult,
  AppKnowledgeEntryResponse,
  PageResponse,
} from '~/api/types'

export interface GetKnowledgeEntriesParams {
  page: number
  size: number
  keyword?: string
  categoryId?: number
}

export function getKnowledgeCategoryTree() {
  return request<AppKnowledgeCategoryResponse[]>({
    url: '/app/knowledge/categories/tree',
    method: 'GET',
  })
}

export function searchKnowledgeEntries(params: GetKnowledgeEntriesParams) {
  return request<PageResponse<AppKnowledgeSearchResult>>({
    url: '/app/knowledge/entries',
    method: 'GET',
    params,
  })
}

export function getKnowledgeEntryDetail(id: number) {
  return request<AppKnowledgeEntryResponse>({
    url: `/app/knowledge/entries/${id}`,
    method: 'GET',
  })
}
