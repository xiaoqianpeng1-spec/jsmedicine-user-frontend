<template>
  <div class="books-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">数字图书馆</h1>
        <p class="banner-desc">海量中医经典著作，随时随地阅读学习</p>
      </div>
    </section>

    <!-- 筛选区域 -->
    <section class="filter-section">
      <div class="container">
        <div v-if="categoriesLoading" class="loading-tabs">
          <div class="loading-tab"></div>
          <div class="loading-tab"></div>
          <div class="loading-tab"></div>
        </div>
        <div v-else-if="categoriesError" class="error-message">
          <p>{{ categoriesError }}</p>
          <button class="retry-btn" @click="loadCategories">重试</button>
        </div>
        <div v-else class="filter-tabs">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="filter-tab"
            :class="{ active: activeCategoryId === category.id }"
            @click="handleCategoryChange(category.id)"
          >
            {{ category.categoryName }}
          </button>
        </div>
      </div>
    </section>

    <!-- 搜索框 -->
    <section class="search-section">
      <div class="container">
        <div class="search-box">
          <input 
            type="text" 
            v-model="keyword" 
            placeholder="搜索图书名称..." 
            class="search-input"
            @keyup.enter="loadBooks"
          />
          <button class="search-btn" @click="loadBooks">
            搜索
          </button>
        </div>
      </div>
    </section>

    <!-- 图书列表 -->
    <section class="books-section">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="booksLoading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="booksError" class="error-state">
          <p>{{ booksError }}</p>
          <button class="retry-btn" @click="loadBooks">重试</button>
        </div>

        <!-- 图书卡片 -->
        <div v-else class="books-grid">
          <div 
            v-for="book in books" 
            :key="book.id" 
            class="book-card"
            @click="goToDetail(book.id)"
          >
            <div class="book-cover">
              <img :src="book.coverUrl" :alt="book.bookName" />
              <div v-if="book.favorited" class="favorite-badge">❤️</div>
            </div>
            <div class="book-info">
              <h3 class="book-title">{{ book.bookName }}</h3>
              <p class="book-author">{{ book.author }}</p>
              <p class="book-publisher">{{ book.publisher }}</p>
              <p class="book-desc">{{ book.introduction }}</p>
              <div class="book-meta">
                <span class="book-pages">{{ book.totalPages }} 页</span>
                <span class="book-reads">📖 {{ book.browseCount }} 人在读</span>
                <span class="book-favorites">❤️ {{ book.favoriteCount }}</span>
              </div>
              <div v-if="book.progressPercent > 0" class="progress-bar">
                <div class="progress-fill" :style="{ width: book.progressPercent + '%' }"></div>
                <span class="progress-text">已读 {{ book.progressPercent }}%</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!booksLoading && !booksError && books.length === 0" class="empty-state">
          <p>暂无图书</p>
        </div>
      </div>
    </section>

    <!-- 分页组件 -->
    <section class="pagination-section" v-if="total > pageSize">
      <div class="container">
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { booksApi, type AppBookResponse, type AppBookCategoryResponse } from '~/utils/api/books'

const router = useRouter()

const activeCategoryId = ref(0)
const categories = ref<AppBookCategoryResponse[]>([
  { id: 0, parentId: 0, categoryName: '全部', sortOrder: 0 }
])
const categoriesLoading = ref(false)
const categoriesError = ref('')

const books = ref<AppBookResponse[]>([])
const keyword = ref('')
const currentPage = ref(1)
const pageSize = ref(6)
const total = ref(0)
const booksLoading = ref(false)
const booksError = ref('')

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

const handleCategoryChange = (categoryId: number) => {
  activeCategoryId.value = categoryId
  currentPage.value = 1
  loadBooks()
}

const goToDetail = (id: number) => {
  router.push(`/books/${id}`)
}

const loadBooks = async () => {
  booksLoading.value = true
  booksError.value = ''

  try {
    const response = await booksApi.getBooks({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
      categoryId: activeCategoryId.value === 0 ? undefined : activeCategoryId.value
    })
    if (response.success) {
      books.value = response.data.records
      total.value = response.data.total
      currentPage.value = response.data.page
      pageSize.value = response.data.size
    } else {
      booksError.value = response.message || '获取图书列表失败'
    }
  } catch (err: any) {
    booksError.value = err.message || '网络错误，请稍后重试'
    console.error('Failed to load books:', err)
  } finally {
    booksLoading.value = false
  }
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadBooks()
}

const loadCategories = async () => {
  categoriesLoading.value = true
  categoriesError.value = ''

  try {
    const response = await booksApi.getBookCategories({
      page: 1,
      size: 100
    })
    if (response.success && response.data.records.length > 0) {
      categories.value = [
        { id: 0, parentId: 0, categoryName: '全部', sortOrder: 0 },
        ...response.data.records
      ]
    }
  } catch (err: any) {
    categoriesError.value = err.message || '获取分类失败'
    console.error('Failed to load categories:', err)
  } finally {
    categoriesLoading.value = false
  }
}

onMounted(() => {
  loadCategories()
  loadBooks()
})
</script>

<style scoped>
.books-page {
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

/* 筛选区域 */
.filter-section {
  background: #f8fbf8;
  padding: 20px 0;
}

.filter-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
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

/* 加载状态 */
.loading-tabs {
  display: flex;
  gap: 12px;
}

.loading-tab {
  width: 80px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 25px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* 错误提示 */
.error-message {
  padding: 16px;
  background: #fff3f3;
  border-radius: 8px;
  text-align: center;
}

.error-message p {
  color: #e53935;
  margin: 0 0 12px 0;
}

.error-message .retry-btn {
  padding: 8px 20px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

/* 图书列表区域 */
.books-section {
  padding: 50px 0;
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

.error-state .retry-btn {
  padding: 10px 24px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.book-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(45, 90, 39, 0.15);
}

.book-cover {
  position: relative;
  height: 220px;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  font-size: 16px;
}

.book-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #FF5722;
  padding: 4px 12px;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
}

.book-info {
  padding: 20px;
}

.book-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.book-author {
  font-size: 14px;
  color: #2d5a27;
  margin: 0 0 4px 0;
}

.book-publisher {
  font-size: 12px;
  color: #999;
  margin: 0 0 8px 0;
}

.book-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.book-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.book-pages,
.book-reads,
.book-favorites {
  font-size: 12px;
  color: #999;
}

/* 进度条 */
.progress-bar {
  position: relative;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  margin-top: 12px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2d5a27 0%, #38a169 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -18px;
  font-size: 12px;
  color: #2d5a27;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

/* 搜索区域 */
.search-section {
  padding: 20px 0;
  background: #fff;
}

.search-box {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: 8px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #2d5a27;
}

.search-btn {
  padding: 12px 24px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #1f421b;
}

/* 分页区域 */
.pagination-section {
  padding: 30px 0;
  background: #fff;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
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

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .banner-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
}
</style>