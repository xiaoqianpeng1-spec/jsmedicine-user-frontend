<template>
  <div class="articles-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">资讯中心</h1>
        <p class="banner-desc">获取最新中医行业动态与学术资讯</p>
      </div>
    </section>

    <!-- 筛选区域 -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-tabs">
          <button 
            v-for="tab in filterTabs" 
            :key="tab.id"
            class="filter-tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
        <div class="search-box">
          <input 
            v-model="searchKeyword" 
            type="text" 
            placeholder="搜索资讯..."
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

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
        <p>浏览资讯需要先登录账号</p>
        <button class="login-btn" @click="goToHome">立即登录</button>
      </div>
      <div v-else>
        <p>{{ error }}</p>
        <button class="retry-btn" @click="fetchArticles">重试</button>
      </div>
    </div>

    <!-- 资讯列表 -->
    <section v-else class="articles-section">
      <div class="container">
        <div class="articles-list">
          <div 
            v-for="article in articles" 
            :key="article.id" 
            class="article-card"
            @click="goToDetail(article.id)"
          >
            <div class="article-image">
              <img :src="article.coverUrl || 'https://via.placeholder.com/200x140?text=资讯封面'" :alt="article.title" />
            </div>
            <div class="article-content">
              <div class="article-tags">
                <span v-for="tag in article.tags.slice(0, 2)" :key="tag" class="article-tag">{{ tag }}</span>
              </div>
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-summary">{{ article.summary }}</p>
              <div class="article-footer">
                <span class="article-author">{{ article.authorName || article.source }}</span>
                <span class="article-time">{{ formatDate(article.publishedAt) }}</span>
                <span class="article-views">👁️ {{ formatNumber(article.viewCount) }}</span>
                <span class="article-likes">❤️ {{ article.favoriteCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <button 
            class="pagination-btn" 
            :disabled="currentPage === 1"
            @click="handlePrevPage"
          >
            ← 上一页
          </button>
          <div class="page-numbers">
            <span 
              v-for="page in pageNumbers" 
              :key="page"
              class="page-number"
              :class="{ active: currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </span>
          </div>
          <button 
            class="pagination-btn" 
            :disabled="currentPage === totalPages"
            @click="handleNextPage"
          >
            下一页 →
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { contentApi, type AppArticleResponse } from '~/utils/api/content'

const router = useRouter()

const activeTab = ref('all')
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = 10
const total = ref(0)
const loading = ref(false)
const error = ref('')

const articles = ref<AppArticleResponse[]>([])

const filterTabs = [
  { id: 'all', name: '全部' },
  { id: 'news', name: '新闻资讯' },
  { id: 'academic', name: '学术交流' },
  { id: 'industry', name: '行业动态' },
  { id: 'research', name: '研究成果' }
]

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize)
})

const pageNumbers = computed(() => {
  return Array.from({ length: Math.min(totalPages.value, 10) }, (_, i) => i + 1)
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

const fetchArticles = async () => {
  loading.value = true
  error.value = ''

  try {
    const data: any = await contentApi.getArticles({
      page: currentPage.value,
      size: pageSize,
      keyword: searchKeyword.value
    })

    if (data.success && data.data) {
      articles.value = data.data.records || []
      total.value = data.data.total || 0
    } else {
      error.value = data.message || '获取资讯列表失败'
    }
  } catch (err: any) {
    error.value = err.message || '网络错误，请稍后重试'
    console.error('获取资讯列表失败:', err)
  } finally {
    loading.value = false
  }
}

const goToDetail = (id: number) => {
  router.push(`/articles/detail/${id}`)
}

const handleSearch = () => {
  currentPage.value = 1
  fetchArticles()
}

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchArticles()
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchArticles()
  }
}

const goToPage = (page: number) => {
  if (page !== currentPage.value) {
    currentPage.value = page
    fetchArticles()
  }
}

const goToHome = () => {
  router.push('/')
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
/* 全局样式 */
.articles-page {
  font-family: "Microsoft YaHei", sans-serif;
  min-height: 100vh;
  background: #fff;
}

/* 容器 */
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

/* 筛选区域 */
.filter-section {
  background: #f8fbf8;
  padding: 20px 0;
}

.filter-section .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-tabs {
  display: flex;
  gap: 12px;
}

.filter-tab {
  padding: 10px 24px;
  border: none;
  border-radius: 25px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e0e0e0;
}

.filter-tab.active {
  background: #2d5a27;
  color: #fff;
  border-color: #2d5a27;
}

.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 25px;
  padding: 6px 16px;
  border: 1px solid #e0e0e0;
}

.search-box input {
  border: none;
  outline: none;
  padding: 8px 12px;
  font-size: 14px;
  width: 200px;
  background: transparent;
}

.search-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
}

.search-btn:hover {
  color: #2d5a27;
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

/* 资讯列表区域 */
.articles-section {
  padding: 50px 0;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-card {
  display: flex;
  gap: 24px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.article-card:hover {
  box-shadow: 0 8px 24px rgba(45, 90, 39, 0.15);
  transform: translateY(-2px);
}

.article-image {
  flex-shrink: 0;
  width: 200px;
  height: 140px;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.article-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
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
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.5;
}

.article-summary {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 auto 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 16px;
  font-size: 13px;
  color: #999;
}

.article-author {
  padding-right: 16px;
  border-right: 1px solid #eee;
}

.article-time {
  padding-right: 16px;
  border-right: 1px solid #eee;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 50px;
}

.pagination-btn {
  padding: 12px 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background: #2d5a27;
  color: #fff;
  border-color: #2d5a27;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e0e0e0;
}

.page-number.active {
  background: #2d5a27;
  color: #fff;
  border-color: #2d5a27;
}

/* 响应式 */
@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .filter-section .container {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .filter-tabs {
    flex-wrap: wrap;
  }
  
  .article-card {
    flex-direction: column;
  }
  
  .article-image {
    width: 100%;
    height: 200px;
  }
  
  .banner-title {
    font-size: 28px;
  }
}
</style>
