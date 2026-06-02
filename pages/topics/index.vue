<template>
  <div class="topics-page">
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
          <span class="breadcrumb-item active">专题</span>
        </div>
      </div>
    </div>

    <!-- 专题列表 -->
    <section class="topics-section">
      <div class="container">
        <div class="topics-grid">
          <div 
            v-for="topic in topics" 
            :key="topic.id" 
            class="topic-card"
            @click="goToTopic(topic.path)"
          >
            <div class="topic-image">
              <img :src="topic.image" :alt="topic.title" />
            </div>
            <div class="topic-info">
              <h3 class="topic-title">{{ topic.title }}</h3>
              <div class="topic-meta">
                <span class="topic-tag">{{ topic.tag }}</span>
                <div class="topic-stats">
                  <span class="stat-views">👁️ {{ topic.views }}</span>
                  <span class="stat-likes">⭐ {{ topic.likes }}</span>
                </div>
              </div>
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

const topics = ref([
  {
    id: 1,
    path: '/topics/1',
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20training%20banner%20traditional%20style%20with%20doctors&image_size=landscape_16_9',
    title: '基层卫生技术人员中医知识与技能培训',
    tag: '中医培训',
    views: 435678,
    likes: 43
  },
  {
    id: 2,
    path: '/topics/covid',
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20covid%20prevention%20banner%20mountain%20ink%20style&image_size=landscape_16_9',
    title: '新冠肺炎疫情中医药防控专题培训',
    tag: '新冠肺炎',
    views: 435678,
    likes: 43
  },
  {
    id: 3,
    path: '/topics/covid',
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20covid%20prevention%20banner%20mountain%20ink%20style&image_size=landscape_16_9',
    title: '新冠肺炎疫情中医药防控专题培训',
    tag: '新冠肺炎',
    views: 435678,
    likes: 43
  },
  {
    id: 4,
    path: '/topics/1',
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20training%20banner%20traditional%20style%20with%20doctors&image_size=landscape_16_9',
    title: '基层卫生技术人员中医知识与技能培训',
    tag: '中医培训',
    views: 435678,
    likes: 43
  }
])

const goToHome = () => {
  router.push('/')
}

const goToTopic = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.topics-page {
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

/* 专题列表区域 */
.topics-section {
  padding: 30px 0 50px;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.topic-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
}

.topic-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.topic-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.topic-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.topic-card:hover .topic-image img {
  transform: scale(1.05);
}

.topic-info {
  padding: 16px 20px;
}

.topic-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.topic-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topic-tag {
  padding: 4px 12px;
  background: #E8F5E9;
  color: #2d5a27;
  font-size: 12px;
  border-radius: 4px;
}

.topic-stats {
  display: flex;
  gap: 16px;
}

.stat-views,
.stat-likes {
  font-size: 13px;
  color: #999;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .topics-grid {
    grid-template-columns: 1fr;
  }
  
  .banner-title {
    font-size: 28px;
  }
}
</style>