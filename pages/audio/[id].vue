<template>
  <div class="audio-detail-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">音频课程</h1>
        <p class="banner-desc">随时随地，听学中医知识</p>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item" @click="goToAudio">音频</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">{{ podcast.title }}</span>
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
        <p>收听音频课程需要先登录账号</p>
        <button class="login-btn" @click="goToHome">立即登录</button>
      </div>
      <div v-else>
        <p>{{ error }}</p>
        <button class="retry-btn" @click="fetchPodcastDetail">重试</button>
      </div>
    </div>

    <!-- 音频内容区域 -->
    <section v-else class="audio-content-section">
      <div class="container">
        <!-- 音频播放器 -->
        <div class="audio-player-wrapper">
          <div class="audio-player">
            <div class="player-inner">
              <div class="album-cover">
                <img :src="podcast.coverUrl || 'https://via.placeholder.com/200x200?text=音频封面'" :alt="podcast.title" />
                <div class="cover-overlay">
                  <div class="disc-rotate" :class="{ playing: isPlaying }">
                    <div class="disc-center"></div>
                  </div>
                </div>
              </div>
              <div class="player-controls">
                <audio
                  ref="audioRef"
                  :src="getCurrentAudioUrl"
                  @loadedmetadata="handleAudioLoaded"
                  @timeupdate="handleTimeUpdate"
                  @ended="handleAudioEnded"
                  @play="isPlaying = true"
                  @pause="isPlaying = false"
                ></audio>
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
              </div>
            </div>
            <!-- 当前音频信息 -->
            <div v-if="currentAudio" class="current-audio-info">
              <h3 class="current-audio-title">{{ currentAudio.title }}</h3>
              <div class="current-audio-meta">
                <span class="meta-duration">时长：{{ formatDuration(currentAudio.durationSeconds) }}</span>
              </div>
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
              目录
            </button>
          </div>

          <!-- 简介内容 -->
          <div v-if="activeTab === 'intro'" class="tab-content intro-content">
            <h2 class="content-title">{{ podcast.title }}</h2>
            <div class="audio-meta">
              <span class="meta-item">主讲：{{ podcast.speakerName }}</span>
              <span class="meta-item">📅 {{ formatDate(podcast.publishedAt) }}</span>
              <span class="meta-item">👁️ {{ formatNumber(podcast.browseCount) }}</span>
              <span class="meta-item">⭐ {{ formatNumber(podcast.favoriteCount) }}</span>
            </div>
            <div class="intro-section">
              <h3 class="section-title">音频介绍</h3>
              <p class="intro-text">{{ podcast.summary }}</p>
            </div>
            <div v-if="podcast.tags && podcast.tags.length > 0" class="tags-section">
              <h3 class="section-title">标签</h3>
              <div class="tags-list">
                <span v-for="tag in podcast.tags" :key="tag" class="tag-item">{{ tag }}</span>
              </div>
            </div>
            <div class="progress-section">
              <h3 class="section-title">学习进度</h3>
              <div class="progress-info">
                <div class="progress-bar-wrapper">
                  <div class="progress-fill-full" :style="{ width: podcast.progressPercent + '%' }"></div>
                </div>
                <div class="progress-stats">
                  <span class="progress-percent">已学习 {{ podcast.progressPercent }}%</span>
                  <span class="progress-time">累计学习 {{ formatDuration(podcast.studySeconds) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 目录内容 -->
          <div v-if="activeTab === 'catalog'" class="tab-content catalog-content">
            <div 
              v-for="(audio, index) in podcast.audios" 
              :key="audio.id"
              class="chapter-item"
              :class="{ active: currentAudioIndex === index }"
              @click="playAudio(index)"
            >
              <span class="chapter-title">{{ audio.title }}</span>
              <span class="chapter-duration">{{ formatDuration(audio.durationSeconds) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { learningApi, type AppPodcastResponse, type AppPodcastAudioResponse } from '~/utils/api/learning'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const error = ref('')
const activeTab = ref('intro')
const progress = ref(0)
const currentAudioIndex = ref(0)
const isPlaying = ref(false)
const isMuted = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const audioRef = ref<HTMLAudioElement | null>(null)

const podcast = reactive<AppPodcastResponse>({
  id: 0,
  title: '',
  summary: '',
  coverUrl: '',
  speakerName: '',
  tags: [],
  publishedAt: '',
  browseCount: 0,
  favoriteCount: 0,
  favorited: false,
  progressPercent: 0,
  studySeconds: 0,
  audios: []
})

// 当前音频
const currentAudio = computed(() => {
  if (podcast.audios && podcast.audios.length > 0 && currentAudioIndex.value < podcast.audios.length) {
    return podcast.audios[currentAudioIndex.value]
  }
  return null
})

// 获取当前音频的有效URL
const getCurrentAudioUrl = computed(() => {
  if (!currentAudio.value) return null
  
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || ''
  
  const audio = currentAudio.value as any
  const possibleFields = ['audioUrl', 'audio_url', 'url', 'src', 'audioSrc']
  
  for (const field of possibleFields) {
    if (audio[field]) {
      let audioUrl = audio[field]
      
      // 如果是绝对URL，直接返回
      if (audioUrl.startsWith('http://') || audioUrl.startsWith('https://')) {
        return audioUrl
      }
      
      // 如果URL已经以 /api/v1 开头，直接使用（避免路径重复）
      if (audioUrl.startsWith('/api/v1')) {
        return audioUrl
      }
      
      // 如果是相对路径，拼接baseUrl
      if (audioUrl.startsWith('/')) {
        audioUrl = baseUrl + audioUrl
      } else {
        audioUrl = baseUrl + '/' + audioUrl
      }
      
      return audioUrl
    }
  }
  
  return null
})

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

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch {
    return dateStr
  }
}

// 获取播客详情
const fetchPodcastDetail = async () => {
  loading.value = true
  error.value = ''

  try {
    const podcastId = route.params.id as string
    const audioId = route.query.audioId as string
    
    const data: any = await learningApi.getPodcastDetail(parseInt(podcastId))

    if (data.success && data.data) {
      Object.assign(podcast, data.data)
      
      // 如果有音频ID参数，定位到对应的音频
      if (audioId && podcast.audios) {
        const index = podcast.audios.findIndex(a => a.id === parseInt(audioId))
        if (index !== -1) {
          currentAudioIndex.value = index
        }
      }
      
      // 如果有音频，设置默认音频时长
      if (podcast.audios && podcast.audios.length > 0) {
        const currentAudioItem = podcast.audios[currentAudioIndex.value]
        duration.value = currentAudioItem?.durationSeconds || 0
      }
    } else {
      error.value = data.message || '获取播客详情失败'
    }
  } catch (err: any) {
    error.value = err.message || '网络错误，请稍后重试'
    console.error('获取播客详情失败:', err)
  } finally {
    loading.value = false
  }
}

// 播放音频
const playAudio = (index: number) => {
  currentAudioIndex.value = index
  
  if (podcast.audios && podcast.audios.length > index) {
    const audio = podcast.audios[index]
    duration.value = audio.durationSeconds || 0
    progress.value = 0
    currentTime.value = 0
    
    if (getCurrentAudioUrl.value && audioRef.value) {
      audioRef.value.src = getCurrentAudioUrl.value
      audioRef.value.load()
      audioRef.value.play().catch(err => {
        console.error('音频播放失败:', err)
      })
    }
  }
}

// 播放/暂停
const togglePlay = () => {
  if (!audioRef.value || !getCurrentAudioUrl.value) {
    return
  }

  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
}

// 静音切换
const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (audioRef.value) {
    audioRef.value.muted = isMuted.value
  }
}

// 进度条点击
const handleProgressClick = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  progress.value = percent * 100
  
  if (audioRef.value && getCurrentAudioUrl.value) {
    audioRef.value.currentTime = audioRef.value.duration * percent
  } else {
    currentTime.value = duration.value * percent
  }
}

// 音频元数据加载完成
const handleAudioLoaded = (e: Event) => {
  const audio = e.target as HTMLAudioElement
  duration.value = audio.duration
}

// 音频时间更新
const handleTimeUpdate = (e: Event) => {
  const audio = e.target as HTMLAudioElement
  currentTime.value = audio.currentTime
  progress.value = (audio.currentTime / audio.duration) * 100
}

// 音频播放结束
const handleAudioEnded = () => {
  isPlaying.value = false
  // 播放下一集（如果有）
  if (podcast.audios && currentAudioIndex.value < podcast.audios.length - 1) {
    setTimeout(() => {
      playAudio(currentAudioIndex.value + 1)
    }, 2000)
  }
}

const goToHome = () => {
  router.push('/')
}

const goToAudio = () => {
  router.push('/audio')
}

// 页面加载时获取数据
onMounted(() => {
  fetchPodcastDetail()
})

// 组件卸载时清理
onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.pause()
  }
})
</script>

