<template>
  <div class="topic-section-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">{{ sectionLabel || '专题资源' }}</h1>
        <p class="banner-desc">{{ topicTitle }}</p>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item" @click="goToTopics">专题</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item" @click="goToTopic">{{ topicTitle }}</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">{{ sectionLabel }}</span>
        </div>
      </div>
    </div>

    <!-- 资源列表 -->
    <section class="resources-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ sectionLabel }}</h2>
          <span class="resource-count">共 {{ total }} 个资源</span>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button class="retry-btn" @click="loadResources">重试</button>
        </div>

        <!-- 资源卡片 -->
        <div v-else class="resources-grid">
          <div 
            v-for="item in resources" 
            :key="item.resourceId" 
            class="resource-card"
            @click="goToResource(item)"
          >
            <div class="resource-cover">
              <img :src="item.coverUrl" :alt="item.title" />
              <div class="resource-type-badge">{{ item.resourceTypeLabel }}</div>
            </div>
            <div class="resource-content">
              <h3 class="resource-title">{{ item.title }}</h3>
              <p class="resource-subtitle">{{ item.subtitle }}</p>
              <div class="resource-tags">
                <span v-for="tag in item.tags.slice(0, 2)" :key="tag" class="resource-tag">{{ tag }}</span>
              </div>
              <div class="resource-stats">
                <span class="stat-item">👁️ {{ formatNumber(item.browseCount) }}</span>
                <span class="stat-item">{{ item.favorited ? '❤️' : '🤍' }} {{ item.favoriteCount }}</span>
                <span v-if="item.progressPercent > 0" class="progress-text">进度 {{ item.progressPercent }}%</span>
              </div>
              <div v-if="item.studySeconds > 0" class="study-time">
                ⏱️ 已学习 {{ formatStudyTime(item.studySeconds) }}
              </div>
            </div>
          </div>
          <div v-if="resources.length === 0" class="empty-state">
            <p>暂无资源</p>
          </div>
        </div>

        <!-- 分页组件 -->
        <div v-if="total > pageSize && !loading" class="pagination-section">
          <div class="pagination">
            <button 
              class="page-btn" 
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              上一页
            </button>
            <span class="page-info">
              第 {{ currentPage }} / {{ totalPages }} 页
            </span>
            <button 
              class="page-btn" 
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { topicsApi, type AppTopicResourceCardResponse } from '~/utils/api/topics'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const error = ref('')
const resources = ref<AppTopicResourceCardResponse[]>([])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const topicTitle = ref('')
const sectionLabel = ref('')

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

const goToHome = () => {
  router.push('/')
}

const goToTopics = () => {
  router.push('/topics')
}

const goToTopic = () => {
  const id = route.params.id
  router.push(`/topics/${id}`)
}

const goToResource = (item: AppTopicResourceCardResponse) => {
  const routes: Record<string, string> = {
    'VIDEO': '/video',
    'AUDIO': '/audio',
    'BOOK': '/books',
    'ARTICLE': '/articles',
    'EXAM': '/exam',
    'video': '/video',
    'audio': '/audio',
    'book': '/books',
    'article': '/articles',
    'exam': '/exam'
  }
  const baseRoute = routes[item.resourceType] || ''
  if (baseRoute && item.resourceId) {
    router.push(`${baseRoute}/${item.resourceId}`)
  }
}

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toString()
}

const formatStudyTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
}

const loadResources = async () => {
  loading.value = true
  error.value = ''

  try {
    const id = parseInt(route.params.id as string)
    const sectionType = route.params.sectionType as string

    const data = await topicsApi.getTopicSections(id, sectionType, {
      page: currentPage.value,
      size: pageSize.value
    })

    if (data.success && data.data) {
      resources.value = data.data.records
      total.value = data.data.total
      currentPage.value = data.data.page
      pageSize.value = data.data.size

      const typeLabels: Record<string, string> = {
        'VIDEO': '视频课程',
        'AUDIO': '音频课程',
        'BOOK': '图书',
        'ARTICLE': '文章',
        'EXAM': '考试',
        'video': '视频课程',
        'audio': '音频课程',
        'book': '图书',
        'article': '文章',
        'exam': '考试'
      }
      sectionLabel.value = typeLabels[sectionType] || sectionType
    } else {
      error.value = data.message || '获取资源失败'
    }
  } catch (err: any) {
    error.value = err.message || '网络错误，请稍后重试'
    console.error('获取专题分区资源失败:', err)
  } finally {
    loading.value = false
  }
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadResources()
}

onMounted(() => {
  loadResources()
})
</script>

<style scoped>
.topic-section-page {
  font-family: "Microsoft YaHei", sans-serif;
  min-height: 100vh;
  background: #fff;
}

.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 顶部横幅 */
.page-banner {
  background: linear-gradient(135deg, #2d5a27 0%, #38a169 100%);
  padding: 60px 0;
  text-align: center;
}

.banner-title {
  font-size: 32px;
  color: #fff;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.banner-desc {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* 面包屑导航 */
.breadcrumb-section {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.breadcrumb-item {
  cursor: pointer;
  transition: color 0.3s;
}

.breadcrumb-item:hover {
  color: #2d5a27;
}

.breadcrumb-item.active {
  color: #999;
  cursor: default;
}

.breadcrumb-separator {
  color: #ccc;
}

/* 资源列表区域 */
.resources-section {
  padding: 30px 0 50px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.resource-count {
  font-size: 14px;
  color: #999;
}

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #2d5a27;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态 */
.error-state {
  text-align: center;
  padding: 60px 20px;
}

.error-state p {
  color: #666;
  margin-bottom: 16px;
}

.retry-btn {
  padding: 10px 24px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 资源卡片 */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.resource-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.resource-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.resource-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.resource-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resource-type-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #2d5a27;
  font-size: 12px;
  border-radius: 4px;
}

.resource-content {
  padding: 16px;
}

.resource-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.resource-subtitle {
  font-size: 13px;
  color: #999;
  margin: 0 0 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.resource-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.resource-tag {
  padding: 2px 8px;
  background: #f0f4f0;
  color: #2d5a27;
  font-size: 12px;
  border-radius: 4px;
}

.resource-stats {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.stat-item {
  font-size: 13px;
  color: #999;
}

.progress-text {
  font-size: 13px;
  color: #2d5a27;
  font-weight: 500;
}

.study-time {
  font-size: 12px;
  color: #666;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

/* 分页区域 */
.pagination-section {
  padding: 30px 0;
  text-align: center;
}

.pagination {
  display: inline-flex;
  align-items: center;
  gap: 20px;
}

.page-btn {
  padding: 10px 20px;
  background: #f5f7fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  background: #e8f5e9;
  border-color: #2d5a27;
  color: #2d5a27;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #666;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 900px) {
  .resources-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .resources-grid {
    grid-template-columns: 1fr;
  }
  
  .banner-title {
    font-size: 24px;
  }
}
</style>