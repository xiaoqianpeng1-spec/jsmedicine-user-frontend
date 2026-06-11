<template>
  <div class="exam-detail-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <div class="banner-content">
          <h1 class="banner-title">{{ examPaper.paperName }}</h1>
          <p class="banner-desc">{{ examPaper.description }}</p>
          <div class="exam-info">
            <span class="info-item">📝 {{ examPaper.questions.length }} 题</span>
            <span class="info-item">⏱️ {{ examPaper.durationMinutes }} 分钟</span>
            <span class="info-item">🏆 满分 {{ examPaper.totalScore }} 分</span>
            <span class="info-item">✅ 及格线 {{ examPaper.passScore }} 分</span>
          </div>
        </div>
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
          <span class="breadcrumb-item active">{{ examPaper.paperName }}</span>
        </div>
      </div>
    </div>

    <!-- 倒计时栏 -->
    <div class="timer-bar" v-if="!submitted">
      <div class="container">
        <div class="timer-content">
          <span class="timer-label">剩余时间：</span>
          <span class="timer-value">{{ formatTime(remainingTime) }}</span>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <section class="main-section">
      <div class="container">
        <div class="main-content">
          <!-- 左侧题目列表 -->
          <aside class="sidebar">
            <div class="sidebar-title">题目导航</div>
            <div class="question-nav">
              <div 
                v-for="(question, index) in examPaper.questions" 
                :key="question.questionId"
                class="question-nav-item"
                :class="{ 
                  active: currentQuestionIndex === index,
                  answered: isQuestionAnswered(question.questionId)
                }"
                @click="scrollToQuestion(index)"
              >
                {{ index + 1 }}
              </div>
            </div>
          </aside>

          <!-- 右侧答题区域 -->
          <main class="content-area">
            <div v-if="!submitted">
              <div 
                v-for="(question, index) in examPaper.questions" 
                :key="question.questionId"
                :id="`question-${index}`"
                class="question-card"
              >
                <div class="question-header">
                  <span class="question-type">{{ getQuestionTypeText(question.questionType) }}</span>
                  <span class="question-difficulty">{{ getDifficultyText(question.difficulty) }}</span>
                  <span class="question-score">{{ question.score }} 分</span>
                </div>
                <h3 class="question-title">{{ index + 1 }}. {{ question.title }}</h3>

                <!-- 单选题 -->
                <div v-if="question.questionType === 'SINGLE_CHOICE'" class="question-options">
                  <label 
                    v-for="option in question.options" 
                    :key="option.id"
                    class="option-item"
                  >
                    <input 
                      type="radio" 
                      :name="`question-${question.questionId}`"
                      :value="option.optionKey"
                      v-model="answers[question.questionId]"
                    />
                    <span class="option-key">{{ option.optionKey }}.</span>
                    <span class="option-content">{{ option.optionContent }}</span>
                  </label>
                </div>

                <!-- 多选题 -->
                <div v-if="question.questionType === 'MULTIPLE_CHOICE'" class="question-options">
                  <label 
                    v-for="option in question.options" 
                    :key="option.id"
                    class="option-item"
                  >
                    <input 
                      type="checkbox" 
                      :value="option.optionKey"
                      v-model="multipleAnswers[question.questionId]"
                    />
                    <span class="option-key">{{ option.optionKey }}.</span>
                    <span class="option-content">{{ option.optionContent }}</span>
                  </label>
                </div>

                <!-- 判断题 -->
                <div v-if="question.questionType === 'TRUE_FALSE'" class="question-options">
                  <label class="option-item">
                    <input 
                      type="radio" 
                      :name="`question-${question.questionId}`"
                      value="true"
                      v-model="answers[question.questionId]"
                    />
                    <span class="option-content">正确</span>
                  </label>
                  <label class="option-item">
                    <input 
                      type="radio" 
                      :name="`question-${question.questionId}`"
                      value="false"
                      v-model="answers[question.questionId]"
                    />
                    <span class="option-content">错误</span>
                  </label>
                </div>

                <!-- 简答题 -->
                <div v-if="question.questionType === 'SHORT_ANSWER'" class="question-textarea">
                  <textarea 
                    v-model="answers[question.questionId]"
                    placeholder="请输入您的答案..."
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <!-- 提交按钮 -->
              <div class="submit-section">
                <button class="submit-btn" @click="submitExam">提交试卷</button>
              </div>
            </div>

            <!-- 考试结果 -->
            <div v-else class="result-section">
              <div class="result-card">
                <div class="result-header">
                  <h2 class="result-title">考试结果</h2>
                  <div class="result-score">
                    <span class="score-value">{{ examResult.score }}</span>
                    <span class="score-total">/ {{ examPaper.totalScore }} 分</span>
                  </div>
                  <div 
                    class="result-status" 
                    :class="{ passed: examResult.passed === 1, failed: examResult.passed === 0 }"
                  >
                    {{ examResult.passed === 1 ? '及格' : '不及格' }}
                  </div>
                </div>

                <div class="result-details">
                  <div 
                    v-for="(answer, index) in examResult.answers" 
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

                <div class="result-actions">
                  <button class="action-btn" @click="goToExamList">返回考试列表</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { learningApi, type AppExamPaperResponse, type AppExamRecordResponse } from '~/utils/api/learning'

const router = useRouter()
const route = useRoute()

const examPaper = ref<AppExamPaperResponse>({
  id: 0,
  paperName: '',
  description: '',
  totalScore: 0,
  passScore: 0,
  durationMinutes: 0,
  status: 'DISABLED',
  questions: []
})

