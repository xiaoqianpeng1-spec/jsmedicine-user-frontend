<template>
  <div class="exam-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">在线考核</h1>
        <p class="page-desc">检验学习成果，巩固知识要点</p>
      </div>

      <div class="exam-stats">
        <div class="stat-card">
          <span class="stat-value">{{ totalExams }}</span>
          <span class="stat-label">已参加考核</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ avgScore }}</span>
          <span class="stat-label">平均成绩</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ passedCount }}</span>
          <span class="stat-label">通过考核</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ certification }}</span>
          <span class="stat-label">获得证书</span>
        </div>
      </div>

      <div class="exam-list">
        <div 
          v-for="exam in exams" 
          :key="exam.id" 
          class="exam-card"
          @click="goToExam(exam.id)"
        >
          <div class="exam-icon">{{ exam.icon }}</div>
          <div class="exam-info">
            <h3 class="exam-title">{{ exam.title }}</h3>
            <p class="exam-desc">{{ exam.desc }}</p>
            <div class="exam-meta">
              <span class="exam-duration">{{ exam.duration }}分钟</span>
              <span class="exam-questions">{{ exam.questions }}道题</span>
              <span class="exam-pass">及格线: {{ exam.passScore }}分</span>
            </div>
          </div>
          <div class="exam-status">
            <span v-if="exam.status === 'completed'" class="status-completed">已完成</span>
            <span v-else-if="exam.status === 'in-progress'" class="status-progress">进行中</span>
            <span v-else class="status-pending">待开始</span>
          </div>
        </div>
      </div>

      <div class="certification-section">
        <h3 class="section-title">我的证书</h3>
        <div class="cert-list">
          <div 
            v-for="cert in certifications" 
            :key="cert.id" 
            class="cert-card"
          >
            <div class="cert-badge">{{ cert.icon }}</div>
            <div class="cert-info">
              <h4 class="cert-title">{{ cert.title }}</h4>
              <span class="cert-date">{{ cert.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports'

const router = useRouter()

const totalExams = ref(8)
const avgScore = ref('85分')
const passedCount = ref(6)
const certification = ref('3项')

const exams = ref([
  {
    id: 1,
    icon: '📝',
    title: '中医基础理论考核',
    desc: '考核中医基础理论知识掌握程度',
    duration: 60,
    questions: 50,
    passScore: 60,
    status: 'completed'
  },
  {
    id: 2,
    icon: '💉',
    title: '针灸学专业考核',
    desc: '考核针灸学理论与实操知识',
    duration: 90,
    questions: 60,
    passScore: 60,
    status: 'completed'
  },
  {
    id: 3,
    icon: '🌿',
    title: '中药学知识考核',
    desc: '考核中药基础知识与方剂配伍',
    duration: 60,
    questions: 40,
    passScore: 60,
    status: 'in-progress'
  },
  {
    id: 4,
    icon: '👩⚕️',
    title: '中医诊断学考核',
    desc: '考核望闻问切四诊方法与辨证论治',
    duration: 90,
    questions: 50,
    passScore: 60,
    status: 'pending'
  },
  {
    id: 5,
    icon: '📚',
    title: '中医经典著作考核',
    desc: '考核黄帝内经、伤寒论等经典知识',
    duration: 120,
    questions: 80,
    passScore: 60,
    status: 'pending'
  }
])

const certifications = ref([
  { id: 1, icon: '🏆', title: '中医基础理论证书', date: '2024-01-10' },
  { id: 2, icon: '🎖️', title: '针灸学专业证书', date: '2024-01-15' },
  { id: 3, icon: '⭐', title: '优秀学员证书', date: '2024-01-20' }
])

const goToExam = (id: number) => {
  router.push(`/exam/${id}`)
}
</script>

<style scoped>
.exam-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
}

.page-desc {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.exam-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #666;
}

.exam-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.exam-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.exam-card:hover {
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.exam-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.exam-info {
  flex: 1;
  min-width: 0;
}

.exam-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.exam-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
}

.exam-meta {
  display: flex;
  gap: 16px;
}

.exam-duration,
.exam-questions,
.exam-pass {
  font-size: 13px;
  color: #999;
}

.exam-status {
  flex-shrink: 0;
}

.status-completed {
  padding: 8px 16px;
  background: #E8F5E9;
  color: #4CAF50;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.status-progress {
  padding: 8px 16px;
  background: #FFF8E1;
  color: #FF9800;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.status-pending {
  padding: 8px 16px;
  background: #f5f5f5;
  color: #999;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.certification-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
}

.cert-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cert-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.cert-badge {
  font-size: 36px;
}

.cert-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.cert-date {
  font-size: 13px;
  color: #999;
}

@media (max-width: 768px) {
  .exam-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .exam-card {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .exam-status {
    align-self: flex-end;
  }
}
</style>