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
          <span class="breadcrumb-item active">{{ video.title }}</span>
        </div>
      </div>
    </div>

    <!-- 视频内容区域 -->
    <section class="video-content-section">
      <div class="container">
        <!-- 视频播放器 -->
        <div class="video-player-wrapper">
          <div class="video-player">
            <img :src="video.cover" :alt="video.title" class="video-poster" />
            <div class="video-controls">
              <button class="play-button" @click="togglePlay">▶</button>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                <div class="progress-dot" :style="{ left: progress + '%' }"></div>
              </div>
              <span class="time-display">00:02 / 02:00</span>
              <button class="volume-button">🔊</button>
              <button class="fullscreen-button">⛶</button>
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
            <h2 class="content-title">{{ video.fullTitle }}</h2>
            <div class="video-meta">
              <span class="meta-item">👁️ {{ video.views }}</span>
              <span class="meta-item">⭐ {{ video.likes }}</span>
            </div>
            <div class="intro-section">
              <h3 class="section-title">视频介绍</h3>
              <p class="intro-text">{{ video.intro }}</p>
            </div>
          </div>

          <!-- 目录内容 -->
          <div v-if="activeTab === 'catalog'" class="tab-content catalog-content">
            <div 
              v-for="(item, index) in video.chapters" 
              :key="index"
              class="chapter-item"
              :class="{ active: currentChapter === index }"
              @click="playChapter(index)"
            >
              <span class="chapter-title">{{ item.title }}</span>
              <span class="chapter-duration">{{ item.duration }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('intro')
const progress = ref(1)
const currentChapter = ref(0)

const video = reactive({
  title: '实用针灸推拿学',
  fullTitle: '实用针灸推拿学-足太阳膀胱：膀胱俞',
  cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20acupuncture%20massage%20video%20cover%20traditional%20style&image_size=landscape_16_9',
  views: 435678,
  likes: 43,
  intro: '南京中医药大学朱世鹏副教授讲授-足太阳膀胱：膀胱俞',
  chapters: [
    { title: '足太阳膀胱-膀胱俞穴', duration: '02:00' }
  ]
})

const goToHome = () => {
  router.push('/')
}

const goToVideo = () => {
  router.push('/video')
}

const togglePlay = () => {
  console.log('播放/暂停')
}

const playChapter = (index: number) => {
  currentChapter.value = index
  console.log('播放章节:', index)
}
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

/* 视频内容区域 */
.video-content-section {
  padding: 30px 0 50px;
}

/* 视频播放器 */
.video-player-wrapper {
  margin-bottom: 24px;
}

.video-player {
  position: relative;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-poster {
  width: 100%;
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
}

.volume-button,
.fullscreen-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
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

.video-meta {
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