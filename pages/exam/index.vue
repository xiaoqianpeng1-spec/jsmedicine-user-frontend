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
          <button class="records-btn" @click="goToRecords">
            📋 考试记录
          </button>
        </div>
      </div>
    </section>

    <!-- 考核场次列表 -->
    <section class="exam-section">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-center">
          <span class="spinner"></span>
          <span>加载考核场次中...</span>
        </div>
        
        <!-- 考核列表 -->
        <template v-else>
          <div class="exam-list">
            <div 
              v-for="assessment in assessments" 
              :key="assessment.id" 
              class="exam-card"
              :class="getCardClass(assessment)"
            >
              <div class="exam-content">
                <div class="exam-header">
                  <h3 class="exam-title">{{ assessment.assessmentName }}</h3>
                  <span class="type-tag" :class="assessment.assessmentType.toLowerCase()">
                    {{ getAssessmentTypeLabel(assessment.assessmentType) }}
                  </span>
                  <span class="status-tag" :class="assessment.status.toLowerCase().replace('_', '-')">
                    {{ getStatusLabel(assessment.status) }}
                  </span>
                </div>
                <p class="exam-paper">试卷：{{ assessment.paperName }}</p>
                <div class="exam-meta">
                  <span class="meta-item">
                    <span class="meta-icon">⏱️</span>
                    时长 {{ assessment.durationMinutes }} 分钟
                  </span>
                  <span class="meta-item">
                    <span class="meta-icon">📅</span>
                    {{ formatDateRange(assessment.startAt, assessment.endAt) }}
                  </span>
                  <span v-if="assessment.countdownSeconds > 0" class="meta-item countdown">
                    <span class="meta-icon">⏰</span>
                    距离开始：{{ formatCountdown(assessment.countdownSeconds) }}
                  </span>
                  <span v-if="assessment.participantStatus" class="meta-item">
                    <span class="meta-icon">📝</span>
                    {{ getParticipantStatusLabel(assessment.participantStatus) }}
                  </span>
                </div>
              </div>
              <div class="exam-actions">
                <button class="detail-btn" @click="showDetail(assessment)">
                  查看详情
                </button>
                <button 
                  class="exam-button" 
                  :disabled="!canStartExam(assessment)"
                  @click="startExam(assessment)"
                >
                  {{ getButtonText(assessment) }}
                </button>
              </div>
            </div>
          </div>
          <div v-if="assessments.length === 0" class="empty-state">
            <p>暂无考核场次</p>
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
        </template>
      </div>
    </section>

    <!-- 考核场次详情弹窗 -->
    <div v-if="showDetailModal" class="modal-overlay" @click="closeDetailModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">考核场次详情</h2>
          <button class="modal-close" @click="closeDetailModal">×</button>
        </div>
        <div v-if="detailLoading" class="modal-loading">
          <span class="spinner"></span>
          <span>加载中...</span>
        </div>
        <div v-else-if="currentAssessment" class="modal-body">
          <div class="detail-section">
            <h3 class="detail-section-title">基本信息</h3>
            <div class="detail-row">
              <span class="detail-label">考核名称：</span>
              <span class="detail-value">{{ currentAssessment.assessmentName }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">试卷名称：</span>
              <span class="detail-value">{{ currentAssessment.paperName }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">考核类型：</span>
              <span class="detail-value">
                <span class="type-tag" :class="currentAssessment.assessmentType.toLowerCase()">
                  {{ getAssessmentTypeLabel(currentAssessment.assessmentType) }}
                </span>
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">考核状态：</span>
              <span class="detail-value">
                <span class="status-tag" :class="currentAssessment.status.toLowerCase().replace('_', '-')">
                  {{ getStatusLabel(currentAssessment.status) }}
                </span>
              </span>
            </div>
          </div>

          <div class="detail-section">
            <h3 class="detail-section-title">时间信息</h3>
            <div class="detail-row">
              <span class="detail-label">开始时间：</span>
              <span class="detail-value">{{ formatDateTime(currentAssessment.startAt) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">结束时间：</span>
              <span class="detail-value">{{ formatDateTime(currentAssessment.endAt) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">考核时长：</span>
              <span class="detail-value">{{ currentAssessment.durationMinutes }} 分钟</span>
            </div>
            <div v-if="currentAssessment.countdownSeconds > 0" class="detail-row">
              <span class="detail-label">距离开始：</span>
              <span class="detail-value countdown">{{ formatCountdown(currentAssessment.countdownSeconds) }}</span>
            </div>
          </div>

          <div v-if="currentAssessment.participantStatus" class="detail-section">
            <h3 class="detail-section-title">答题状态</h3>
            <div class="detail-row">
              <span class="detail-label">答题状态：</span>
              <span class="detail-value">{{ getParticipantStatusLabel(currentAssessment.participantStatus) }}</span>
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-btn cancel-btn" @click="closeDetailModal">关闭</button>
            <button 
              class="modal-btn primary-btn" 
              :disabled="!canStartExam(currentAssessment)"
              @click="startExamFromDetail"
            >
              {{ getButtonText(currentAssessment) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { learningApi, type AppExamAssessmentResponse } from '~/utils/api/learning'

const router = useRouter()

const assessments = ref<AppExamAssessmentResponse[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)
const showDetailModal = ref(false)
const detailLoading = ref(false)
const currentAssessment = ref<AppExamAssessmentResponse | null>(null)
let countdownTimer: number | null = null

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

const goToHome = () => {
  router.push('/')
}

const goToRecords = () => {
  router.push('/exam/records')
}

const getAssessmentTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    FORMAL: '正式考核',
    MAKEUP: '补考',
    MOCK: '模拟考核'
  }
  return labels[type] || type
}

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    NOT_STARTED: '未开始',
    IN_PROGRESS: '进行中',
    ENDED: '已结束',
    CANCELLED: '已取消',
    ARCHIVED: '已归档'
  }
  return labels[status] || status
}

const getParticipantStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    IN_PROGRESS: '答题中',
    SUBMITTED: '已提交',
    FORCED_SUBMITTED: '强制提交',
    TIMED_OUT: '超时未交'
  }
  return labels[status] || status
}

const formatDateRange = (startAt: string, endAt: string): string => {
  const start = new Date(startAt)
  const end = new Date(endAt)
  return `${start.getMonth() + 1}/${start.getDate()} ${start.getHours()}:${String(start.getMinutes()).padStart(2, '0')} - ${end.getMonth() + 1}/${end.getDate()} ${end.getHours()}:${String(end.getMinutes()).padStart(2, '0')}`
}

const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
}

const formatCountdown = (seconds: number): string => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (days > 0) {
    return `${days}天 ${hours}时 ${minutes}分`
  } else if (hours > 0) {
    return `${hours}时 ${minutes}分 ${secs}秒`
  } else {
    return `${minutes}分 ${secs}秒`
  }
}

