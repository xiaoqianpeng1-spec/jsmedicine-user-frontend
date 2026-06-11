<template>
  <div class="video-detail-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">视频课程</h1>
        <p class="banner-desc">名师授课，随时随地学习中医知识</p>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item" @click="goToVideo">视频</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">{{ course.courseName }}</span>
        </div>
      </div>
    </div>

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
        <p>观看课程需要先登录账号</p>
        <button class="login-btn" @click="goToLogin">立即登录</button>
      </div>
      <div v-else>
        <p>{{ error }}</p>
        <button class="retry-btn" @click="fetchCourseDetail">重试</button>
      </div>
    </div>

    <!-- 视频内容区域 -->
    <section v-else class="video-content-section">
      <div class="container">
        <!-- 视频播放器 -->
        <div class="video-player-wrapper">
          <!-- 当前视频信息 -->
          <div v-if="currentVideo" class="current-video-info">
            <h3 class="current-video-title">{{ currentVideo.title }}</h3>
            <div class="current-video-meta">
              <span class="meta-tag" v-if="currentVideo.paperId">包含习题</span>
              <span class="meta-duration">时长：{{ formatDuration(currentVideo.durationSeconds) }}</span>
            </div>
          </div>
          
          <div class="video-player">
            <video
              v-if="getCurrentVideoUrl"
              ref="videoRef"
              :src="getCurrentVideoUrl"
              class="video-element"
              @loadedmetadata="handleVideoLoaded"
              @timeupdate="handleTimeUpdate"
              @ended="handleVideoEnded"
              @play="isPlaying = true"
              @pause="isPlaying = false"
              @error="handleVideoError"
            ></video>
            <div v-else class="video-poster-wrapper">
              <img 
                :src="course.coverUrl || 'https://via.placeholder.com/1280x720?text=课程封面'" 
                :alt="course.courseName" 
                class="video-poster" 
              />
              <div class="video-overlay">
                <span class="overlay-text">暂无播放源</span>
              </div>
            </div>
            <!-- 视频加载错误提示 -->
            <div v-if="videoError" class="video-error-overlay">
              <p>⚠️ {{ videoError }}</p>
              <button class="retry-video-btn" @click="retryVideo">重新加载</button>
            </div>
            <div class="video-controls">
              <button class="play-button" @click="togglePlay">
                {{ isPlaying ? '⏸' : '▶' }}
              </button>
              <div class="progress-bar" @click="handleProgressClick">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                <div class="progress-dot" :style="{ left: progress + '%' }"></div>
              </div>
              <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
              <button class="volume-button" @click="toggleMute">
                {{ isMuted ? '🔇' : '🔊' }}
              </button>
              <button class="quality-button">1080P</button>
              <button class="fullscreen-button" @click="toggleFullscreen">⛶</button>
            </div>
          </div>
        </div>

        <!-- 标签切换 -->
        <div class="tab-container">
          <div class="tabs">
            <button 
              class="tab" 
              :class="{ active: activeTab === 'intro' }"
              @click="activeTab = 'intro'"
            >
              简介
            </button>
            <button 
              class="tab" 
              :class="{ active: activeTab === 'catalog' }"
              @click="activeTab = 'catalog'"
            >
              目录 ({{ course.videos?.length || 0 }})
            </button>
          </div>

          <!-- 简介内容 -->
          <div v-if="activeTab === 'intro'" class="tab-content intro-content">
            <h2 class="content-title">{{ course.courseName }}</h2>
            <p class="content-subtitle">{{ course.subtitle }}</p>
            <div class="video-meta">
              <span class="meta-item">👁️ {{ formatNumber(course.browseCount || 0) }}</span>
              <span class="meta-item">⭐ {{ formatNumber(course.favoriteCount || 0) }}</span>
              <span class="meta-item" v-if="course.progressPercent > 0">
                📊 进度：{{ course.progressPercent }}%
              </span>
            </div>
            <div class="intro-section">
              <h3 class="section-title">课程介绍</h3>
              <p class="intro-text">{{ course.introduction || '暂无介绍' }}</p>
            </div>
            <div class="lecturer-section">
              <h3 class="section-title">讲师介绍</h3>
              <p class="lecturer-name">{{ course.lecturerName }}</p>
            </div>
            <div class="course-info">
              <h3 class="section-title">课程信息</h3>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">视频数量：</span>
                  <span class="info-value">{{ course.videos?.length || 0 }} 个</span>
                </div>
                <div class="info-item">
                  <span class="info-label">总时长：</span>
                  <span class="info-value">{{ formatTotalDuration }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">发布时间：</span>
                  <span class="info-value">{{ formatDate(course.publishedAt) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">学习时长：</span>
                  <span class="info-value">{{ formatStudyTime }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 目录内容 -->
          <div v-if="activeTab === 'catalog'" class="tab-content catalog-content">
            <div 
              v-for="(video, index) in course.videos" 
              :key="video.id || index"
              class="chapter-item"
              :class="{ active: currentVideoIndex === index }"
              @click="playVideo(index)"
            >
              <div class="chapter-info">
                <span class="chapter-number">{{ index + 1 }}</span>
                <span class="chapter-title">{{ video.title }}</span>
              </div>
              <div class="chapter-actions">
                <span class="chapter-duration">{{ formatDuration(video.durationSeconds) }}</span>
                <span v-if="video.paperId" class="chapter-exam">📝</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { learningApi, type AppCourseResponse, type AppCourseVideoResponse } from '~/utils/api/learning'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

const loading = ref(false)
const error = ref('')
const activeTab = ref('intro')
const currentVideoIndex = ref(0)
const progress = ref(0)
const isPlaying = ref(false)
const isMuted = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const videoRef = ref<HTMLVideoElement | null>(null)
const videoError = ref('')

const course = reactive<AppCourseResponse>({
  id: 0,
  courseName: '',
  subtitle: '',
  coverUrl: '',
  lecturerName: '',
  introduction: '',
  paperId: 0,
  publishedAt: '',
  browseCount: 0,
  favoriteCount: 0,
  favorited: false,
  progressPercent: 0,
  studySeconds: 0,
  videos: []
})

// 当前视频
const currentVideo = computed(() => {
  if (course.videos && course.videos.length > 0 && currentVideoIndex.value < course.videos.length) {
    return course.videos[currentVideoIndex.value]
  }
  return null
})

// 格式化总时长
const formatTotalDuration = computed(() => {
  if (!course.videos || course.videos.length === 0) return '0分钟'
  
  const totalSeconds = course.videos.reduce((sum, video) => sum + (video.durationSeconds || 0), 0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
})

// 格式化学习时长
const formatStudyTime = computed(() => {
  const seconds = course.studySeconds || 0
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
})

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return '未知'
  try {
    const date = new Date(dateStr)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  } catch {
    return dateStr
  }
}

// 获取课程详情
const fetchCourseDetail = async () => {
  loading.value = true
  error.value = ''

  try {
    const courseId = route.params.id as string
    const videoId = route.query.videoId as string
    
    const data: any = await learningApi.getCourseDetail(parseInt(courseId))

    if (data.success && data.data) {
      console.log('课程详情数据:', data.data)
      console.log('视频列表:', data.data.videos)
      Object.assign(course, data.data)
      
      // 如果有视频ID参数，定位到对应的视频
      if (videoId && course.videos) {
        const index = course.videos.findIndex(v => v.id === parseInt(videoId))
        if (index !== -1) {
          currentVideoIndex.value = index
        }
      }
      
      // 如果有视频，设置默认视频时长
      if (course.videos && course.videos.length > 0) {
        const currentVideoItem = course.videos[currentVideoIndex.value]
        console.log('当前视频数据:', currentVideoItem)
        duration.value = currentVideoItem?.durationSeconds || 120
      }
    } else {
      error.value = data.message || '获取课程详情失败'
    }
  } catch (err: any) {
    error.value = err.message || '网络错误，请稍后重试'
    console.error('获取课程详情失败:', err)
  } finally {
    loading.value = false
  }
}

// 获取当前视频的有效URL
const getCurrentVideoUrl = computed(() => {
  if (!currentVideo.value) return null
  
  const baseUrl = config.public.apiBase || ''
  
  // 检查所有可能的视频URL字段名
  const video = currentVideo.value as any
  const possibleFields = ['videoUrl', 'video_url', 'url', 'src', 'videoSrc']
  
  for (const field of possibleFields) {
    if (video[field]) {
      let videoUrl = video[field]
      
      // 如果是绝对URL，直接返回
      if (videoUrl.startsWith('http://') || videoUrl.startsWith('https://')) {
        return videoUrl
      }
      
      // 如果URL已经以 /api/v1 开头，直接使用（避免路径重复）
      if (videoUrl.startsWith('/api/v1')) {
        return videoUrl
      }
      
      // 如果是相对路径，拼接baseUrl
      if (videoUrl.startsWith('/')) {
        videoUrl = baseUrl + videoUrl
      } else {
        videoUrl = baseUrl + '/' + videoUrl
      }
      
      return videoUrl
    }
  }
})

// 获取单个视频详情
const fetchVideoDetail = async (courseId: number, videoId: number) => {
  try {
    const data: any = await learningApi.getCourseVideoDetail(courseId, videoId)
    
    if (data.success && data.data) {
      // 可以在这里更新视频信息或进行其他操作
      console.log('视频详情:', data.data)
    }
  } catch (err: any) {
    console.error('获取视频详情失败:', err)
  }
}

// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toString()
}

// 格式化时长
const formatDuration = (seconds: number) => {
  if (!seconds) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 格式化时间
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 播放视频
const playVideo = (index: number) => {
  currentVideoIndex.value = index
  
  if (course.videos && course.videos.length > index) {
    const video = course.videos[index]
    duration.value = video.durationSeconds || 120
    progress.value = 0
    currentTime.value = 0
    
    if (getCurrentVideoUrl.value && videoRef.value) {
      videoRef.value.load()
      videoRef.value.play().catch(err => {
        console.error('视频播放失败:', err)
      })
    }
    
    if (course.id && video.id) {
      fetchVideoDetail(course.id, video.id)
    }
  }
}

// 模拟播放进度（当没有真实视频URL时使用）
let playbackTimer: NodeJS.Timeout | null = null
const simulatePlayback = () => {
  if (playbackTimer) {
    clearInterval(playbackTimer)
  }
  
  playbackTimer = setInterval(() => {
    if (isPlaying.value && currentTime.value < duration.value) {
      currentTime.value++
      progress.value = (currentTime.value / duration.value) * 100
    } else if (currentTime.value >= duration.value) {
      isPlaying.value = false
      if (playbackTimer) {
        clearInterval(playbackTimer)
      }
    }
  }, 1000)
}

// 视频加载错误处理
const handleVideoError = (e: Event) => {
  const video = e.target as HTMLVideoElement
  console.error('视频加载失败:', video.error?.message)
  videoError.value = '视频加载失败，请检查网络或稍后重试'
  isPlaying.value = false
}

// 重试加载视频
const retryVideo = () => {
  videoError.value = ''
  if (videoRef.value && getCurrentVideoUrl.value) {
    videoRef.value.load()
    videoRef.value.play().catch(err => {
      console.error('视频播放失败:', err)
      videoError.value = '视频播放失败，请稍后重试'
    })
  }
}

// 视频元数据加载完成
const handleVideoLoaded = (e: Event) => {
  const video = e.target as HTMLVideoElement
  duration.value = video.duration
  videoError.value = '' // 清除错误状态
}

// 视频时间更新
const handleTimeUpdate = (e: Event) => {
  const video = e.target as HTMLVideoElement
  currentTime.value = video.currentTime
  progress.value = (video.currentTime / video.duration) * 100
}

// 视频播放结束
const handleVideoEnded = () => {
  isPlaying.value = false
  // 播放下一集（如果有）
  if (course.videos && currentVideoIndex.value < course.videos.length - 1) {
    setTimeout(() => {
      playVideo(currentVideoIndex.value + 1)
    }, 2000)
  }
}

// 播放/暂停
const togglePlay = () => {
  if (!videoRef.value || !getCurrentVideoUrl.value) {
    return
  }

  if (isPlaying.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
}

// 静音切换
const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (videoRef.value) {
    videoRef.value.muted = isMuted.value
  }
}

// 全屏切换
const toggleFullscreen = () => {
  if (videoRef.value) {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoRef.value.requestFullscreen()
    }
  }
}

// 进度条点击
const handleProgressClick = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  progress.value = percent * 100
  
  if (videoRef.value && currentVideo.value?.videoUrl) {
    videoRef.value.currentTime = videoRef.value.duration * percent
  } else {
    currentTime.value = duration.value * percent
  }
}

const goToHome = () => {
  router.push('/')
}

const goToVideo = () => {
  router.push('/video')
}

const goToLogin = () => {
  router.push('/')
}

// 页面加载时获取数据
onMounted(() => {
  fetchCourseDetail()
})

// 组件卸载时清理
onUnmounted(() => {
  if (playbackTimer) {
    clearInterval(playbackTimer)
  }
  if (videoRef.value) {
    videoRef.value.pause()
  }
})
</script>

<style scoped>
.video-detail-page {
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

/* 面包屑导航 */
.breadcrumb-section {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.breadcrumb-item {
  cursor: pointer;
  transition: color 0.3s;
}

.breadcrumb-item:hover {
  color: #2d5a27;
}

.breadcrumb-item.active {
  color: #999;
  cursor: default;
}

.breadcrumb-separator {
  color: #ccc;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2d5a27;
  border-radius: 50%;
  animation: spin 1s linear infinite;
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
  transition: background 0.3s;
}

.login-btn:hover {
  background: #3d7a37;
}

/* 视频内容区域 */
.video-content-section {
  padding: 30px 0 50px;
}

/* 视频播放器 */
.video-player-wrapper {
  margin-bottom: 24px;
}

/* 当前视频信息 */
.current-video-info {
  margin-bottom: 16px;
  padding: 16px;
  background: #f8fbf8;
  border-radius: 8px;
  border-left: 4px solid #2d5a27;
}

.current-video-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.current-video-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-tag {
  background: #2d5a27;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.meta-duration {
  color: #666;
  font-size: 14px;
}

.video-player {
  position: relative;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.video-poster-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-error-overlay {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 16px;
  text-align: center;
}

.video-error-overlay p {
  color: #ff6b6b;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.retry-video-btn {
  padding: 8px 24px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-text {
  color: #fff;
  font-size: 18px;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.play-button {
  width: 36px;
  height: 36px;
  background: #2d5a27;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: #333;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: #2d5a27;
  border-radius: 2px;
  transition: width 0.3s;
}

.progress-dot {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
}

.time-display {
  color: #fff;
  font-size: 12px;
  min-width: 90px;
}

.volume-button,
.fullscreen-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.quality-button {
  background: none;
  border: 1px solid #fff;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

/* 标签容器 */
.tab-container {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
}

.tab {
  padding: 16px 32px;
  background: #f8f8f8;
  border: none;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.tab:hover {
  background: #f0f0f0;
}

.tab.active {
  background: #fff;
  color: #2d5a27;
  border-bottom: 2px solid #2d5a27;
}

/* 标签内容 */
.tab-content {
  padding: 24px;
}

/* 简介内容 */
.intro-content .content-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.content-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
}

.video-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.meta-item {
  font-size: 14px;
  color: #999;
}

.intro-section,
.lecturer-section {
  margin-bottom: 24px;
}

.intro-section:last-child,
.lecturer-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.intro-text {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}

.lecturer-name {
  font-size: 14px;
  color: #2d5a27;
  margin: 0;
}

.course-info {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-label {
  font-size: 14px;
  color: #999;
}

.info-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* 目录内容 */
.catalog-content .chapter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 8px;
}

.catalog-content .chapter-item:last-child {
  margin-bottom: 0;
}

.catalog-content .chapter-item:hover {
  background: #f8fbf8;
}

.catalog-content .chapter-item.active {
  background: #2d5a27;
}

.chapter-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chapter-number {
  width: 28px;
  height: 28px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}

.catalog-content .chapter-item.active .chapter-number {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.chapter-title {
  font-size: 14px;
  color: #333;
}

.catalog-content .chapter-item.active .chapter-title {
  color: #fff;
}

.chapter-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chapter-duration {
  font-size: 14px;
  color: #999;
}

.catalog-content .chapter-item.active .chapter-duration {
  color: rgba(255, 255, 255, 0.8);
}

.chapter-exam {
  font-size: 14px;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .banner-title {
    font-size: 28px;
  }
  
  .video-controls {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .progress-bar {
    order: 4;
    width: 100%;
  }
}
</style>
