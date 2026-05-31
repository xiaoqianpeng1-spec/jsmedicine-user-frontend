<template>
  <div class="knowledge-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">知识库</h1>
        <div class="search-bar">
          <input v-model="keyword" type="text" placeholder="搜索知识库..." class="search-input" @keyup.enter="handleSearch" />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="knowledge-content">
        <div class="knowledge-layout">
          <div class="category-sidebar">
            <h3 class="sidebar-title">分类</h3>
            <ul class="category-list">
              <li :class="['category-item', { active: selectedCategory === null }]" @click="selectCategory(null)">
                全部
              </li>
              <li v-for="cat in categories" :key="cat.id" :class="['category-item', { active: selectedCategory === cat.id }]" @click="selectCategory(cat.id)">
                {{ cat.categoryName }}
              </li>
            </ul>
          </div>

          <div class="entries-content">
            <div v-if="loading" class="loading-state">
              <div class="loading-spinner"></div>
              <p>加载中...</p>
            </div>

            <div v-else-if="entries.length === 0" class="empty-state">
              <p>暂无知识库条目</p>
            </div>

            <div v-else class="entries-list">
              <div v-for="entry in entries" :key="entry.id" class="entry-card" @click="navigateTo(`/knowledge/detail/${entry.id}`)">
                <div class="entry-info">
                  <h3 class="entry-title">{{ entry.title }}</h3>
                  <p class="entry-summary">{{ entry.summary }}</p>
                  <div class="entry-meta">
                    <span class="entry-category">{{ entry.categoryName }}</span>
                    <span class="entry-views">{{ entry.viewCount }} 阅读</span>
                  </div>
                </div>
                <span class="entry-arrow">›</span>
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
    </div>
  </div>
</template>

<script setup lang="ts">
const keyword = ref('')
const categories = ref<any[]>([])
const entries = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedCategory = ref<number | null>(null)

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

async function fetchCategories() {
  try {
    const { getKnowledgeCategoryTree } = await import('~/api')
    categories.value = await getKnowledgeCategoryTree()
  } catch (error) {
    console.error('获取分类失败:', error)
  }
}

async function fetchEntries() {
  loading.value = true
  try {
    const { searchKnowledgeEntries } = await import('~/api')
    const result = await searchKnowledgeEntries({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
      categoryId: selectedCategory.value || undefined,
    })
    entries.value = result.records || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取知识库条目失败:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  currentPage.value = 1
  fetchEntries()
}

function selectCategory(id: number | null) {
  selectedCategory.value = id
  currentPage.value = 1
  fetchEntries()
}

function changePage(page: number) {
  currentPage.value = page
  fetchEntries()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchCategories()
  fetchEntries()
})
</script>

<style scoped>
.knowledge-page {
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

.knowledge-content {
  padding: var(--spacing-xl) 0;
}

.knowledge-layout {
  display: flex;
  gap: var(--spacing-xl);
}

.category-sidebar {
  width: 200px;
  flex-shrink: 0;
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  height: fit-content;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-light);
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.category-item {
  padding: 8px 12px;
  font-size: 14px;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-item:hover {
  background: var(--bg-light);
  color: var(--text-primary);
}

.category-item.active {
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 500;
}

.entries-content {
  flex: 1;
  min-width: 0;
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

.entries-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.entry-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.entry-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.entry-info {
  flex: 1;
  min-width: 0;
}

.entry-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.entry-summary {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.entry-meta {
  display: flex;
  gap: var(--spacing-lg);
  font-size: 12px;
  color: var(--text-tertiary);
}

.entry-arrow {
  font-size: 24px;
  color: var(--text-tertiary);
  flex-shrink: 0;
  margin-left: var(--spacing-md);
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

@media (max-width: 768px) {
  .knowledge-layout {
    flex-direction: column;
  }

  .category-sidebar {
    width: 100%;
  }

  .category-list {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
