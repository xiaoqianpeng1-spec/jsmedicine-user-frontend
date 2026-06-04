<template>
  <div class="exam-records-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">考试记录</h1>
        <p class="banner-desc">查看历史考试记录与成绩</p>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item" @click="goToExamList">考核</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">考试记录</span>
        </div>
      </div>
    </div>

    <!-- 考试记录列表 -->
    <section class="records-section">
      <div class="container">
        <div class="records-list">
          <div 
            v-for="record in records" 
            :key="record.id" 
            class="record-card"
            @click="viewRecordDetail(record.id)"
          >
            <div class="record-header">
              <h3 class="record-title">{{ record.paperName }}</h3>
              <div 
                class="record-status"
                :class="{ passed: record.passed === 1, failed: record.passed === 0 }"
              >
                {{ record.passed === 1 ? '及格' : '不及格' }}
              </div>
            </div>
            <div class="record-meta">
              <span class="meta-item">
                <span class="meta-icon">🏆</span>
                得分：{{ record.score }}
              </span>
              <span class="meta-item">
                <span class="meta-icon">📅</span>
                考试时间：{{ formatDate(record.submittedAt) }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="records.length === 0" class="empty-state">
          <p>暂无考试记录</p>
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
import { learningApi, type AppExamRecordResponse } from '~/utils/api/learning'

const router = useRouter()

const records = ref<AppExamRecordResponse[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

const goToHome = () => {
  router.push('/')
}

const goToExamList = () => {
  router.push('/exam')
}

const viewRecordDetail = (id: number) => {
  router.push(`/exam/records/${id}`)
}

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadRecords = async () => {
  try {
    const response = await learningApi.getExamRecords({
      page: currentPage.value,
      size: pageSize.value
    })
    if (response.success) {
      records.value = response.data.records
      total.value = response.data.total
      currentPage.value = response.data.page
      pageSize.value = response.data.size
    }
  } catch (error) {
    console.error('Failed to load exam records:', error)
  }
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadRecords()
}

onMounted(() => {
  loadRecords()
})
</script>

<style scoped>
.exam-records-page {
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

/* 考试记录区域 */
.records-section {
  padding: 30px 0;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.record-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.record-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.record-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.record-status {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.record-status.passed {
  background: #E8F5E9;
  color: #2d5a27;
}

.record-status.failed {
  background: #FFEBEE;
  color: #DC2626;
}

.record-meta {
  display: flex;
  gap: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

.meta-icon {
  font-size: 16px;
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
  .record-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .record-meta {
    flex-direction: column;
    gap: 8px;
  }
  
  .banner-title {
    font-size: 28px;
  }
}
</style>