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

    <!-- 搜索框 -->
    <section class="search-section">
      <div class="container">
        <div class="search-box">
          <input 
            type="text" 
            v-model="keyword" 
            placeholder="搜索专题名称..." 
            class="search-input"
            @keyup.enter="loadTopics"
          />
          <button class="search-btn" @click="loadTopics">
            搜索
          </button>
        </div>
      </div>
    </section>

    <!-- 专题列表 -->
    <section class="topics-section">
      <div class="container">
        <div class="topics-grid">
          <div 
            v-for="topic in topics" 
            :key="topic.id" 
            class="topic-card"
            @click="goToTopic(topic.id)"
          >
            <div class="topic-image">
              <img :src="topic.coverUrl" :alt="topic.title" />
              <div v-if="topic.favorited" class="favorite-badge">❤️</div>
            </div>
            <div class="topic-info">
              <div class="topic-tags">
                <span 
                  v-for="tag in topic.tags.slice(0, 3)" 
                  :key="tag" 
                  class="topic-tag"
                >
                  {{ tag }}
                </span>
              </div>
              <h3 class="topic-title">{{ topic.title }}</h3>
              <p class="topic-summary">{{ topic.summary }}</p>
              <div class="topic-meta">
                <span class="topic-date">{{ formatDate(topic.publishedAt) }}</span>
                <div class="topic-stats">
                  <span class="stat-views">👁️ {{ formatNumber(topic.viewCount) }}</span>
                  <span class="stat-favorites">{{ topic.favorited ? '❤️' : '🤍' }} {{ topic.favoriteCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="topics.length === 0" class="empty-state">
          <p>暂无专题</p>
        </div>
      </div>
    </section>

    <!-- 分页组件 -->
    <section class="pagination-section" v-if="total > pageSize">
      <div class="container">
        <div class="pagination">
          <button 
            class="page-btn" 
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            上一页
          </button>
          <span class="page-info">
            第 {{ currentPage }} / {{ totalPages }} 页
          </span>
          <button 
            class="page-btn" 
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            下一页
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { topicsApi, type AppTopicCardResponse } from '~/utils/api/topics'

const router = useRouter()

const topics = ref<AppTopicCardResponse[]>([])
const keyword = ref('')
const currentPage = ref(1)
const pageSize = ref(8)
const total = ref(0)

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

const goToHome = () => {
  router.push('/')
}

const goToTopic = (id: number) => {
  router.push(`/topics/${id}`)
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

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toString()
}

const loadTopics = async () => {
  try {
    const response = await topicsApi.getTopics({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined
    })
    if (response.success) {
      topics.value = response.data.records
      total.value = response.data.total
      currentPage.value = response.data.page
      pageSize.value = response.data.size
    }
  } catch (error) {
    console.error('Failed to load topics:', error)
  }
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadTopics()
}

onMounted(() => {
  loadTopics()
})
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

/* 搜索区域 */
.search-section {
  padding: 20px 0;
  background: #fff;
}

.search-box {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: 8px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #2d5a27;
}

.search-btn {
  padding: 12px 24px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #1f421b;
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

.favorite-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  font-size: 16px;
}

.topic-info {
  padding: 16px 20px;
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.topic-tag {
  padding: 2px 8px;
  background: #E8F5E9;
  color: #2d5a27;
  font-size: 12px;
  border-radius: 4px;
}

.topic-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.topic-summary {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.topic-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topic-date {
  font-size: 12px;
  color: #999;
}

.topic-stats {
  display: flex;
  gap: 16px;
}

.stat-views,
.stat-favorites {
  font-size: 13px;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

/* 分页区域 */
.pagination-section {
  padding: 30px 0;
  background: #fff;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.page-btn {
  padding: 10px 20px;
  background: #f5f7fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  background: #e8f5e9;
  border-color: #2d5a27;
  color: #2d5a27;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #666;
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
