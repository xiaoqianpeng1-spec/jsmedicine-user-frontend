<template>
  <div class="consult-detail">
    <div class="consult-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h2>咨询详情</h2>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadQuestionDetail">重新加载</button>
    </div>

    <div v-else-if="question" class="consult-content">
      <!-- 咨询信息卡片 -->
      <div class="info-card">
        <div class="info-row">
          <span class="label">咨询标题</span>
          <span class="value">{{ question.title }}</span>
        </div>
        <div class="info-row">
          <span class="label">咨询内容</span>
          <p class="value content-text">{{ question.content }}</p>
        </div>
        <div class="info-row">
          <span class="label">咨询状态</span>
          <span class="status-badge" :class="'status-' + (typeof question.status === 'string' ? question.status.toLowerCase() : 'unknown')">
            {{ statusLabelMap[question.status as string] || (typeof question.status === 'string' ? question.status : '未知') }}
          </span>
        </div>
        <div class="info-row">
          <span class="label">状态描述</span>
          <span class="value">{{ question.statusLabel || '-' }}</span>
        </div>
      </div>

      <!-- 回答列表 -->
      <div class="answers-section">
        <h3>专家回复</h3>
        
        <div v-if="question.answers && question.answers.length > 0" class="answers-list">
          <div v-for="answer in question.answers" :key="answer.id" class="answer-item">
            <div class="answer-header">
              <span class="answer-icon">💬</span>
              <span class="answer-time">{{ formatTime(answer.answeredAt) }}</span>
            </div>
            <div class="answer-content">
              {{ answer.content }}
            </div>
          </div>
        </div>
        
        <div v-else class="no-answer">
          <p>暂无回复，专家将尽快为您解答</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { expertsApi, type AppQaQuestionResponse } from '~/utils/api/experts'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const error = ref('')
const question = ref<AppQaQuestionResponse | null>(null)

const statusLabelMap: Record<string, string> = {
  'PENDING': '待回复',
  'ANSWERED': '已回复',
  'CLOSED': '已关闭'
}

const loadQuestionDetail = async () => {
  loading.value = true
  error.value = ''
  
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    error.value = '无效的咨询ID'
    loading.value = false
    return
  }

  try {
    const response = await expertsApi.getQuestionDetail(id)
    if (response.success && response.data) {
      question.value = response.data
    } else {
      error.value = response.message || '获取咨询详情失败'
    }
  } catch (err: any) {
    console.error('获取咨询详情失败:', err)
    error.value = err.message || '获取咨询详情失败'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}

const formatTime = (timeStr?: string) => {
  if (!timeStr) return '-'
  try {
    const date = new Date(timeStr)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return timeStr
  }
}

onMounted(() => {
  loadQuestionDetail()
})
</script>

<style scoped>
.consult-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  min-height: 100vh;
}

.consult-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.back-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.back-btn:hover {
  background: #eee;
}

.consult-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.loading, .error {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #20c997;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: #dc3545;
}

.error button {
  margin-top: 16px;
  padding: 8px 20px;
  background: #20c997;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.info-card {
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.info-row {
  margin-bottom: 16px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.label {
  display: inline-block;
  width: 80px;
  font-weight: 500;
  color: #666;
  font-size: 14px;
}

.value {
  color: #333;
  font-size: 14px;
}

.content-text {
  display: block;
  margin-top: 8px;
  margin-left: 80px;
  line-height: 1.6;
  white-space: pre-wrap;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-answered {
  background: #d4edda;
  color: #155724;
}

.status-closed {
  background: #f8d7da;
  color: #721c24;
}

.status-unknown {
  background: #eee;
  color: #666;
}

.answers-section {
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
}

.answers-section h3 {
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 600;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.answer-item {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #20c997;
}

.answer-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.answer-icon {
  font-size: 18px;
}

.answer-time {
  font-size: 12px;
  color: #999;
}

.answer-content {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.no-answer {
  text-align: center;
  padding: 30px;
  color: #999;
}
</style>