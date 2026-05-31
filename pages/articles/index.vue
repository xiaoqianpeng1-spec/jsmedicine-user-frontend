<template>
  <div class="articles-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">资讯</h1>
        <div class="search-bar">
          <input v-model="keyword" type="text" placeholder="搜索资讯..." class="search-input" @keyup.enter="handleSearch" />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="articles-content">
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="articles.length === 0" class="empty-state">
          <p>暂无资讯</p>
        </div>

        <div v-else class="articles-grid">
          <div v-for="article in articles" :key="article.id" class="article-card" @click="navigateTo(`/articles/detail/${article.id}`)">
            <div class="article-cover">
              <img :src="article.coverUrl || '/placeholder.jpg'" :alt="article.title" />
            </div>
            <div class="article-info">
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-summary">{{ article.summary }}</p>
              <div class="article-meta">
                <span class="article-date">{{ formatDate(article.publishedAt) }}</span>
                <span class="article-views">{{ article.viewCount }} 阅读</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="totalPages > 1" class="pagination">
          <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">上一页</button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const keyword = ref('')
const articles = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

async function fetchArticles() {
  loading.value = true
  try {
    const { searchKnowledgeEntries } = await import('~/api')
    const result = await searchKnowledgeEntries({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
    })
    articles.value = result.records?.map((item: any) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      coverUrl: item.coverUrl || '',
      viewCount: item.viewCount || 0,
      publishedAt: item.publishedAt || '',
    })) || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取资讯列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  currentPage.value = 1
  fetchArticles()
}

function changePage(page: number) {
  currentPage.value = page
  fetchArticles()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.articles-page {
  min-height: 100vh;
  background: var(--bg-body);
}

.page-header {
  background: var(--bg-white);
  padding: var(--spacing-lg) 0;
  box-shadow: var(--shadow-sm);
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.search-bar {
  display: flex;
  gap: var(--spacing-sm);
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  outline: none;
  transition: border-color var(--transition-fast);
}

.search-input:focus {
  border-color: var(--primary);
}

.search-btn {
  padding: 10px 24px;
  background: var(--primary);
  color: var(--bg-white);
  border-radius: var(--radius-md);
  font-size: 14px;
  transition: background var(--transition-fast);
}

.search-btn:hover {
  background: var(--primary-dark);
}

.articles-content {
  padding: var(--spacing-xl) 0;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: var(--spacing-xxl) 0;
  color: var(--text-tertiary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto var(--spacing-md);
  border: 3px solid var(--border-light);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.article-card {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.article-cover {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-info {
  padding: var(--spacing-md);
}

.article-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-summary {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-tertiary);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.pagination button {
  padding: 8px 20px;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.pagination button:hover:not(:disabled) {
  background: var(--primary);
  color: var(--bg-white);
  border-color: var(--primary);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
