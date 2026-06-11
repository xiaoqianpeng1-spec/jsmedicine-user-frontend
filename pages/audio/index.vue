<template>
  <div class="audio-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">音频课程</h1>
        <p class="banner-desc">随时随地，听学中医知识</p>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">音频</span>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <div v-if="error === '未授权，请登录'" class="login-prompt">
        <div class="login-icon">🔐</div>
        <h3>需要登录</h3>
        <p>收听音频课程需要先登录账号</p>
        <button class="login-btn" @click="goToHome">立即登录</button>
      </div>
      <div v-else>
        <p>{{ error }}</p>
        <button class="retry-btn" @click="fetchPodcasts">重试</button>
      </div>
    </div>

    <!-- 音频列表 -->
    <section v-else class="audio-section">
      <div class="container">
        <div class="audio-grid">
          <div 
            v-for="podcast in podcasts" 
            :key="podcast.id" 
            class="audio-card"
            @click="goToDetail(podcast.id)"
          >
            <div class="audio-cover">
              <img :src="podcast.coverUrl || 'https://via.placeholder.com/300x200?text=音频封面'" :alt="podcast.title" />
              <div class="audio-play-overlay">
                <span class="play-btn">🎵</span>
              </div>
            </div>
            <h3 class="audio-title">{{ podcast.title }}</h3>
            <p class="audio-desc">{{ podcast.summary }}</p>
            <div class="audio-tags">
              <span v-for="tag in podcast.tags" :key="tag" class="audio-tag tag-green">{{ tag }}</span>
            </div>
            <div class="audio-stats">
              <span class="stat-views">👁️ {{ formatNumber(podcast.browseCount) }}</span>
              <span class="stat-likes">⭐ {{ podcast.favoriteCount }}</span>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div v-if="totalPages > 1" class="pagination">
          <button class="page-btn prev" :disabled="currentPage === 1" @click="prevPage">‹</button>
          <button 
            v-for="page in displayPages" 
            :key="page" 
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button class="page-btn next" :disabled="currentPage === totalPages" @click="nextPage">›</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { learningApi, type AppPodcastResponse } from '~/utils/api/learning'

const router = useRouter()

const loading = ref(false)
const error = ref('')
const currentPage = ref(1)
const pageSize = 12
const total = ref(0)

const podcasts = ref<AppPodcastResponse[]>([])

const totalPages = computed(() => Math.ceil(total.value / pageSize))

const displayPages = computed(() => {
  const pages: number[] = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  for (let i = start; i <= end; i++) {
    pages.push(i)
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

// 获取播客列表
const fetchPodcasts = async () => {
  loading.value = true
  error.value = ''

  try {
    const data: any = await learningApi.getPodcasts({
      page: currentPage.value,
      size: pageSize
    })

    if (data.success && data.data) {
      podcasts.value = data.data.records || []
      total.value = data.data.total || 0
    } else {
      error.value = data.message || '获取音频列表失败'
    }
  } catch (err: any) {
    error.value = err.message || '网络错误，请稍后重试'
    console.error('获取播客列表失败:', err)
  } finally {
    loading.value = false
  }
}

const goToHome = () => {
  router.push('/')
}

const goToDetail = (id: number) => {
  router.push(`/audio/${id}`)
}

const goToPage = (page: number) => {
  currentPage.value = page
  fetchPodcasts()
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchPodcasts()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchPodcasts()
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchPodcasts()
})
</script>

<style scoped>
.audio-page {
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

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 100px 0;
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

.loading-state p {
  color: #666;
}

/* 错误状态 */
.error-state {
  text-align: center;
  padding: 100px 0;
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

/* 登录提示 */
.login-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
  background: #f8fbf8;
  border-radius: 12px;
  max-width: 400px;
  margin: 0 auto;
}

.login-icon {
  font-size: 48px;
}

.login-prompt h3 {
  font-size: 20px;
  color: #333;
  margin: 0;
}

.login-prompt p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.login-btn {
  padding: 12px 32px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #3d7a37;
}

/* 音频列表区域 */
.audio-section {
  padding: 30px 0 50px;
}

.audio-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.audio-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.audio-card:hover {
  transform: translateY(-4px);
}

.audio-cover {
  position: relative;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.audio-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.audio-play-overlay {
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
}

.play-btn {
  color: #fff;
  font-size: 18px;
}

.audio-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
}

.audio-desc {
  font-size: 12px;
  color: #999;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.audio-tags {
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
}

.audio-tag {
  padding: 2px 8px;
  font-size: 11px;
  border-radius: 2px;
}

.tag-green {
  background: #E8F5E9;
  color: #22C55E;
}

.audio-stats {
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
  .audio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .banner-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .audio-grid {
    grid-template-columns: 1fr;
  }
}
</style>