<template>
  <div class="qa-detail-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">专家咨询</h1>
        <p class="banner-desc">专业问题咨询，名师在线解答</p>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="goToHome">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item" @click="goToConsult">咨询</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">咨询详情</span>
        </div>
      </div>
    </div>

    <!-- 加载中 -->
    <section class="qa-detail-section" v-if="loading">
      <div class="container">
        <div class="loading-state">加载中...</div>
      </div>
    </section>

    <!-- 详情内容 -->
    <section class="qa-detail-section" v-else-if="detail">
      <div class="container">
        <!-- 问题卡片 -->
        <div class="qa-detail-card">
          <h3 class="section-title">
            <span class="title-text">{{ detail.title }}</span>
            <span class="status-badge" :class="'status-' + detail.status.toLowerCase()">
              {{ statusLabels[detail.status] || detail.status }}
            </span>
          </h3>

          <div class="qa-content">
            <p class="question-text">{{ detail.content }}</p>
            <div class="question-footer">
              <span class="question-id">咨询编号：{{ detail.id }}</span>
            </div>
          </div>
        </div>

        <!-- 回答列表 -->
        <div class="answers-card" v-if="detail.answers && detail.answers.length > 0">
          <h3 class="section-title">专家回复 ({{ detail.answers.length }})</h3>
          <div class="answer-item" v-for="(answer, index) in detail.answers" :key="answer.id">
            <div class="answer-header">
              <span class="answer-label">回复 #{{ index + 1 }}</span>
              <span class="answer-time" v-if="answer.answeredAt">{{ formatTime(answer.answeredAt) }}</span>
            </div>
            <p class="answer-content">{{ answer.content }}</p>
          </div>
        </div>

        <!-- 无回答提示 -->
        <div class="answers-card" v-else-if="detail.status === 'PENDING'">
          <h3 class="section-title">专家回复</h3>
          <div class="no-answer">
            <p>您的咨询已提交，专家正在查看中，请耐心等待回复。</p>
          </div>
        </div>

        <!-- 返回按钮 -->
        <div class="back-section">
          <button class="back-btn" @click="goToConsult">返回咨询列表</button>
        </div>
      </div>
    </section>

    <!-- 错误状态 -->
    <section class="qa-detail-section" v-else>
      <div class="container">
        <div class="error-state">
          <p>{{ errorMsg || '咨询不存在或已被删除' }}</p>
          <button class="back-btn" @click="goToConsult">返回咨询列表</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { expertsApi, type AppQaQuestionResponse } from '~/utils/api/experts'

const router = useRouter()
const route = useRoute()

const detail = ref<AppQaQuestionResponse | null>(null)
const loading = ref(true)
const errorMsg = ref('')

const statusLabels: Record<string, string> = {
  PENDING: '待回复',
  ANSWERED: '已回复',
  CLOSED: '已关闭'
}

const goToHome = () => router.push('/')

const goToConsult = () => router.push('/consult')

const formatTime = (dateStr: string): string => {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const h = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    return `${y}/${m}/${day} ${h}:${min}`
  } catch {
    return dateStr
  }
}

const fetchDetail = async () => {
  const qaId = Number(route.params.qaId)
  if (!qaId) {
    errorMsg.value = '无效的咨询编号'
    loading.value = false
    return
  }

  loading.value = true
  try {
    const response = await expertsApi.getQuestionDetail(qaId)
    if (response.success) {
      detail.value = response.data
    } else {
      errorMsg.value = response.message || '获取咨询详情失败'
    }
  } catch (err: any) {
    console.error('Failed to fetch QA detail:', err)
    errorMsg.value = err.message || '获取咨询详情失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.qa-detail-page {
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

/* 详情区域 */
.qa-detail-section {
  padding: 30px 0 50px;
}

.qa-detail-card,
.answers-card {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.title-text {
  flex: 1;
}

/* 状态标签 */
.status-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

.status-pending {
  background: #FFF3E0;
  color: #E65100;
}

.status-answered {
  background: #E8F5E9;
  color: #2E7D32;
}

.status-closed {
  background: #F5F5F5;
  color: #999;
}

/* 问题内容 */
.qa-content {
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
}

.question-text {
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin: 0 0 16px 0;
  white-space: pre-wrap;
}

.question-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-id {
  font-size: 13px;
  color: #bbb;
}

/* 回答列表 */
.answer-item {
  padding: 20px;
  background: #f8fbf8;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: 3px solid #2d5a27;
}

.answer-item:last-child {
  margin-bottom: 0;
}

.answer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.answer-label {
  font-size: 14px;
  font-weight: 600;
  color: #2d5a27;
}

.answer-time {
  font-size: 13px;
  color: #999;
}

.answer-content {
  font-size: 15px;
  color: #333;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
}

/* 无回答 */
.no-answer {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 15px;
}

.no-answer p {
  margin: 0;
}

/* 返回按钮 */
.back-section {
  text-align: center;
  padding: 20px 0;
}

.back-btn {
  padding: 10px 32px;
  background: #fff;
  border: 1px solid #2d5a27;
  border-radius: 6px;
  color: #2d5a27;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #2d5a27;
  color: #fff;
}

/* 加载 / 错误状态 */
.loading-state,
.error-state {
  text-align: center;
  padding: 80px 20px;
  color: #999;
  font-size: 16px;
}

.error-state {
  color: #e74c3c;
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

  .qa-detail-card,
  .answers-card {
    padding: 20px;
  }
}
</style>