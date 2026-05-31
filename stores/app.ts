import { defineStore } from 'pinia'
import type { AppCourseResponse, LiveSessionResponse, AppKnowledgeSearchResult } from '~/api/types'

interface AppState {
  recentCourses: AppCourseResponse[]
  recentLives: LiveSessionResponse[]
  recentKnowledge: AppKnowledgeSearchResult[]
  searchHistory: string[]
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    recentCourses: [],
    recentLives: [],
    recentKnowledge: [],
    searchHistory: [],
  }),

  actions: {
    addSearchHistory(keyword: string) {
      if (keyword && !this.searchHistory.includes(keyword)) {
        this.searchHistory.unshift(keyword)
        if (this.searchHistory.length > 20) {
          this.searchHistory.pop()
        }
      }
    },

    clearSearchHistory() {
      this.searchHistory = []
    },

    addRecentCourse(course: AppCourseResponse) {
      const index = this.recentCourses.findIndex((c) => c.id === course.id)
      if (index > -1) {
        this.recentCourses.splice(index, 1)
      }
      this.recentCourses.unshift(course)
      if (this.recentCourses.length > 10) {
        this.recentCourses.pop()
      }
    },
  },
})
