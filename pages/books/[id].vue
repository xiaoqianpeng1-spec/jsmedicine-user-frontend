<template>
  <div class="book-detail-page">
    <!-- 顶部导航 -->
    <section class="detail-header">
      <div class="container">
        <button class="back-btn" @click="goBack">
          <span>←</span> 返回
        </button>
      </div>
    </section>

    <!-- 图书信息 -->
    <section class="book-info-section">
      <div class="container">
        <div class="book-info-card">
          <div class="book-cover-wrapper">
            <img :src="bookData.coverUrl" :alt="bookData.bookName" class="book-cover-large" />
          </div>
          <div class="book-details">
            <h1 class="book-title">{{ bookData.bookName }}</h1>
            <p class="book-author">作者：{{ bookData.author }}</p>
            <p class="book-publisher">出版社：{{ bookData.publisher }}</p>
            <p class="book-publish-date">出版日期：{{ formatDate(bookData.publishedAt) }}</p>
            <div class="book-stats">
              <div class="stat-item">
                <span class="stat-value">{{ bookData.totalPages }}</span>
                <span class="stat-label">页数</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ bookData.browseCount }}</span>
                <span class="stat-label">浏览量</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ bookData.favoriteCount }}</span>
                <span class="stat-label">收藏数</span>
              </div>
            </div>
            <div class="book-intro">
              <h3>内容简介</h3>
              <p>{{ bookData.introduction }}</p>
            </div>
            <div class="action-buttons">
              <button 
                class="btn btn-primary" 
                @click="startReading"
              >
                📖 开始阅读
              </button>
              <button 
                class="btn btn-secondary" 
                :class="{ active: bookData.favorited }"
                @click="toggleFavorite"
              >
                {{ bookData.favorited ? '❤️ 已收藏' : '🤍 收藏' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 阅读进度 -->
    <section class="progress-section" v-if="bookData.progressPercent > 0">
      <div class="container">
        <div class="progress-card">
          <div class="progress-header">
            <span class="progress-label">阅读进度</span>
            <span class="progress-percent">{{ bookData.progressPercent }}%</span>
          </div>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: bookData.progressPercent + '%' }"
            ></div>
          </div>
          <div class="progress-info">
            <span>已学习 {{ formatStudyTime(bookData.studySeconds) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 章节目录 -->
    <section class="chapters-section">
      <div class="container">
        <h2 class="section-title">📚 章节目录</h2>
        <div class="chapters-list">
          <div 
            v-for="chapter in bookData.chapters" 
            :key="chapter.id"
            class="chapter-item"
            @click="goToChapter(chapter.id)"
          >
            <span class="chapter-number">{{ chapter.sortOrder }}</span>
            <span class="chapter-title">{{ chapter.chapterTitle }}</span>
            <span class="chapter-pages">{{ chapter.pageCount }}页</span>
          </div>
          <div v-if="bookData.chapters.length === 0" class="empty-state">
            <p>暂无章节信息</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { booksApi, type AppBookResponse } from '~/utils/api/books'

const router = useRouter()
const route = useRoute()

const bookData = ref<AppBookResponse>({
  id: 0,
  categoryId: 0,
  bookName: '',
  author: '',
  publisher: '',
  coverUrl: '',
  introduction: '',
  totalPages: 0,
  paperId: 0,
  publishedAt: '',
  browseCount: 0,
  favoriteCount: 0,
  favorited: false,
  progressPercent: 0,
  studySeconds: 0,
  chapters: []
})

const goBack = () => {
  router.back()
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatStudyTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
}

const startReading = () => {
  if (bookData.value.chapters.length > 0) {
    goToChapter(bookData.value.chapters[0].id)
  }
}

const toggleFavorite = () => {
  bookData.value.favorited = !bookData.value.favorited
  bookData.value.favoriteCount += bookData.value.favorited ? 1 : -1
}

const goToChapter = (chapterId: number) => {
  router.push(`/books/${bookData.value.id}/chapter/${chapterId}`)
}

onMounted(async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    try {
      const response = await booksApi.getBookDetail(id)
      if (response.success) {
        bookData.value = response.data
      }
    } catch (error) {
      console.error('Failed to load book detail:', error)
    }
  }
})
</script>

<style scoped>
.book-detail-page {
  font-family: "Microsoft YaHei", sans-serif;
  min-height: 100vh;
  background: #f5f7fa;
}

.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 顶部导航 */
.detail-header {
  background: #fff;
  padding: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #f5f7fa;
  color: #2d5a27;
  border-color: #2d5a27;
}

/* 图书信息 */
.book-info-section {
  padding: 40px 0;
}

.book-info-card {
  display: flex;
  gap: 32px;
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.book-cover-wrapper {
  flex-shrink: 0;
}

.book-cover-large {
  width: 240px;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.book-details {
  flex: 1;
}

.book-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.book-author,
.book-publisher,
.book-publish-date {
  font-size: 14px;
  color: #666;
  margin: 8px 0;
}

.book-author {
  color: #2d5a27;
  font-weight: 500;
}

.book-stats {
  display: flex;
  gap: 40px;
  margin: 24px 0;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 600;
  color: #2d5a27;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.book-intro {
  margin-bottom: 24px;
}

.book-intro h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.book-intro p {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 16px;
}

.btn {
  padding: 12px 32px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #2d5a27 0%, #38a169 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(45, 90, 39, 0.3);
}

.btn-secondary {
  background: #f5f7fa;
  color: #666;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover,
.btn-secondary.active {
  background: #fff5f5;
  color: #e53935;
  border-color: #e53935;
}

/* 阅读进度 */
.progress-section {
  padding: 24px 0;
}

.progress-card {
  background: linear-gradient(135deg, #fffef5 0%, #fffbeb 100%);
  border-radius: 12px;
  padding: 20px 24px;
  border: 1px solid #fef3c7;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-label {
  font-size: 14px;
  color: #92400e;
  font-weight: 500;
}

.progress-percent {
  font-size: 18px;
  font-weight: 600;
  color: #d97706;
}

.progress-bar {
  height: 8px;
  background: #fef3c7;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-info {
  margin-top: 8px;
  font-size: 12px;
  color: #b45309;
}

/* 章节目录 */
.chapters-section {
  padding: 32px 0 60px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
}

.chapters-list {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.chapter-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background 0.3s;
}

.chapter-item:last-child {
  border-bottom: none;
}

.chapter-item:hover {
  background: #f8fbf8;
}

.chapter-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0fdf4;
  color: #22c55e;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 500;
  margin-right: 16px;
}

.chapter-title {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.chapter-pages {
  font-size: 13px;
  color: #999;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #999;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .book-info-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .book-cover-large {
    width: 180px;
    height: 240px;
  }

  .book-title {
    font-size: 22px;
  }

  .book-stats {
    justify-content: center;
  }

  .action-buttons {
    justify-content: center;
  }
}
</style>