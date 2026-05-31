<template>
  <div class="consult-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">专家咨询</h1>
        <NuxtLink to="/consult/new" class="btn-new">
          <span>+</span> 发起咨询
        </NuxtLink>
      </div>
    </div>

    <div class="container">
      <div class="consult-content">
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="questions.length === 0" class="empty-state">
          <p>暂无咨询记录</p>
          <NuxtLink to="/consult/new" class="btn-empty">发起第一个咨询</NuxtLink>
        </div>

        <div v-else class="questions-list">
          <div v-for="question in questions" :key="question.id" class="question-card" @click="navigateTo(`/consult/${question.id}`)">
            <div class="question-header">
              <h3 class="question-title">{{ question.title }}</h3>
              <span :class="['status-badge', `status-${question.status.toLowerCase()}`]">
                {{ getStatusText(question.status) }}
              </span>
            </div>
            <p class="question-content">{{ question.content }}</p>
            <div class="question-footer">
              <span class="question-date">{{ formatDate(question.createdAt) }}</span>
              <span class="question-answers">{{ question.answers?.length || 0 }} 条回复</span>
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
const questions = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

async function fetchQuestions() {
  loading.value = true
  try {
    const { getMyQuestions } = await import('~/api')
    const result = await getMyQuestions({
      page: currentPage.value,
      size: pageSize.value,
    })
    questions.value = result.records || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取咨询列表失败:', error)
  } finally {
    loading.value = false
  }
}

function changePage(page: number) {
  currentPage.value = page
  fetchQuestions()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function getStatusText(status: string) {
  const statusMap: Record<string, string> = {
    PENDING: '待回复',
    ANSWERED: '已回复',
    CLOSED: '已关闭',
  }
  return statusMap[status] || status
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

onMounted(() => {
  fetchQuestions()
})
</script>

<style scoped>
.consult-page {
  min-height: 100vh;
  background: var(--bg-body);
}

.page-header {
  background: var(--bg-white);
  padding: var(--spacing-lg) 0;
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}

.btn-new {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 10px 24px;
  background: var(--primary);
  color: var(--bg-white);
  border-radius: var(--radius-md);
  font-size: 14px;
  transition: background var(--transition-fast);
}

.btn-new:hover {
  background: var(--primary-dark);
}

.consult-content {
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

.btn-empty {
  display: inline-block;
  margin-top: var(--spacing-md);
  padding: 10px 24px;
  background: var(--primary);
  color: var(--bg-white);
  border-radius: var(--radius-md);
  font-size: 14px;
  transition: background var(--transition-fast);
}

.btn-empty:hover {
  background: var(--primary-dark);
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.question-card {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.question-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
}

.question-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  flex: 1;
}

.status-badge {
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  flex-shrink: 0;
  margin-left: var(--spacing-md);
}

.status-pending {
  background: #fff3e0;
  color: #f57c00;
}

.status-answered {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.status-closed {
  background: #f5f5f5;
  color: var(--text-tertiary);
}

.question-content {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.question-footer {
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
</style>
