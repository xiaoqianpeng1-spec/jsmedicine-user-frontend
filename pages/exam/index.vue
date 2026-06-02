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

    <!-- 考核列表 -->
    <section class="exam-section">
      <div class="container">
        <div class="exam-list">
          <div 
            v-for="exam in exams" 
            :key="exam.id" 
            class="exam-card"
          >
            <div class="exam-content">
              <h3 class="exam-title">{{ exam.title }}</h3>
              <p class="exam-desc">{{ exam.desc }}</p>
            </div>
            <button class="exam-button" @click="goToExam(exam.id)">立即答题</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const exams = ref([
  {
    id: 1,
    title: '实用中医方药学模拟练习卷',
    desc: '共10题，限时10分钟'
  },
  {
    id: 2,
    title: '中医适宜技术模拟练习卷',
    desc: '共10题，限时10分钟'
  },
  {
    id: 3,
    title: '实用中医理论基础模拟练习卷',
    desc: '共10题，限时10分钟'
  },
  {
    id: 4,
    title: '实用针灸推拿学模拟练习卷',
    desc: '共10题，限时10分钟'
  }
])

const goToHome = () => {
  router.push('/')
}

const goToExam = (id: number) => {
  router.push(`/exam/${id}`)
}
</script>

<style scoped>
.exam-page {
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

/* 考核列表区域 */
.exam-section {
  padding: 50px 0;
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
  position: relative;
  overflow: hidden;
}

.exam-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200'%3E%3Cpath fill='%23f0f0f0' fill-opacity='0.5' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1104,176L1152,192L1152,200L1104,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z'%3E%3C/path%3E%3C/svg%3E");
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  pointer-events: none;
}

.exam-content {
  position: relative;
  z-index: 1;
}

.exam-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.exam-desc {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.exam-button {
  position: relative;
  z-index: 1;
  padding: 10px 24px;
  background: #2d5a27;
  color: #fff;
  border: 1px solid #2d5a27;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.exam-button:hover {
  background: #fff;
  color: #2d5a27;
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
  
  .exam-button {
    align-self: flex-end;
  }
  
  .banner-title {
    font-size: 28px;
  }
}
</style>