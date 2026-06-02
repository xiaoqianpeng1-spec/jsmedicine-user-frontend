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
          <span class="breadcrumb-item active">{{ audio.title }}</span>
        </div>
      </div>
    </div>

    <!-- 音频内容区域 -->
    <section class="audio-content-section">
      <div class="container">
        <!-- 音频播放器 -->
        <div class="audio-player-wrapper">
          <div class="audio-player">
            <div class="player-inner">
              <div class="album-cover">
                <img :src="audio.cover" :alt="audio.title" />
                <div class="cover-overlay">
                  <div class="disc-rotate" :class="{ playing: isPlaying }">
                    <div class="disc-center"></div>
                  </div>
                </div>
              </div>
              <div class="player-controls">
                <button class="play-button" @click="togglePlay">
                  {{ isPlaying ? '⏸' : '▶' }}
                </button>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                  <div class="progress-dot" :style="{ left: progress + '%' }"></div>
                </div>
                <span class="time-display">00:00 / {{ audio.totalDuration }}</span>
                <button class="volume-button">🔊</button>
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
            <h2 class="content-title">{{ audio.fullTitle }}</h2>
            <div class="audio-meta">
              <span class="meta-item">👁️ {{ audio.views }}</span>
              <span class="meta-item">⭐ {{ audio.likes }}</span>
            </div>
            <div class="intro-section">
              <h3 class="section-title">音频介绍</h3>
              <p class="intro-text">{{ audio.intro }}</p>
            </div>
          </div>

          <!-- 目录内容 -->
          <div v-if="activeTab === 'catalog'" class="tab-content catalog-content">
            <div 
              v-for="(chapter, index) in audio.chapters" 
              :key="index"
              class="chapter-item"
              :class="{ active: currentChapter === index }"
              @click="playChapter(index)"
            >
              <span class="chapter-title">{{ chapter.title }}</span>
              <span class="chapter-duration">{{ chapter.duration }}</span>
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
const progress = ref(0)
const currentChapter = ref(0)
const isPlaying = ref(false)

const audio = reactive({
  title: '实用针灸推拿学',
  fullTitle: '实用针灸推拿学',
  cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20acupuncture%20massage%20audio%20cover%20traditional%20style&image_size=square',
  totalDuration: '13:57',
  views: 435678,
  likes: 43,
  intro: '南京中医药大学朱世鹏副教授讲授实用针灸推拿学课程',
  chapters: [
    { title: '第一章 经络总论', duration: '02:00' },
    { title: '第二章 腧穴总论', duration: '02:00' },
    { title: '第三章 经络腧穴总结(1)', duration: '02:00' },
    { title: '第四章 经络腧穴总结(2)', duration: '02:00' },
    { title: '第五章 经络腧穴总结(3)', duration: '02:00' },
    { title: '第六章 刺灸法总论', duration: '05:57' }
  ]
})

const goToHome = () => {
  router.push('/')
}

const goToAudio = () => {
  router.push('/audio')
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const playChapter = (index: number) => {
  currentChapter.value = index
  progress.value = 0
}
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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