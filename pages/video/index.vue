<template>
  <div class="video-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">视频课程</h1>
        <p class="page-desc">名师授课，随时随地学习中医知识</p>
      </div>

      <div class="filter-bar">
        <div class="filter-tabs">
          <button 
            v-for="tab in filterTabs" 
            :key="tab.id"
            class="filter-tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <div class="video-grid">
        <div 
          v-for="video in videos" 
          :key="video.id" 
          class="video-card"
          @click="goToDetail(video.id)"
        >
          <div class="video-thumbnail">
            <img :src="video.thumbnail" :alt="video.title" />
            <div class="video-duration">{{ video.duration }}</div>
            <div class="video-play-icon">▶</div>
          </div>
          <div class="video-info">
            <h3 class="video-title">{{ video.title }}</h3>
            <p class="video-teacher">{{ video.teacher }}</p>
            <div class="video-meta">
              <span class="video-views">👁️ {{ video.views }}</span>
              <span class="video-date">{{ video.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('all')

const filterTabs = [
  { id: 'all', name: '全部' },
  { id: 'basic', name: '基础课程' },
  { id: 'clinical', name: '临床技能' },
  { id: 'specialty', name: '专科课程' }
]

const videos = ref([
  {
    id: 1,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20lecture%20classroom&image_size=landscape_16_9',
    title: '中医基础理论 - 阴阳学说',
    teacher: '王教授',
    duration: '45:30',
    views: 12580,
    date: '2024-01-15'
  },
  {
    id: 2,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20acupuncture%20demonstration%20video&image_size=landscape_16_9',
    title: '针灸实操教学 - 常用穴位精讲',
    teacher: '李医师',
    duration: '52:15',
    views: 8960,
    date: '2024-01-14'
  },
  {
    id: 3,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbs%20preparation%20video&image_size=landscape_16_9',
    title: '中药炮制技术详解',
    teacher: '张药师',
    duration: '38:45',
    views: 6540,
    date: '2024-01-13'
  },
  {
    id: 4,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20diagnosis%20video&image_size=landscape_16_9',
    title: '中医四诊法 - 望诊入门',
    teacher: '陈教授',
    duration: '42:00',
    views: 10320,
    date: '2024-01-12'
  },
  {
    id: 5,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20massage%20therapy&image_size=landscape_16_9',
    title: '推拿手法教学 - 基础手法',
    teacher: '刘医师',
    duration: '35:20',
    views: 7890,
    date: '2024-01-11'
  },
  {
    id: 6,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20prescription%20video&image_size=landscape_16_9',
    title: '方剂学 - 经典方剂解析',
    teacher: '赵教授',
    duration: '58:30',
    views: 5670,
    date: '2024-01-10'
  }
])

const goToDetail = (id: number) => {
  router.push(`/detail/${id}`)
}
</script>

<style scoped>
.video-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
}

.page-desc {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.filter-bar {
  margin-bottom: 30px;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e0e0e0;
}

.filter-tab.active {
  background: #4CAF50;
  color: #fff;
  border-color: #4CAF50;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.video-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.15);
}

.video-thumbnail {
  position: relative;
  height: 160px;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
}

.video-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: rgba(76, 175, 80, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-card:hover .video-play-icon {
  opacity: 1;
}

.video-info {
  padding: 16px;
}

.video-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-teacher {
  font-size: 13px;
  color: #4CAF50;
  margin: 0 0 12px 0;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-views,
.video-date {
  font-size: 12px;
  color: #999;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>