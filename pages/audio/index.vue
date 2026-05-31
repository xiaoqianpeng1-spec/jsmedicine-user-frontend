<template>
  <div class="audio-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">音频</h1>
        <div class="search-bar">
          <input v-model="keyword" type="text" placeholder="搜索音频..." class="search-input" @keyup.enter="handleSearch" />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="audio-content">
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="audios.length === 0" class="empty-state">
          <p>暂无音频</p>
        </div>

        <div v-else class="audio-list">
          <div v-for="audio in audios" :key="audio.id" class="audio-item" @click="navigateTo(`/audio/${audio.id}`)">
            <div class="audio-icon">
              <span>🎵</span>
            </div>
            <div class="audio-info">
              <h3 class="audio-title">{{ audio.title }}</h3>
              <p class="audio-desc">{{ audio.description }}</p>
              <div class="audio-meta">
                <span class="audio-duration">{{ formatDuration(audio.durationSeconds) }}</span>
                <span class="audio-views">{{ audio.playCount }} 播放</span>
                <span class="audio-date">{{ formatDate(audio.publishedAt) }}</span>
              </div>
            </div>
            <div class="audio-play-btn">
              <span>▶</span>
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
const audios = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

async function fetchAudios() {
  loading.value = true
  try {
    const { getPodcastList } = await import('~/api')
    const result = await getPodcastList({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
    })
    audios.value = result.records || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取音频列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  currentPage.value = 1
  fetchAudios()
}

function changePage(page: number) {
  currentPage.value = page
  fetchAudios()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

function formatDuration(seconds: number) {
  if (!seconds) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

onMounted(() => {
  fetchAudios()
})
</script>

<style scoped>
.audio-page {
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

.audio-content {
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

.audio-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.audio-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.audio-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.audio-icon {
  width: 60px;
  height: 60px;
  background: var(--primary-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.audio-info {
  flex: 1;
  min-width: 0;
}

.audio-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.audio-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.audio-meta {
  display: flex;
  gap: var(--spacing-lg);
  font-size: 12px;
  color: var(--text-tertiary);
}

.audio-play-btn {
  width: 40px;
  height: 40px;
  background: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg-white);
  font-size: 14px;
  flex-shrink: 0;
  transition: background var(--transition-fast);
}

.audio-item:hover .audio-play-btn {
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
