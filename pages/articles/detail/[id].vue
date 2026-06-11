<template>
  <div class="article-detail-page">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item" @click="goToArticles">资讯</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">{{ article.title }}</span>
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
        <p>浏览资讯详情需要先登录账号</p>
        <button class="login-btn" @click="goToHome">立即登录</button>
      </div>
      <div v-else>
        <p>{{ error }}</p>
        <button class="retry-btn" @click="fetchArticleDetail">重试</button>
      </div>
    </div>

    <!-- 资讯内容 -->
    <div v-else class="article-content-wrapper">
      <div class="container">
        <div class="article-header">
          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="article-tag">{{ tag }}</span>
          </div>
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="article-author">{{ article.authorName }}</span>
            <span class="article-source">{{ article.source }}</span>
            <span class="article-time">{{ formatDate(article.publishedAt) }}</span>
            <span class="article-views">👁️ {{ formatNumber(article.viewCount) }}</span>
          </div>
        </div>

        <div class="article-main-image" v-if="article.coverUrl">
          <img :src="article.coverUrl" :alt="article.title" />
        </div>

        <div class="article-body">
          <!-- 摘要 -->
          <div class="article-summary-box">
            <h3 class="summary-title">📋 内容摘要</h3>
            <p class="summary-text">{{ article.summary }}</p>
          </div>
          
          <!-- 正文内容 -->
          <div class="article-text">
            <p>{{ article.content }}</p>
          </div>
        </div>

        <div class="article-footer">
          <div class="article-actions">
            <button 
              class="action-btn favorite-btn" 
              :class="{ favorited: article.favorited }"
              @click="toggleFavorite"
            >
              <span class="action-icon">{{ article.favorited ? '❤️' : '🤍' }}</span>
              <span class="action-text">{{ article.favoriteCount }}</span>
            </button>
            <div class="article-stats">
              <span class="stat-item">👁️ {{ formatNumber(article.viewCount) }}</span>
            </div>
          </div>
          <button class="back-btn" @click="goToArticles">← 返回资讯列表</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { contentApi, type AppArticleResponse } from '~/utils/api/content'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const error = ref('')

const article = reactive<AppArticleResponse>({
  id: 0,
  title: '',
  summary: '',
  coverUrl: '',
  content: '',
  authorName: '',
  source: '',
  tags: [],
  viewCount: 0,
  favoriteCount: 0,
  favorited: false,
  publishedAt: ''
})

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toString()
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch {
    return dateStr
  }
}

const fetchArticleDetail = async () => {
  loading.value = true
  error.value = ''

  try {
    const articleId = route.params.id as string
    
    const data: any = await contentApi.getArticleDetail(parseInt(articleId))

    if (data.success && data.data) {
      Object.assign(article, data.data)
    } else {
      error.value = data.message || '获取资讯详情失败'
    }
  } catch (err: any) {
    error.value = err.message || '网络错误，请稍后重试'
    console.error('获取资讯详情失败:', err)
  } finally {
    loading.value = false
  }
}

const goToHome = () => {
  router.push('/')
}

const goToArticles = () => {
  router.push('/articles')
}

// 切换收藏状态
const toggleFavorite = () => {
  article.favorited = !article.favorited
  article.favoriteCount += article.favorited ? 1 : -1
}

onMounted(() => {
  fetchArticleDetail()
})
</script>

<style scoped>
.article-detail-page {
  min-height: 100vh;
  background: #f5f5f5;
}

/* 面包屑导航 */
.breadcrumb-section {
  padding: 16px 0;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.breadcrumb-section .container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

/* 容器 */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
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
}

/* 资讯内容 */
.article-content-wrapper {
  padding: 30px 0 50px;
}

.article-header {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.article-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.article-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #E8F5E9;
  color: #22C55E;
  font-size: 12px;
  border-radius: 4px;
}

.article-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: #999;
}

.article-author {
  padding-right: 16px;
  border-right: 1px solid #eee;
}

.article-source {
  padding-right: 16px;
  border-right: 1px solid #eee;
}

.article-main-image {
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
}

.article-main-image img {
  width: 100%;
  height: auto;
}

.article-body {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.article-summary-box {
  background: #f8fbf8;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  border-left: 4px solid #2d5a27;
}

.summary-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.summary-text {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.article-text {
  line-height: 1.8;
  color: #333;
  font-size: 16px;
}

.article-text p {
  margin-bottom: 16px;
}

.article-text p:last-child {
  margin-bottom: 0;
}

.article-footer {
  background: #fff;
  padding: 20px 24px;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.article-actions {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #e8f5e9;
}

.action-btn.favorited {
  background: #fff3f3;
}

.action-icon {
  font-size: 18px;
}

.action-text {
  font-size: 14px;
  color: #666;
}

.article-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  font-size: 14px;
  color: #999;
}

.back-btn {
  padding: 12px 24px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #38a169;
}

@media (max-width: 1200px) {
  .breadcrumb-section .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .article-title {
    font-size: 22px;
  }
  
  .article-meta {
    flex-wrap: wrap;
  }
}
</style>