const getCardClass = (assessment: AppExamAssessmentResponse): string => {
  const classes: string[] = []
  if (assessment.status === 'CANCELLED' || assessment.status === 'ARCHIVED') {
    classes.push('disabled')
  }
  return classes.join(' ')
}

const canStartExam = (assessment: AppExamAssessmentResponse): boolean => {
  if (assessment.status !== 'IN_PROGRESS') return false
  if (assessment.participantStatus === 'SUBMITTED' || 
      assessment.participantStatus === 'FORCED_SUBMITTED' || 
      assessment.participantStatus === 'TIMED_OUT') {
    return false
  }
  return true
}

const getButtonText = (assessment: AppExamAssessmentResponse): string => {
  if (assessment.status === 'NOT_STARTED') {
    return '尚未开始'
  }
  if (assessment.status === 'ENDED' || assessment.status === 'CANCELLED' || assessment.status === 'ARCHIVED') {
    return '已结束'
  }
  if (assessment.participantStatus === 'SUBMITTED') {
    return '已提交'
  }
  if (assessment.participantStatus === 'FORCED_SUBMITTED') {
    return '强制提交'
  }
  if (assessment.participantStatus === 'TIMED_OUT') {
    return '超时未交'
  }
  if (assessment.participantStatus === 'IN_PROGRESS') {
    return '继续答题'
  }
  return '开始答题'
}

