<template>
  <div class="exam-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">在线考核</h1>
        <p class="banner-desc">检验学习成果，巩固知识要点</p>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">考核</span>
        </div>
      </div>
    </div>

    <!-- 搜索框和考试记录按钮 -->
    <section class="search-section">
      <div class="container">
        <div class="search-actions">
          <div class="search-box">
            <input 
              type="text" 
              v-model="keyword" 
              placeholder="搜索考卷名称..." 
              class="search-input"
              @keyup.enter="loadExams"
            />
            <button class="search-btn" @click="loadExams">
              搜索
            </button>
          </div>
          <button class="records-btn" @click="goToRecords">
            📋 考试记录
          </button>
        </div>
      </div>
    </section>

    <!-- 考核列表 -->
    <section class="exam-section">
      <div class="container">
        <div class="exam-list">
          <div 
            v-for="exam in exams" 
            :key="exam.id" 
            class="exam-card"
            :class="{ disabled: exam.status === 'DISABLED' }"
          >
            <div class="exam-content">
              <div class="exam-header">
                <h3 class="exam-title">{{ exam.paperName }}</h3>
                <span v-if="exam.status === 'ENABLED'" class="status-tag enabled">已启用</span>
                <span v-else class="status-tag disabled">已禁用</span>
              </div>
              <p class="exam-desc">{{ exam.description }}</p>
              <div class="exam-meta">
                <span class="meta-item">
                  <span class="meta-icon">📝</span>
                  {{ exam.questions.length }} 题
                </span>
                <span class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  {{ exam.durationMinutes }} 分钟
                </span>
                <span class="meta-item">
                  <span class="meta-icon">🏆</span>
                  满分 {{ exam.totalScore }} 分
                </span>
                <span class="meta-item">
                  <span class="meta-icon">✅</span>
                  及格线 {{ exam.passScore }} 分
                </span>
              </div>
            </div>
            <button 
              class="exam-button" 
              :disabled="exam.status === 'DISABLED'"
              @click="goToExam(exam.id)"
            >
              {{ exam.status === 'ENABLED' ? '立即答题' : '暂不可用' }}
            </button>
          </div>
        </div>
        <div v-if="exams.length === 0" class="empty-state">
          <p>暂无考卷</p>
        </div>

        <!-- 分页组件 -->
        <section class="pagination-section" v-if="total > pageSize">
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
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { learningApi, type AppExamPaperResponse } from '~/utils/api/learning'

const router = useRouter()

const keyword = ref('')
const exams = ref<AppExamPaperResponse[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

const goToHome = () => {
  router.push('/')
}

const goToExam = (id: number) => {
  router.push(`/exam/${id}`)
}

const goToRecords = () => {
  router.push('/exam/records')
}

const loadExams = async () => {
  try {
    const response = await learningApi.getExamPapers({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined
    })
    if (response.success) {
      exams.value = response.data.records
      total.value = response.data.total
      currentPage.value = response.data.page
      pageSize.value = response.data.size
    }
  } catch (error) {
    console.error('Failed to load exam papers:', error)
  }
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadExams()
}

onMounted(() => {
  loadExams()
})
</script>

<style scoped>
.exam-page {
  font-family: "Microsoft YaHei", sans-serif;
  min-height: 100vh;
  background: #f5f5f5;
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
  background: #fff;
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

.search-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-box {
  display: flex;
  max-width: 400px;
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

.records-btn {
  padding: 12px 24px;
  background: #fff;
  color: #2d5a27;
  border: 1px solid #2d5a27;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.records-btn:hover {
  background: #2d5a27;
  color: #fff;
}

/* 考核列表区域 */
.exam-section {
  padding: 30px 0;
}

.exam-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exam-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 30px 40px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
}

.exam-card:hover:not(.disabled) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.exam-card.disabled {
  opacity: 0.6;
}

.exam-content {
  flex: 1;
}

.exam-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.exam-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.status-tag {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-tag.enabled {
  background: #E8F5E9;
  color: #2d5a27;
}

.status-tag.disabled {
  background: #f5f5f5;
  color: #999;
}

.exam-desc {
  font-size: 14px;
  color: #999;
  margin: 0 0 12px 0;
}

.exam-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
}

.meta-icon {
  font-size: 14px;
}

.exam-button {
  padding: 12px 28px;
  background: #2d5a27;
  color: #fff;
  border: 1px solid #2d5a27;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.exam-button:hover:not(:disabled) {
  background: #fff;
  color: #2d5a27;
}

.exam-button:disabled {
  background: #e0e0e0;
  border-color: #e0e0e0;
  cursor: not-allowed;
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
  text-align: center;
}

.pagination {
  display: inline-flex;
  align-items: center;
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
  .search-actions {
    flex-direction: column;
    gap: 16px;
  }
  
  .search-box {
    width: 100%;
    max-width: none;
  }
  
  .records-btn {
    width: 100%;
  }
  
  .exam-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .exam-meta {
    gap: 12px;
  }
  
  .exam-button {
    align-self: flex-end;
  }
  
  .banner-title {
    font-size: 28px;
  }
}
</style>