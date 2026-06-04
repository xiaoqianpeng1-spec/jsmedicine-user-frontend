<template>
  <div class="video-page">
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
          <span class="breadcrumb-item active">视频</span>
        </div>
      </div>
    </div>

    <!-- 视频列表 -->
    <section class="video-section">
      <div class="container">
        <div class="video-grid">
          <div 
            v-for="video in videos" 
            :key="video.id" 
            class="video-card"
            @click="goToDetail(video.id)"
          >
            <div class="video-thumbnail">
              <img :src="video.thumbnail" :alt="video.title" />
              <div class="video-play-overlay">
                <span class="play-btn">▶</span>
              </div>
            </div>
            <h3 class="video-title">{{ video.title }}</h3>
            <p class="video-desc">{{ video.desc }}</p>
            <div class="video-tags">
              <span class="video-tag" :class="video.tagClass">{{ video.tag }}</span>
            </div>
            <div class="video-stats">
              <span class="stat-views">👁️ {{ video.views }}</span>
              <span class="stat-likes">⭐ {{ video.likes }}</span>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div class="pagination">
          <button class="page-btn prev" @click="prevPage">‹</button>
          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button class="page-btn next" @click="nextPage">›</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentPage = ref(1)
const pageSize = 12

const videos = ref([
  {
    id: 1,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20gray%20style%20traditional&image_size=landscape_4_3',
    title: '实用中医理论基础',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-red',
    views: 435678,
    likes: 43
  },
  {
    id: 2,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20blue%20style%20traditional&image_size=landscape_4_3',
    title: '实用中医方药学',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-blue',
    views: 435678,
    likes: 43
  },
  {
    id: 3,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20purple%20style%20traditional&image_size=landscape_4_3',
    title: '实用中医药适宜技术',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-purple',
    views: 435678,
    likes: 43
  },
  {
    id: 4,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20green%20style%20traditional&image_size=landscape_4_3',
    title: '实用针灸推拿学',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-green',
    views: 435678,
    likes: 43
  },
  {
    id: 5,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20gray%20style%20traditional&image_size=landscape_4_3',
    title: '实用中医理论基础',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-red',
    views: 435678,
    likes: 43
  },
  {
    id: 6,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20blue%20style%20traditional&image_size=landscape_4_3',
    title: '实用中医方药学',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-blue',
    views: 435678,
    likes: 43
  },
  {
    id: 7,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20purple%20style%20traditional&image_size=landscape_4_3',
    title: '实用中医药适宜技术',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-purple',
    views: 435678,
    likes: 43
  },
  {
    id: 8,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20green%20style%20traditional&image_size=landscape_4_3',
    title: '实用针灸推拿学',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-green',
    views: 435678,
    likes: 43
  },
  {
    id: 9,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20gray%20style%20traditional&image_size=landscape_4_3',
    title: '实用中医理论基础',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-red',
    views: 435678,
    likes: 43
  },
  {
    id: 10,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20blue%20style%20traditional&image_size=landscape_4_3',
    title: '实用中医方药学',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-blue',
    views: 435678,
    likes: 43
  },
  {
    id: 11,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20purple%20style%20traditional&image_size=landscape_4_3',
    title: '实用中医药适宜技术',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-purple',
    views: 435678,
    likes: 43
  },
  {
    id: 12,
    thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20green%20style%20traditional&image_size=landscape_4_3',
    title: '实用针灸推拿学',
    desc: '奇经八脉的功能和分布',
    tag: '中医',
    tagClass: 'tag-green',
    views: 435678,
    likes: 43
  }
])

const totalPages = computed(() => Math.ceil(videos.value.length / pageSize))

const goToHome = () => {
  router.push('/')
}

const goToDetail = (id: number) => {
  router.push(`/video/${id}`)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
.video-page {
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

/* 视频列表区域 */
.video-section {
  padding: 30px 0 50px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.video-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.video-card:hover {
  transform: translateY(-4px);
}

.video-thumbnail {
  position: relative;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  background: rgba(45, 90, 39, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn {
  color: #fff;
  font-size: 16px;
  margin-left: 2px;
}

.video-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
}

.video-desc {
  font-size: 12px;
  color: #999;
  margin: 0 0 8px 0;
}

.video-tags {
  margin-bottom: 8px;
}

.video-tag {
  padding: 2px 8px;
  font-size: 11px;
  border-radius: 2px;
}

.tag-red {
  background: #FDECEC;
  color: #D93030;
}

.tag-blue {
  background: #E8F4FD;
  color: #3B82F6;
}

.tag-purple {
  background: #F3E8FF;
  color: #8B5CF6;
}

.tag-green {
  background: #E8F5E9;
  color: #22C55E;
}

.video-stats {
  display: flex;
  gap: 16px;
}

.stat-views,
.stat-likes {
  font-size: 12px;
  color: #999;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
}

.page-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover {
  border-color: #2d5a27;
  color: #2d5a27;
}

.page-btn.active {
  background: #2d5a27;
  border-color: #2d5a27;
  color: #fff;
}

.page-btn.prev,
.page-btn.next {
  width: auto;
  padding: 0 12px;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .banner-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>