<template>
  <div class="exam-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">在线考核</h1>
      </div>
    </div>

    <div class="container">
      <div class="exam-content">
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="papers.length === 0" class="empty-state">
          <p>暂无考试</p>
        </div>

        <div v-else class="papers-list">
          <div v-for="paper in papers" :key="paper.id" class="paper-card" @click="navigateTo(`/exam/${paper.id}`)">
            <div class="paper-info">
              <h3 class="paper-title">{{ paper.paperName }}</h3>
              <p class="paper-desc">{{ paper.description }}</p>
              <div class="paper-meta">
                <span class="paper-score">总分: {{ paper.totalScore }}分</span>
                <span class="paper-pass">及格: {{ paper.passScore }}分</span>
                <span class="paper-duration">时长: {{ paper.durationMinutes }}分钟</span>
                <span class="paper-questions">题数: {{ paper.questionCount }}</span>
              </div>
            </div>
            <div class="paper-action">
              <span class="btn-start">开始考试</span>
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
const papers = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

async function fetchPapers() {
  loading.value = true
  try {
    const { getExamPapers } = await import('~/api')
    const result = await getExamPapers({
      page: currentPage.value,
      size: pageSize.value,
    })
    papers.value = result.records || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取试卷列表失败:', error)
  } finally {
    loading.value = false
  }
}

function changePage(page: number) {
  currentPage.value = page
  fetchPapers()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchPapers()
})
</script>

<style scoped>
.exam-page {
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
}

.exam-content {
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

.papers-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.paper-card {
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

.paper-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.paper-info {
  flex: 1;
}

.paper-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.paper-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.paper-meta {
  display: flex;
  gap: var(--spacing-lg);
  font-size: 13px;
  color: var(--text-tertiary);
}

.paper-action {
  flex-shrink: 0;
  margin-left: var(--spacing-lg);
}

.btn-start {
  display: inline-block;
  padding: 10px 24px;
  background: var(--primary);
  color: var(--bg-white);
  border-radius: var(--radius-md);
  font-size: 14px;
  transition: background var(--transition-fast);
}

.paper-card:hover .btn-start {
  background: var(--primary-dark);
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
</style>
