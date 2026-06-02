<template>
  <div class="topic-detail-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">专题中心</h1>
        <p class="banner-desc">精选专题，深入学习中医知识体系</p>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item" @click="goToTopics">专题</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">新冠肺炎疫情中医药防控专题培训</span>
        </div>
      </div>
    </div>

    <!-- 专题头部信息 -->
    <section class="topic-header-section">
      <div class="container">
        <div class="topic-header">
          <span class="topic-tag">学习要求</span>
          <h1 class="topic-title">新冠肺炎疫情中医药防控专题培训</h1>
        </div>
      </div>
    </section>

    <!-- 专题描述 -->
    <section class="topic-desc-section">
      <div class="container">
        <div class="topic-description">
          <p>为有效应对新冠肺炎疫情，充分发挥中医药在疫情防控中的独特优势和作用，开展中医药防控知识专题培训。本专题旨在帮助基层卫生技术人员掌握中医药防控新冠肺炎的基本知识、预防措施和诊疗方案，提高中医药防控能力和水平。</p>
        </div>
        
        <!-- 学习要求 -->
        <div class="learning-requirements">
          <div class="requirement-header">
            <span class="requirement-icon">📋</span>
            <span class="requirement-title">学习要求</span>
          </div>
          <div class="requirement-content">
            <p>培训周期内学员线上学习不少于32个学时，每个学时45分钟。完成全部课程学习并通过考核后，可获得中医药防控知识培训合格证书。</p>
          </div>
          <button class="start-learning-btn">学习</button>
        </div>
      </div>
    </section>

    <!-- 视频课程区域 -->
    <section class="courses-section">
      <div class="container">
        <div class="section-header">
          <div class="section-title-wrapper">
            <span class="section-icon video-icon">▶</span>
            <h2 class="section-title">视频</h2>
          </div>
          <span class="more-link" @click="showMoreVideos">更多 ></span>
        </div>
        
        <div class="courses-grid">
          <div 
            v-for="video in videos" 
            :key="video.id" 
            class="course-card"
            @click="playVideo(video.id)"
          >
            <div class="course-cover">
              <img :src="video.cover" :alt="video.title" />
              <div class="play-overlay">
                <span class="play-btn">▶</span>
              </div>
            </div>
            <h3 class="course-title">{{ video.title }}</h3>
            <p class="course-desc">{{ video.desc }}</p>
            <div class="course-tags">
              <span v-for="(tag, index) in video.tags" :key="index" class="course-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 音频课程区域 -->
    <section class="courses-section audio-section">
      <div class="container">
        <div class="section-header">
          <div class="section-title-wrapper">
            <span class="section-icon audio-icon">🎵</span>
            <h2 class="section-title">音频</h2>
          </div>
          <span class="more-link" @click="showMoreAudios">更多 ></span>
        </div>
        
        <div class="courses-grid">
          <div 
            v-for="audio in audios" 
            :key="audio.id" 
            class="course-card"
            @click="playAudio(audio.id)"
          >
            <div class="course-cover">
              <img :src="audio.cover" :alt="audio.title" />
              <div class="audio-overlay">
                <span class="audio-btn">🎵</span>
              </div>
            </div>
            <h3 class="course-title">{{ audio.title }}</h3>
            <p class="course-desc">{{ audio.desc }}</p>
            <div class="course-tags">
              <span v-for="(tag, index) in audio.tags" :key="index" class="course-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const videos = ref([
  {
    id: 1,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=covid%20medicine%20prevention%20video%20cover%20green%20style&image_size=landscape_4_3',
    title: '新冠肺炎中医药预防方案',
    desc: '中医药预防新冠的基本原则',
    tags: ['新冠']
  },
  {
    id: 2,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=covid%20TCM%20treatment%20video%20cover%20green%20style&image_size=landscape_4_3',
    title: '新冠肺炎中医诊疗方案',
    desc: '中医辨证论治新冠的方法',
    tags: ['新冠']
  },
  {
    id: 3,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20herbs%20covid%20video%20cover%20green%20style&image_size=landscape_4_3',
    title: '中医药在新冠康复中的应用',
    desc: '新冠患者康复期的中医药调理',
    tags: ['新冠']
  },
  {
    id: 4,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20immune%20covid%20video%20cover%20green%20style&image_size=landscape_4_3',
    title: '中医药提升免疫力',
    desc: '用中医药方法增强身体抵抗力',
    tags: ['新冠']
  }
])