const answers = ref<Record<number, string>>({})
const multipleAnswers = ref<Record<number, string[]>>({})
const submitted = ref(false)
const examResult = ref<AppExamRecordResponse>({
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

const currentQuestionIndex = ref(0)
const remainingTime = ref(0)
let timer: number | null = null

const goToHome = () => {
  router.push('/')
}

const goToExamList = () => {
  router.push('/exam')
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

const getDifficultyText = (difficulty: string) => {
  const map: Record<string, string> = {
    EASY: '简单',
    MEDIUM: '中等',
    HARD: '困难'
  }
  return map[difficulty] || difficulty
}

const isQuestionAnswered = (questionId: number) => {
  return answers.value[questionId] || (multipleAnswers.value[questionId] && multipleAnswers.value[questionId].length > 0)
}

const scrollToQuestion = (index: number) => {
  currentQuestionIndex.value = index
  const element = document.getElementById(`question-${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const startTimer = () => {
  remainingTime.value = examPaper.value.durationMinutes * 60
  timer = window.setInterval(() => {
    remainingTime.value--
    if (remainingTime.value <= 0) {
      if (timer) clearInterval(timer)
      submitExam()
    }
  }, 1000)
}

const submitExam = async () => {
  if (timer) clearInterval(timer)
  
  const answerList = examPaper.value.questions.map(question => {
    let answerContent = ''
    if (question.questionType === 'MULTIPLE_CHOICE') {
      answerContent = (multipleAnswers.value[question.questionId] || []).sort().join(',')
    } else {
      answerContent = answers.value[question.questionId] || ''
    }
    return {
      questionId: question.questionId,
      answerContent
    }
  })

  const assessmentId = parseInt(route.query.assessmentId as string) || 0

  try {
    const response = await learningApi.submitExamAssessment(assessmentId, {
      requestId: `submit_${assessmentId}_${Date.now()}`,
      answers: answerList
    })
    if (response.success) {
      examResult.value = response.data
      submitted.value = true
    }
  } catch (error) {
    console.error('Failed to submit exam:', error)
  }
}

const loadExamPaper = async () => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) return
  
  try {
    const response = await learningApi.getExamPaperDetail(id)
    if (response.success) {
      examPaper.value = response.data
      startTimer()
    }
  } catch (error) {
    console.error('Failed to load exam paper:', error)
  }
}

onMounted(() => {
  loadExamPaper()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.exam-detail-page {
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
}

.banner-content {
  text-align: center;
  color: #fff;
}

.banner-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.banner-desc {
  font-size: 14px;
  opacity: 0.9;
  margin: 0 0 20px 0;
}

.exam-info {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.info-item {
  font-size: 14px;
  opacity: 0.9;
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

/* 倒计时栏 */
.timer-bar {
  background: #fff3cd;
  padding: 12px 0;
  border-bottom: 1px solid #ffc107;
}

.timer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.timer-label {
  font-size: 14px;
  color: #856404;
}

.timer-value {
  font-size: 18px;
  font-weight: 600;
  color: #dc3545;
}

/* 主内容区域 */
.main-section {
  padding: 30px 0;
}

.main-content {
  display: flex;
  gap: 24px;
}

/* 左侧侧边栏 */
.sidebar {
  width: 120px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  position: sticky;
  top: 20px;
  height: fit-content;
}

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  padding: 0 0 12px 0;
  border-bottom: 2px solid #2d5a27;
  margin-bottom: 12px;
}

.question-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.question-nav-item {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.question-nav-item:hover {
  background: #e8f5e9;
  color: #2d5a27;
}

.question-nav-item.active {
  background: #2d5a27;
  color: #fff;
}

.question-nav-item.answered {
  background: #E8F5E9;
  color: #2d5a27;
  font-weight: 500;
}

/* 右侧内容区域 */
.content-area {
  flex: 1;
}

.question-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.question-type {
  padding: 4px 10px;
  background: #E3F2FD;
  color: #1976D2;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.question-difficulty {
  padding: 4px 10px;
  background: #FFF3E0;
  color: #F57C00;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.question-score {
  margin-left: auto;
  font-size: 14px;
  color: #666;
}

.question-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.question-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.option-item:hover {
  background: #f0f0f0;
}

.option-item input {
  cursor: pointer;
}

.option-key {
  font-weight: 600;
  color: #333;
}

.option-content {
  flex: 1;
  color: #666;
}

.question-textarea {
  margin-top: 16px;
}

.question-textarea textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s;
}

.question-textarea textarea:focus {
  border-color: #2d5a27;
}

/* 提交区域 */
.submit-section {
  text-align: center;
  padding: 20px 0;
}

.submit-btn {
  padding: 14px 48px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: #1f421b;
  transform: translateY(-2px);
}

/* 考试结果 */
.result-section {
  padding: 20px 0;
}

.result-card {
  background: #fff;
  border-radius: 8px;
  padding: 32px;
}

.result-header {
  text-align: center;
  padding: 0 0 32px 0;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 32px;
}

.result-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
}

.result-score {
  font-size: 48px;
  font-weight: 600;
  color: #2d5a27;
  margin-bottom: 12px;
}

.score-total {
  font-size: 24px;
  color: #999;
}

.result-status {
  display: inline-block;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
}

.result-status.passed {
  background: #E8F5E9;
  color: #2d5a27;
}

.result-status.failed {
  background: #FFEBEE;
  color: #DC2626;
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.answer-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.answer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
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
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
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

.result-actions {
  margin-top: 32px;
  text-align: center;
}

.action-btn {
  padding: 12px 36px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #1f421b;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    position: static;
  }
  
  .question-nav {
    grid-template-columns: repeat(8, 1fr);
  }
  
  .banner-title {
    font-size: 22px;
  }
}
</style>