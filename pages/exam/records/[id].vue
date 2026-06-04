<template>
  <div class="exam-record-detail-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">{{ examRecord.paperName }}</h1>
        <p class="banner-desc">考试结果与解析</p>
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
          <span class="breadcrumb-item" @click="goToRecords">考试记录</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">详情</span>
        </div>
      </div>
    </div>

    <!-- 考试结果概览 -->
    <section class="result-overview-section">
      <div class="container">
        <div class="result-overview-card">
          <div class="overview-item">
            <span class="overview-label">考试时间</span>
            <span class="overview-value">{{ formatDate(examRecord.submittedAt) }}</span>
          </div>
          <div class="overview-item">
            <span class="overview-label">得分</span>
            <span class="overview-value score">{{ examRecord.score }}</span>
          </div>
          <div class="overview-item">
            <span class="overview-label">考试状态</span>
            <div 
              class="overview-value status"
              :class="{ passed: examRecord.passed === 1, failed: examRecord.passed === 0 }"
            >
              {{ examRecord.passed === 1 ? '及格' : '不及格' }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 答题详情 -->
    <section class="answers-section">
      <div class="container">
        <h2 class="section-title">答题详情</h2>
        <div class="answers-list">
          <div 
            v-for="(answer, index) in examRecord.answers" 
            :key="answer.questionId"
            class="answer-card"
          >
            <div class="answer-header">
              <span class="answer-index">{{ index + 1 }}</span>
              <span class="answer-type">{{ getQuestionTypeText(answer.questionType) }}</span>
              <span 
                class="answer-correct"
                :class="{ correct: answer.correct === 1, wrong: answer.correct === 0 }"
              >
                {{ answer.correct === 1 ? '正确' : '错误' }}
              </span>
              <span class="answer-score">{{ answer.score }} 分</span>
            </div>
            <h4 class="answer-title">{{ answer.title }}</h4>
            
            <!-- 题目选项 -->
            <div v-if="answer.options && answer.options.length > 0" class="answer-options">
              <div 
                v-for="option in answer.options" 
                :key="option.id"
                class="option-item"
                :class="{ 
                  'is-correct-answer': isCorrectAnswer(answer.correctAnswer, option.optionKey),
                  'is-user-answer': isUserAnswer(answer.answerContent, option.optionKey)
                }"
              >
                <span class="option-key">{{ option.optionKey }}.</span>
                <span class="option-content">{{ option.optionContent }}</span>
              </div>
            </div>

            <div class="answer-content">
              <div class="answer-item">
                <span class="label">您的答案：</span>
                <span class="value">{{ answer.answerContent || '未作答' }}</span>
              </div>
              <div class="answer-item">
                <span class="label">正确答案：</span>
                <span class="value correct-answer">{{ answer.correctAnswer }}</span>
              </div>
              <div v-if="answer.analysis" class="answer-item analysis">
                <span class="label">解析：</span>
                <p class="value">{{ answer.analysis }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { learningApi, type AppExamRecordResponse } from '~/utils/api/learning'

const router = useRouter()

const examRecord = ref<AppExamRecordResponse>({
  id: 0,
  studentId: 0,
  paperId: 0,
  paperName: '',
  sourceType: '',
  sourceId: 0,
  score: 0,
  passed: 0,
  startedAt: '',
  submittedAt: '',
  answers: []
})

const goToHome = () => {
  router.push('/')
}

const goToExamList = () => {
  router.push('/exam')
}

const goToRecords = () => {
  router.push('/exam/records')
}

const getQuestionTypeText = (type: string) => {
  const map: Record<string, string> = {
    SINGLE_CHOICE: '单选题',
    MULTIPLE_CHOICE: '多选题',
    TRUE_FALSE: '判断题',
    SHORT_ANSWER: '简答题'
  }
  return map[type] || type
}

const isCorrectAnswer = (correctAnswer: string, optionKey: string) => {
  if (!correctAnswer) return false
  return correctAnswer.includes(optionKey)
}

const isUserAnswer = (userAnswer: string, optionKey: string) => {
  if (!userAnswer) return false
  return userAnswer.includes(optionKey)
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

const loadRecordDetail = async () => {
  const id = parseInt(router.params.id as string)
  if (isNaN(id)) return
  
  try {
    const response = await learningApi.getExamRecordDetail(id)
    if (response.success) {
      examRecord.value = response.data
    }
  } catch (error) {
    console.error('Failed to load exam record detail:', error)
  }
}

onMounted(() => {
  loadRecordDetail()
})
</script>

<style scoped>
.exam-record-detail-page {
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
  padding: 40px 0;
  text-align: center;
}

.banner-title {
  font-size: 28px;
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

/* 考试结果概览 */
.result-overview-section {
  padding: 30px 0;
}

.result-overview-card {
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.overview-item {
  text-align: center;
}

.overview-label {
  display: block;
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
}

.overview-value {
  display: block;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.overview-value.score {
  font-size: 36px;
  color: #2d5a27;
}

.overview-value.status {
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 16px;
}

.overview-value.status.passed {
  background: #E8F5E9;
  color: #2d5a27;
}

.overview-value.status.failed {
  background: #FFEBEE;
  color: #DC2626;
}

/* 答题详情区域 */
.answers-section {
  padding: 0 0 50px 0;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.answer-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.answer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.answer-index {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2d5a27;
  color: #fff;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
}

.answer-type {
  padding: 4px 10px;
  background: #E3F2FD;
  color: #1976D2;
  border-radius: 4px;
  font-size: 12px;
}

.answer-correct {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.answer-correct.correct {
  background: #E8F5E9;
  color: #2d5a27;
}

.answer-correct.wrong {
  background: #FFEBEE;
  color: #DC2626;
}

.answer-score {
  margin-left: auto;
  font-size: 14px;
  color: #666;
}

.answer-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.answer-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 6px;
}

.option-item.is-correct-answer {
  background: #E8F5E9;
  border: 2px solid #2d5a27;
}

.option-item.is-user-answer:not(.is-correct-answer) {
  background: #FFF3E0;
  border: 2px solid #FF9800;
}

.option-key {
  font-weight: 600;
  color: #333;
}

.option-content {
  flex: 1;
  color: #666;
}

.answer-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.answer-item {
  display: flex;
  gap: 8px;
}

.answer-item .label {
  font-size: 14px;
  color: #999;
  white-space: nowrap;
}

.answer-item .value {
  font-size: 14px;
  color: #333;
  flex: 1;
}

.correct-answer {
  color: #2d5a27;
  font-weight: 500;
}

.answer-item.analysis .value {
  line-height: 1.6;
  padding: 12px;
  background: #f0f8f0;
  border-radius: 6px;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .result-overview-card {
    flex-direction: column;
    gap: 24px;
  }
  
  .banner-title {
    font-size: 22px;
  }
}
</style>