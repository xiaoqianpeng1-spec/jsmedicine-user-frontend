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
          <span class="breadcrumb-item active">{{ topicData.title || '专题详情' }}</span>
        </div>
      </div>
    </div>

    <!-- 专题头部信息 -->
    <section class="topic-header-section">
      <div class="container">
        <div class="topic-header">
          <span class="topic-tag">专题详情</span>
          <h1 class="topic-title">{{ topicData.title }}</h1>
        </div>
      </div>
    </section>

    <!-- 专题描述 -->
    <section class="topic-desc-section">
      <div class="container">
        <div class="topic-description">
          <p>{{ topicData.summary }}</p>
        </div>
        
        <!-- 学习要求 -->
        <div class="learning-requirements" v-if="topicData.learningRequirements">
          <div class="requirement-header">
            <span class="requirement-icon">📋</span>
            <span class="requirement-title">学习要求</span>
          </div>
          <div class="requirement-content">
            <p>{{ topicData.learningRequirements }}</p>
          </div>
          <button class="start-learning-btn" @click="startLearning">
            开始学习
          </button>
        </div>

        <!-- 专题统计 -->
        <div class="topic-stats">
          <div class="stat-item">
            <span class="stat-value">{{ topicData.viewCount }}</span>
            <span class="stat-label">浏览量</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ topicData.favoriteCount }}</span>
            <span class="stat-label">收藏数</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ formatDate(topicData.publishedAt) }}</span>
            <span class="stat-label">发布时间</span>
          </div>
          <button 
            class="favorite-btn" 
            :class="{ active: topicData.favorited }"
            @click="toggleFavorite"
          >
            {{ topicData.favorited ? '❤️ 已收藏' : '🤍 收藏' }}
          </button>
        </div>
      </div>
    </section>

    <!-- 专题资源列表 -->
    <section class="resources-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">📚 专题资源</h2>
          <span class="resource-count">共 {{ topicData.items.length }} 个资源</span>
        </div>
        
        <div class="resources-list">
          <div 
            v-for="(item, index) in topicData.items" 
            :key="item.id" 
            class="resource-item"
            @click="goToResource(item)"
          >
            <div class="resource-number">{{ index + 1 }}</div>
            <div class="resource-icon">{{ getResourceIcon(item.itemType) }}</div>
            <div class="resource-info">
              <h3 class="resource-title">{{ item.resource?.title || item.resource?.bookName || item.resource?.name || '资源 ' + item.itemId }}</h3>
              <p class="resource-type">{{ getResourceTypeName(item.itemType) }}</p>
            </div>
            <div class="resource-arrow">→</div>
          </div>
          <div v-if="topicData.items.length === 0" class="empty-state">
            <p>暂无资源</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { topicsApi, type AppTopicResponse } from '~/utils/api/topics'

const router = useRouter()
const route = useRoute()

const topicData = ref<AppTopicResponse>({
  id: 0,
  title: '',
  summary: '',
  learningRequirements: '',
  coverUrl: '',
  viewCount: 0,
  publishedAt: '',
  favoriteCount: 0,
  favorited: false,
  items: []
})

const goToHome = () => {
  router.push('/')
}

const goToTopics = () => {
  router.push('/topics')
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getResourceIcon = (itemType: string) => {
  const iconMap: Record<string, string> = {
    'video': '🎬',
    'audio': '🎵',
    'book': '📖',
    'article': '📄',
    'exam': '📝',
    'default': '📎'
  }
  return iconMap[itemType] || iconMap['default']
}

const getResourceTypeName = (itemType: string) => {
  const typeMap: Record<string, string> = {
    'video': '视频课程',
    'audio': '音频课程',
    'book': '图书',
    'article': '文章',
    'exam': '考试',
    'default': '资源'
  }
  return typeMap[itemType] || typeMap['default']
}

const goToResource = (item: any) => {
  const routes: Record<string, string> = {
    'video': '/video',
    'audio': '/audio',
    'book': '/books',
    'article': '/articles',
    'exam': '/exam'
  }
  const baseRoute = routes[item.itemType] || ''
  if (baseRoute) {
    router.push(`${baseRoute}/${item.itemId}`)
  }
}

const startLearning = () => {
  if (topicData.value.items.length > 0) {
    goToResource(topicData.value.items[0])
  }
}

const toggleFavorite = () => {
  topicData.value.favorited = !topicData.value.favorited
  topicData.value.favoriteCount += topicData.value.favorited ? 1 : -1
}

const loadTopicDetail = async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    try {
      const response = await topicsApi.getTopicDetail(id)
      if (response.success) {
        topicData.value = response.data
      }
    } catch (error) {
      console.error('Failed to load topic detail:', error)
    }
  }
}

onMounted(() => {
  loadTopicDetail()
})
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
  margin-bottom: 24px;
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

/* 专题统计 */
.topic-stats {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 20px;
  background: #f8fbf8;
  border-radius: 8px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: #2d5a27;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.favorite-btn {
  margin-left: auto;
  padding: 10px 24px;
  background: #f5f7fa;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.favorite-btn:hover,
.favorite-btn.active {
  background: #fff5f5;
  color: #e53935;
  border-color: #e53935;
}

/* 资源列表区域 */
.resources-section {
  padding: 30px 0 50px;
  background: #f8fbf8;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.resource-count {
  font-size: 14px;
  color: #999;
}

.resources-list {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.resource-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.3s;
}

.resource-item:last-child {
  border-bottom: none;
}

.resource-item:hover {
  background: #f8fbf8;
}

.resource-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8f5e9;
  color: #2d5a27;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  margin-right: 16px;
}

.resource-icon {
  font-size: 24px;
  margin-right: 16px;
}

.resource-info {
  flex: 1;
}

.resource-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 0 4px 0;
}

.resource-type {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.resource-arrow {
  font-size: 18px;
  color: #ccc;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
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
  
  .topic-stats {
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .favorite-btn {
    margin-left: 0;
    width: 100%;
    margin-top: 16px;
  }
  
  .start-learning-btn {
    position: static;
    margin-top: 16px;
    width: 100%;
  }
  
  .learning-requirements {
    padding-bottom: 80px;
  }
}
</style>
