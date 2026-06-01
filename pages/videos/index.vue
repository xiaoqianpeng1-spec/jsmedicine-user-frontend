<template>
  <div class="videos-page">
    <el-page-header @back="navigateTo('/')" content="视频" class="page-header">
      <template #extra>
        <el-input
          v-model="keyword"
          placeholder="搜索视频..."
          class="search-input"
          clearable
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button :icon="Search" @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </template>
    </el-page-header>

    <div class="page-content">
      <el-skeleton :loading="loading" :count="8" :rows="3" animated>
        <el-empty v-if="!loading && videos.length === 0" description="暂无视频" />
        <el-row :gutter="20" v-else>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.id">
            <el-card 
              class="video-card" 
              shadow="hover"
              @click="navigateTo(`/videos/${video.id}`)"
            >
              <div class="video-cover">
                <img :src="video.coverUrl || '/placeholder.jpg'" :alt="video.title" />
                <div class="video-duration">{{ formatDuration(video.durationSeconds) }}</div>
                <div class="video-play-icon">
                  <el-icon><VideoPlay /></el-icon>
                </div>
              </div>
              <div class="video-info">
                <h3 class="video-title">{{ video.title }}</h3>
                <p class="video-lecturer">{{ video.lecturerName }}</p>
                <div class="video-meta">
                  <span class="video-views">{{ video.viewCount }} 播放</span>
                  <span class="video-date">{{ formatDate(video.publishedAt) }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-pagination
          v-if="total > 0"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[8, 12, 20, 40]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          class="pagination"
        />
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, VideoPlay } from '@element-plus/icons-vue'

const keyword = ref('')
const videos = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(8)
const total = ref(0)

const fetchVideos = async () => {
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

const handleSearch = () => {
  currentPage.value = 1
  fetchVideos()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchVideos()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  fetchVideos()
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

const formatDuration = (seconds: number) => {
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
  background: #f5f7fa;
}

.page-header {
  background: #ffffff;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
}

.search-input {
  width: 400px;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.video-card {
  cursor: pointer;
  margin-bottom: 20px;
  height: 100%;
}

.video-card :deep(.el-card__body) {
  padding: 0;
}

.video-cover {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
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
  color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
}

.video-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .video-play-icon {
  opacity: 1;
}

.video-info {
  padding: 16px;
}

.video-title {
  font-size: 15px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-lecturer {
  font-size: 13px;
  color: #999999;
  margin-bottom: 8px;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999999;
}

.pagination {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .search-input {
    width: 100%;
    margin-top: 12px;
  }

  .video-cover {
    height: 160px;
  }
}
</style>
