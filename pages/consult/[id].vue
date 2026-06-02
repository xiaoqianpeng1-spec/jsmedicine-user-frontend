<template>
  <div class="consult-detail-page">
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
          <span class="breadcrumb-item active">{{ doctor.name }}</span>
        </div>
      </div>
    </div>

    <!-- 专家信息区域 -->
    <section class="doctor-info-section">
      <div class="container">
        <div class="doctor-info-card">
          <div class="doctor-avatar-wrapper">
            <img :src="doctor.avatar" :alt="doctor.name" class="doctor-avatar" />
          </div>
          <div class="doctor-info-content">
            <h2 class="doctor-name">{{ doctor.name }}</h2>
            <p class="doctor-title">{{ doctor.title }}</p>
            <p class="doctor-department">科室：{{ doctor.department }}</p>
            <p class="doctor-specialty">履历：{{ doctor.specialty }}</p>
            <div class="doctor-intro">
              <p>{{ doctor.intro }}</p>
            </div>
            <button class="consult-button" @click="startConsult">咨询专家</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 专家答疑区域 -->
    <section class="qa-section">
      <div class="container">
        <div class="section-header">
          <h3 class="section-title">专家答疑</h3>
          <span class="more-link" @click="goToQAList">更多 ></span>
        </div>
        
        <div class="qa-list">
          <div 
            v-for="(item, index) in qaList" 
            :key="index"
            class="qa-item"
            @click="goToQA(item.id)"
          >
            <div class="qa-content">
              <p class="qa-question">{{ item.question }}</p>
            </div>
            <div class="qa-footer">
              <span class="qa-time">{{ item.time }}</span>
              <span class="qa-status">{{ item.status }}</span>
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

const doctor = reactive({
  id: 1,
  name: '符惠娟',
  avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20female%20doctor%20portrait%20professional&image_size=square',
  title: '主任中医师',
  department: '心血管',
  specialty: '心血管',
  intro: '符惠娟，常州市中医院心血管科科主任中医师，医学学术传承工作室成员，第三批江苏省中医临床优秀人才，中国中医药研究促进会理事'
})

const qaList = [
  {
    id: 1,
    question: '符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？',
    time: '2022/12/02',
    status: '已回答'
  },
  {
    id: 2,
    question: '符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？',
    time: '2022/12/02',
    status: '已回答'
  },
  {
    id: 3,
    question: '符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？',
    time: '2022/12/02',
    status: '已回答'
  },
  {
    id: 4,
    question: '符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？',
    time: '2022/12/02',
    status: '已回答'
  },
  {
    id: 5,
    question: '符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？',
    time: '2022/12/02',
    status: '已回答'
  },
  {
    id: 6,
    question: '符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？',
    time: '2022/12/02',
    status: '已回答'
  },
  {
    id: 7,
    question: '符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？',
    time: '2022/12/02',
    status: '已回答'
  },
  {
    id: 8,
    question: '符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？',
    time: '2022/12/02',
    status: '已回答'
  }
]

const goToHome = () => {
  router.push('/')
}

const goToConsult = () => {
  router.push('/consult')
}

const goToQAList = () => {
  router.push(`/consult/${doctor.id}/qa`)
}

const goToQA = (id: number) => {
  router.push(`/consult/${doctor.id}/qa/${id}`)
}

const startConsult = () => {
  alert('即将进入咨询页面')
}
</script>

<style scoped>
.consult-detail-page {
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

/* 专家信息区域 */
.doctor-info-section {
  padding: 30px 0;
}

.doctor-info-card {
  display: flex;
  gap: 30px;
  background: #fff;
  border-radius: 12px;
  padding: 30px;
}

.doctor-avatar-wrapper {
  flex-shrink: 0;
}

.doctor-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.doctor-info-content {
  flex: 1;
}

.doctor-name {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.doctor-title {
  font-size: 16px;
  color: #2d5a27;
  margin: 0 0 8px 0;
}

.doctor-department,
.doctor-specialty {
  font-size: 14px;
  color: #666;
  margin: 0 0 4px 0;
}

.doctor-intro {
  margin: 16px 0;
}

.doctor-intro p {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}

.consult-button {
  padding: 12px 32px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.consult-button:hover {
  background: #38a169;
}

/* 专家答疑区域 */
.qa-section {
  padding: 30px 0 50px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.more-link {
  font-size: 14px;
  color: #2d5a27;
  cursor: pointer;
}

.qa-list {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.qa-item {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.3s;
}

.qa-item:last-child {
  border-bottom: none;
}

.qa-item:hover {
  background: #f8fbf8;
}

.qa-content {
  margin-bottom: 12px;
}

.qa-question {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.qa-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.qa-time {
  font-size: 13px;
  color: #999;
}

.qa-status {
  font-size: 13px;
  color: #2d5a27;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .doctor-info-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .banner-title {
    font-size: 28px;
  }
}
</style>