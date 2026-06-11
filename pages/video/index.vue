<template>
  <div class="video-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">视频课程</h1>
        <p class="banner-desc">名师授课，随时随地学习中医知识</p>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">视频</span>
        </div>
      </div>
    </div>

    <!-- 视频列表 -->
    <section class="video-section">
      <div class="container">
        <!-- 搜索框 -->
        <div class="search-box">
          <input 
            v-model="searchKeyword"
            type="text"
            class="search-input"
            placeholder="搜索课程..."
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button class="retry-btn" @click="fetchCourses">重试</button>
        </div>

        <!-- 视频列表 -->
        <div v-else class="video-grid">
          <div 
            v-for="video in courses" 
            :key="video.id" 
            class="video-card"
            @click="goToDetail(video.id)"
          >
            <div class="video-thumbnail">
              <img :src="video.coverUrl" :alt="video.courseName" />
              <div class="video-play-overlay">
                <span class="play-btn">▶</span>
              </div>
              <!-- 学习进度 -->
              <div v-if="video.progressPercent > 0" class="progress-badge">
                {{ video.progressPercent }}%
              </div>
            </div>
            <h3 class="video-title">{{ video.courseName }}</h3>
            <p class="video-subtitle">{{ video.subtitle }}</p>
            <p class="video-lecturer">讲师：{{ video.lecturerName }}</p>
            <div class="video-stats">
              <span class="stat-views">👁️ {{ formatNumber(video.browseCount) }}</span>
              <span class="stat-likes">⭐ {{ formatNumber(video.favoriteCount) }}</span>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div v-if="!loading && !error && totalPages > 1" class="pagination">
          <button 
            class="page-btn prev" 
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            ‹
          </button>
          <button 
            v-for="page in visiblePages" 
            :key="page"
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button 
            class="page-btn next" 
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            ›
          </button>
        </div>

        <!-- 空状态 -->
        <div v-if="!loading && !error && courses.length === 0" class="empty-state">
          <p>暂无课程</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { learningApi, type AppCourseResponse } from '~/utils/api/learning'

const router = useRouter()

const loading = ref(false)
const error = ref('')
const courses = ref<AppCourseResponse[]>([])
const currentPage = ref(1)
const pageSize = 12
const total = ref(0)
const searchKeyword = ref('')

const totalPages = computed(() => Math.ceil(total.value / pageSize))

// 计算可见的页码
const visiblePages = computed(() => {
  const pages: number[] = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, 5)
    } else if (current >= total - 2) {
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i)
      }
    }
  }
  
  return pages
})

// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toString()
}

// 获取课程列表
const fetchCourses = async () => {
  loading.value = true
  error.value = ''

  try {
    const data: any = await learningApi.getCourses({
      page: currentPage.value,
      size: pageSize,
      keyword: searchKeyword.value || undefined
    })

    if (data.success && data.data) {
      courses.value = data.data.records || []
      total.value = data.data.total || 0
    } else {
      error.value = data.message || '获取课程列表失败'
    }
  } catch (err: any) {
    error.value = err.message || '网络错误，请稍后重试'
    console.error('获取课程列表失败:', err)
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchCourses()
}

// 分页操作
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchCourses()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchCourses()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchCourses()
  }
}

const goToHome = () => {
  router.push('/')
}

const goToDetail = (id: number) => {
  router.push(`/video/${id}`)
}

// 页面加载时获取数据
onMounted(() => {
  fetchCourses()
})
</script>

<style scoped>
.video-page {
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
  font-size: 36px;
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

/* 搜索框 */
.search-box {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #2d5a27;
}

.search-btn {
  padding: 12px 32px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #3d7a37;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2d5a27;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态 */
.error-state {
  text-align: center;
  padding: 60px 0;
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

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #999;
}

/* 视频列表区域 */
.video-section {
  padding: 30px 0 50px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.video-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.video-card:hover {
  transform: translateY(-4px);
}

.video-thumbnail {
  position: relative;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #f0f0f0;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  background: rgba(45, 90, 39, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-card:hover .video-play-overlay {
  opacity: 1;
}

.play-btn {
  color: #fff;
  font-size: 16px;
  margin-left: 2px;
}

.progress-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.video-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-subtitle {
  font-size: 12px;
  color: #666;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-lecturer {
  font-size: 12px;
  color: #999;
  margin: 0 0 8px 0;
}

.video-stats {
  display: flex;
  gap: 16px;
}

.stat-views,
.stat-likes {
  font-size: 12px;
  color: #999;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
}

.page-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  border-color: #2d5a27;
  color: #2d5a27;
}

.page-btn.active {
  background: #2d5a27;
  border-color: #2d5a27;
  color: #fff;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.prev,
.page-btn.next {
  width: auto;
  padding: 0 12px;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .banner-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>
