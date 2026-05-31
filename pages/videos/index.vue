<template>
  <div class="videos-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">视频</h1>
        <div class="search-bar">
          <input v-model="keyword" type="text" placeholder="搜索视频..." class="search-input" @keyup.enter="handleSearch" />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="videos-content">
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="videos.length === 0" class="empty-state">
          <p>暂无视频</p>
        </div>

        <div v-else class="videos-grid">
          <div v-for="video in videos" :key="video.id" class="video-card" @click="navigateTo(`/videos/${video.id}`)">
            <div class="video-cover">
              <img :src="video.coverUrl || '/placeholder.jpg'" :alt="video.title" />
              <div class="video-duration">{{ formatDuration(video.durationSeconds) }}</div>
            </div>
            <div class="video-info">
              <h3 class="video-title">{{ video.title }}</h3>
              <p class="video-lecturer">{{ video.lecturerName }}</p>
              <div class="video-meta">
                <span class="video-views">{{ video.viewCount }} 播放</span>
                <span class="video-date">{{ formatDate(video.publishedAt) }}</span>
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
const videos = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

async function fetchVideos() {
  loading.value = true
  try {
    const { getCourseList } = await import('~/api')
    const result = await getCourseList({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
    })
    videos.value = result.records?.map((item: any) => ({
      id: item.id,
      title: item.courseName,
      coverUrl: item.coverUrl,
      lecturerName: item.lecturerName,
      durationSeconds: item.videos?.reduce((sum: number, v: any) => sum + (v.durationSeconds || 0), 0) || 0,
      viewCount: item.viewCount || 0,
      publishedAt: item.publishedAt,
    })) || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取视频列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  currentPage.value = 1
  fetchVideos()
}

function changePage(page: number) {
  currentPage.value = page
  fetchVideos()
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
  fetchVideos()
})
</script>

<style scoped>
.videos-page {
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

.videos-content {
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

.videos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.video-card {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.video-cover {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.video-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 2px 8px;
  background: rgba(0, 0, 0, 0.7);
  color: var(--bg-white);
  border-radius: var(--radius-sm);
  font-size: 12px;
}

.video-info {
  padding: var(--spacing-md);
}

.video-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-lecturer {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-sm);
}

.video-meta {
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
  .videos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
