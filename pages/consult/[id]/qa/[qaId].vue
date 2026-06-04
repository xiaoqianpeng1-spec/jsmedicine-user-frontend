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
          <span class="breadcrumb-item" @click="goToDoctor">符惠娟</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-item active">专家答疑</span>
        </div>
      </div>
    </div>

    <!-- 答疑详情区域 -->
    <section class="qa-detail-section">
      <div class="container">
        <div class="qa-detail-card">
          <h3 class="section-title">专家答疑</h3>
          
          <div class="qa-content">
            <p class="question-text">{{ qaDetail.question }}</p>
            <div class="question-footer">
              <span class="question-time">{{ qaDetail.time }}</span>
              <span class="question-status">{{ qaDetail.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const qaDetail = reactive({
  question: '符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？',
  time: '2022/12/02',
  status: '已回答'
})

const goToHome = () => {
  router.push('/')
}

const goToConsult = () => {
  router.push('/consult')
}

const goToDoctor = () => {
  router.push('/consult/1')
}
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

/* 答疑详情区域 */
.qa-detail-section {
  padding: 30px 0 50px;
}

.qa-detail-card {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
}

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
}

.question-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-time {
  font-size: 14px;
  color: #999;
}

.question-status {
  font-size: 14px;
  color: #2d5a27;
  font-weight: 500;
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
}
</style>