const audios = ref([
  {
    id: 1,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=covid%20prevention%20audio%20cover%20gray%20style&image_size=landscape_4_3',
    title: '新冠肺炎防护知识讲座',
    desc: '日常防护中的中医药应用',
    tags: ['新冠']
  },
  {
    id: 2,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20health%20audio%20cover%20gray%20style&image_size=landscape_4_3',
    title: '中医养生与疫情防控',
    desc: '疫情期间的中医养生建议',
    tags: ['新冠']
  },
  {
    id: 3,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=herbal%20medicine%20audio%20cover%20gray%20style&image_size=landscape_4_3',
    title: '中药在抗疫中的作用',
    desc: '解读中药对抗病毒的机理',
    tags: ['新冠']
  },
  {
    id: 4,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20theory%20audio%20cover%20gray%20style&image_size=landscape_4_3',
    title: '中医经络与免疫调节',
    desc: '经络穴位提升免疫力',
    tags: ['新冠']
  }
])

const goToHome = () => {
  router.push('/')
}

const goToTopics = () => {
  router.push('/topics')
}

const showMoreVideos = () => {
  console.log('查看更多视频')
}

const showMoreAudios = () => {
  console.log('查看更多音频')
}

const playVideo = (id: number) => {
  console.log('播放视频:', id)
}

const playAudio = (id: number) => {
  console.log('播放音频:', id)
}
</script>

<style scoped>
.topic-detail-page {
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

/* 专题头部 */
.topic-header-section {
  padding: 30px 0 20px;
}

.topic-header {
  text-align: center;
}

.topic-tag {
  display: inline-block;
  padding: 6px 16px;
  background: #E8F5E9;
  color: #2d5a27;
  font-size: 13px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.topic-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* 专题描述 */
.topic-desc-section {
  padding-bottom: 30px;
}

.topic-description {
  background: #f8fbf8;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.topic-description p {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}

/* 学习要求 */
.learning-requirements {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  position: relative;
}

.requirement-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.requirement-icon {
  font-size: 18px;
}

.requirement-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.requirement-content {
  margin-bottom: 16px;
}

.requirement-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.start-learning-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  padding: 8px 24px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.start-learning-btn:hover {
  background: #1e3d1a;
}

/* 课程区域 */
.courses-section {
  padding: 30px 0;
}

.audio-section {
  background: #f8fbf8;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
}

.video-icon {
  background: #2d5a27;
}

.audio-icon {
  background: #666;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.more-link {
  font-size: 14px;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
}

.more-link:hover {
  color: #2d5a27;
}

/* 课程网格 */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.course-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.course-card:hover {
  transform: translateY(-4px);
}

.course-cover {
  position: relative;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.course-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay,
.audio-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(45, 90, 39, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn {
  color: #fff;
  font-size: 14px;
  margin-left: 2px;
}

.audio-btn {
  color: #fff;
  font-size: 16px;
}

.course-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
}

.course-desc {
  font-size: 12px;
  color: #999;
  margin: 0 0 8px 0;
}

.course-tags {
  display: flex;
  gap: 8px;
}

.course-tag {
  padding: 2px 8px;
  background: #f0f0f0;
  color: #666;
  font-size: 11px;
  border-radius: 2px;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .banner-title {
    font-size: 28px;
  }
  
  .start-learning-btn {
    position: static;
    margin-top: 16px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>