<template>
  <div class="topics-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">专题</h1>
        <div class="search-bar">
          <input v-model="keyword" type="text" placeholder="搜索专题..." class="search-input" @keyup.enter="handleSearch" />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="topics-content">
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="topics.length === 0" class="empty-state">
          <p>暂无专题</p>
        </div>

        <div v-else class="topics-grid">
          <div v-for="topic in topics" :key="topic.id" class="topic-card" @click="navigateTo(`/topics/${topic.id}`)">
            <div class="topic-cover">
              <img :src="topic.coverUrl || '/placeholder.jpg'" :alt="topic.title" />
            </div>
            <div class="topic-info">
              <h3 class="topic-title">{{ topic.title }}</h3>
              <p class="topic-summary">{{ topic.summary }}</p>
              <div class="topic-meta">
                <span class="topic-items">{{ topic.items?.length || 0 }} 个资源</span>
                <span class="topic-views">{{ topic.viewCount }} 浏览</span>
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
const topics = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

async function fetchTopics() {
  loading.value = true
  try {
    const { getTopicList } = await import('~/api')
    const result = await getTopicList({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
    })
    topics.value = result.records || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取专题列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  currentPage.value = 1
  fetchTopics()
}

function changePage(page: number) {
  currentPage.value = page
  fetchTopics()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchTopics()
})
</script>

<style scoped>
.topics-page {
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

.topics-content {
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

.topics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.topic-card {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.topic-cover {
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.topic-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topic-info {
  padding: var(--spacing-md);
}

.topic-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.topic-summary {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.topic-meta {
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
  .topics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .topics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .topics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