<style scoped>
.audio-detail-page {
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
  text-align: center;
  padding: 100px 0;
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

.loading-state p {
  color: #666;
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

/* 音频内容区域 */
.audio-content-section {
  padding: 30px 0 50px;
}

/* 音频播放器 */
.audio-player-wrapper {
  margin-bottom: 24px;
}

.audio-player {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 40px;
}

.player-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.album-cover {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.disc-rotate {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(135deg, #333 0%, #555 50%, #333 100%);
  position: relative;
  animation: none;
}

.disc-rotate.playing {
  animation: spin 3s linear infinite;
}

.disc-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  background: #2d5a27;
  border-radius: 50%;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 600px;
}

.play-button {
  width: 44px;
  height: 44px;
  background: #2d5a27;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: #2d5a27;
  border-radius: 3px;
  transition: width 0.3s;
}

.progress-dot {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #2d5a27;
}

.time-display {
  color: #666;
  font-size: 14px;
  min-width: 80px;
  text-align: right;
}

.volume-button {
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: pointer;
}

/* 当前音频信息 */
.current-audio-info {
  margin-top: 16px;
  text-align: center;
}

.current-audio-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.current-audio-meta {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.meta-duration {
  color: #666;
  font-size: 14px;
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
  margin: 0 0 16px 0;
}

.audio-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.meta-item {
  font-size: 14px;
  color: #999;
}

.intro-section .section-title {
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

.tags-section {
  margin-top: 24px;
}

.tags-list {
  display: flex;
  gap: 8px;
}

.tag-item {
  padding: 4px 12px;
  background: #E8F5E9;
  color: #22C55E;
  font-size: 12px;
  border-radius: 4px;
}

/* 学习进度 */
.progress-section {
  margin-top: 24px;
  padding: 16px;
  background: #f8fbf8;
  border-radius: 8px;
}

.progress-section .section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.progress-bar-wrapper {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill-full {
  height: 100%;
  background: linear-gradient(90deg, #2d5a27, #38a169);
  border-radius: 4px;
  transition: width 0.5s;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
}

.progress-percent {
  font-size: 14px;
  color: #2d5a27;
  font-weight: 500;
}

.progress-time {
  font-size: 14px;
  color: #666;
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

.chapter-title {
  font-size: 14px;
  color: #333;
}

.catalog-content .chapter-item.active .chapter-title {
  color: #fff;
}

.chapter-duration {
  font-size: 14px;
  color: #999;
}

.catalog-content .chapter-item.active .chapter-duration {
  color: rgba(255, 255, 255, 0.8);
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
  
  .album-cover {
    width: 150px;
    height: 150px;
  }
  
  .disc-rotate {
    width: 120px;
    height: 120px;
  }
  
  .player-controls {
    flex-wrap: wrap;
  }
  
  .progress-bar {
    order: 4;
    width: 100%;
  }
}
</style>