const startExam = async (assessment: AppExamAssessmentResponse) => {
  try {
    // 检查用户是否登录
    const userStore = useUserStore()
    if (!userStore.token) {
      alert('请先登录后再进行考核')
      router.push('/login')
      return
    }

    // 生成唯一请求ID
    const requestId = `exam_${assessment.id}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    
    // 调用进入考核场次API
    const response = await learningApi.enterExamAssessment(assessment.id, { requestId })
    
    if (response.success) {
      // 进入成功，跳转到答题页面
      router.push(`/exam/${assessment.paperId}?assessmentId=${assessment.id}&recordId=${response.data.id}`)
    } else {
      console.error('进入考核场次失败:', response.message)
      // 检查错误类型
      if (response.code === 'NOT_FOUND' || response.message.includes('does not exist')) {
        alert(`考核场次不存在，请联系管理员添加考核数据`)
      } else if (response.code === 'FORBIDDEN' || response.message.includes('Forbidden')) {
        alert(`您没有权限进入该考核场次，请联系管理员`)
      } else if (response.code === 'UNAUTHORIZED' || response.message.includes('Unauthorized')) {
        alert(`登录已过期，请重新登录`)
        router.push('/login')
      } else {
        alert(`进入考核场次失败：${response.message}`)
      }
    }
  } catch (error: any) {
    console.error('Failed to enter exam assessment:', error)
    // 检查错误类型
    if (error.message && error.message.includes('403')) {
      alert('访问被拒绝，请检查您的权限或重新登录')
    } else if (error.message && (error.message.includes('404') || error.message.includes('Not Found'))) {
      alert('考核场次不存在或服务器配置错误，请联系管理员')
    } else if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
      alert('登录已过期，请重新登录')
      router.push('/login')
    } else {
      alert('进入考核场次失败，请稍后重试')
    }
  }
}

const showDetail = async (assessment: AppExamAssessmentResponse) => {
  currentAssessment.value = assessment
  showDetailModal.value = true
  detailLoading.value = true
  
  try {
    // 调用考核场次详情API
    const response = await learningApi.getExamAssessmentDetail(assessment.id)
    if (response.success) {
      // 更新本地数据
      currentAssessment.value = response.data
      // 更新列表中的对应数据
      const index = assessments.value.findIndex(a => a.id === assessment.id)
      if (index !== -1) {
        assessments.value[index] = response.data
      }
    }
  } catch (error) {
    console.error('Failed to load assessment detail:', error)
  } finally {
    detailLoading.value = false
  }
}

const closeDetailModal = () => {
  showDetailModal.value = false
  currentAssessment.value = null
}

const startExamFromDetail = async () => {
  if (currentAssessment.value) {
    await startExam(currentAssessment.value)
    closeDetailModal()
  }
}

const loadAssessments = async () => {
  loading.value = true
  try {
    const response = await learningApi.getExamAssessments({
      page: currentPage.value,
      size: pageSize.value
    })
    if (response.success) {
      assessments.value = response.data.records
      total.value = response.data.total
      currentPage.value = response.data.page
      pageSize.value = response.data.size
      
      // 如果没有数据，加载模拟数据
      if (assessments.value.length === 0) {
        loadMockAssessments()
      }
    } else {
      console.warn('获取考核场次失败:', response.message)
      loadMockAssessments()
    }
  } catch (error: any) {
    console.error('Failed to load exam assessments:', error)
    loadMockAssessments()
  } finally {
    loading.value = false
  }
}

const loadMockAssessments = () => {
  const now = new Date()
  const later = new Date(now.getTime() + 2 * 60 * 60 * 1000)
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  
  assessments.value = [
    {
      id: 1,
      assessmentName: '2024年第一季度中医基础理论考核',
      paperId: 1,
      paperName: '中医基础理论试卷（A卷）',
      assessmentType: 'FORMAL',
      status: 'IN_PROGRESS',
      startAt: now.toISOString(),
      endAt: later.toISOString(),
      serverTime: now.toISOString(),
      countdownSeconds: 0,
      durationMinutes: 90,
      participantRecordId: 1,
      participantStatus: 'IN_PROGRESS'
    },
    {
      id: 2,
      assessmentName: '2024年第一季度中药学补考',
      paperId: 2,
      paperName: '中药学试卷',
      assessmentType: 'MAKEUP',
      status: 'IN_PROGRESS',
      startAt: now.toISOString(),
      endAt: later.toISOString(),
      serverTime: now.toISOString(),
      countdownSeconds: 0,
      durationMinutes: 60,
      participantRecordId: 2,
      participantStatus: ''
    },
    {
      id: 3,
      assessmentName: '中医诊断学模拟考核',
      paperId: 3,
      paperName: '中医诊断学模拟试卷',
      assessmentType: 'MOCK',
      status: 'NOT_STARTED',
      startAt: tomorrow.toISOString(),
      endAt: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      serverTime: now.toISOString(),
      countdownSeconds: 24 * 60 * 60,
      durationMinutes: 120,
      participantRecordId: 0,
      participantStatus: ''
    },
    {
      id: 4,
      assessmentName: '针灸学专项考核',
      paperId: 4,
      paperName: '针灸学专项试卷',
      assessmentType: 'FORMAL',
      status: 'ENDED',
      startAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      endAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      serverTime: now.toISOString(),
      countdownSeconds: 0,
      durationMinutes: 90,
      participantRecordId: 4,
      participantStatus: 'SUBMITTED'
    },
    {
      id: 5,
      assessmentName: '方剂学期末考核',
      paperId: 5,
      paperName: '方剂学试卷（B卷）',
      assessmentType: 'FORMAL',
      status: 'CANCELLED',
      startAt: tomorrow.toISOString(),
      endAt: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      serverTime: now.toISOString(),
      countdownSeconds: 0,
      durationMinutes: 120,
      participantRecordId: 0,
      participantStatus: ''
    }
  ]
  total.value = assessments.value.length
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadAssessments()
}

const updateCountdowns = () => {
  assessments.value.forEach(assessment => {
    if (assessment.status === 'NOT_STARTED' && assessment.countdownSeconds > 0) {
      assessment.countdownSeconds -= 1
    }
  })
}

onMounted(() => {
  loadAssessments()
  countdownTimer = window.setInterval(updateCountdowns, 1000)
})

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
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
  justify-content: flex-end;
  align-items: center;
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

.loading-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 12px;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2d5a27;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  flex-wrap: wrap;
}

.exam-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.type-tag, .status-tag {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.type-tag.formal {
  background: #E8F5E9;
  color: #2d5a27;
}

.type-tag.makeup {
  background: #FFF3E0;
  color: #E65100;
}

.type-tag.mock {
  background: #E3F2FD;
  color: #1976D2;
}

.status-tag.not-started {
  background: #f5f5f5;
  color: #999;
}

.status-tag.in-progress {
  background: #E3F2FD;
  color: #1976D2;
}

.status-tag.ended {
  background: #E8F5E9;
  color: #2d5a27;
}

.status-tag.cancelled {
  background: #FFEBEE;
  color: #C62828;
}

.status-tag.archived {
  background: #f5f5f5;
  color: #999;
}

.exam-paper {
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

.meta-item.countdown {
  color: #1976D2;
  font-weight: 500;
}

.meta-icon {
  font-size: 14px;
}

.exam-actions {
  margin-left: 20px;
  display: flex;
  align-items: center;
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
  .exam-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .exam-meta {
    gap: 12px;
  }
  
  .exam-actions {
    margin-left: 0;
    width: 100%;
  }
  
  .exam-button {
    width: 100%;
  }
  
  .banner-title {
    font-size: 28px;
  }
}

/* 详情弹窗样式 */
.detail-btn {
  padding: 10px 20px;
  background: #f5f7fa;
  color: #666;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 10px;
}

.detail-btn:hover {
  background: #e8f5e9;
  border-color: #2d5a27;
  color: #2d5a27;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
  border-radius: 12px 12px 0 0;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 12px;
  color: #666;
}

.modal-body {
  padding: 24px;
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section-title {
  font-size: 15px;
  font-weight: 600;
  color: #2d5a27;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8f5e9;
}

.detail-row {
  display: flex;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.6;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-label {
  color: #666;
  min-width: 100px;
  flex-shrink: 0;
}

.detail-value {
  color: #333;
  flex: 1;
  word-break: break-all;
}

.detail-value.countdown {
  color: #1976D2;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
  border-radius: 0 0 12px 12px;
}

.modal-btn {
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.cancel-btn {
  background: #fff;
  color: #666;
  border-color: #e0e0e0;
}

.cancel-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.primary-btn {
  background: #2d5a27;
  color: #fff;
}

.primary-btn:hover:not(:disabled) {
  background: #1f421b;
}

.primary-btn:disabled {
  background: #e0e0e0;
  color: #999;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .detail-btn {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .exam-actions {
    flex-direction: column;
  }
  
  .modal-content {
    width: 95%;
    max-height: 90vh;
  }
  
  .detail-row {
    flex-direction: column;
  }
  
  .detail-label {
    margin-bottom: 4px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-btn {
    width: 100%;
  }
}
</style>
