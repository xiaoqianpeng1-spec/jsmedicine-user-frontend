<template>
  <div class="expert-detail-page">
    <!-- 顶部横幅 -->
    <section class="page-banner" :style="{ backgroundImage: `url(${expert.coverUrl || '/images/default-cover.jpg'})` }">
      <div class="banner-overlay"></div>
      <div class="container">
        <div class="banner-content">
          <div class="expert-avatar-wrapper">
            <img :src="expert.avatarUrl" :alt="expert.realName" class="expert-avatar" />
            <span class="online-status">在线</span>
          </div>
          <h1 class="expert-name">{{ expert.realName }}</h1>
          <p class="expert-title">{{ expert.title }} | {{ expert.organization }}</p>
          <p class="expert-specialty">{{ expert.specialty }}</p>
          <button class="consult-btn" @click="startConsultation">立即咨询</button>
        </div>
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
          <span class="breadcrumb-item active">{{ expert.realName }}</span>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <section class="main-section">
      <div class="container">
        <div class="main-content">
          <!-- 左侧专家信息 -->
          <aside class="sidebar">
            <div class="info-card">
              <h3 class="card-title">基本信息</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">性别</span>
                  <span class="info-value">{{ genderText }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">出生日期</span>
                  <span class="info-value">{{ expert.birthDate }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">联系电话</span>
                  <span class="info-value">{{ expert.mobile }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">职称</span>
                  <span class="info-value">{{ expert.title }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">所在机构</span>
                  <span class="info-value">{{ expert.organization }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">专业领域</span>
                  <span class="info-value">{{ expert.specialty }}</span>
                </div>
              </div>
            </div>

            <!-- 咨询须知 -->
            <div class="info-card consultation-notice">
              <h3 class="card-title">咨询须知</h3>
              <div class="notice-content">
                <p>{{ expert.consultationNotice || '暂无咨询须知' }}</p>
              </div>
            </div>
          </aside>

          <!-- 右侧详细内容 -->
          <main class="content-area">
            <!-- 专家介绍 -->
            <div class="content-card">
              <h2 class="section-title">专家介绍</h2>
              <div class="introduction-content">
                <p>{{ expert.introduction || '暂无介绍' }}</p>
              </div>
            </div>

            <!-- 教育背景 -->
            <div class="content-card" v-if="educationExperiences.length > 0">
              <h2 class="section-title">教育背景</h2>
              <div class="experience-list">
                <div 
                  v-for="exp in educationExperiences" 
                  :key="exp.id" 
                  class="experience-item"
                >
                  <div class="experience-header">
                    <span class="experience-title">{{ exp.title }}</span>
                    <span class="experience-period">{{ formatDate(exp.startDate) }} - {{ formatDate(exp.endDate) }}</span>
                  </div>
                  <p class="experience-desc">{{ exp.description }}</p>
                </div>
              </div>
            </div>

            <!-- 工作经历 -->
            <div class="content-card" v-if="workExperiences.length > 0">
              <h2 class="section-title">工作经历</h2>
              <div class="experience-list">
                <div 
                  v-for="exp in workExperiences" 
                  :key="exp.id" 
                  class="experience-item"
                >
                  <div class="experience-header">
                    <span class="experience-title">{{ exp.title }}</span>
                    <span class="experience-period">{{ formatDate(exp.startDate) }} - {{ formatDate(exp.endDate) }}</span>
                  </div>
                  <p class="experience-desc">{{ exp.description }}</p>
                </div>
              </div>
            </div>

            <!-- 成就荣誉 -->
            <div class="content-card" v-if="achievementExperiences.length > 0">
              <h2 class="section-title">成就荣誉</h2>
              <div class="experience-list">
                <div 
                  v-for="exp in achievementExperiences" 
                  :key="exp.id" 
                  class="experience-item"
                >
                  <div class="experience-header">
                    <span class="experience-title">{{ exp.title }}</span>
                    <span class="experience-period">{{ formatDate(exp.startDate) }}</span>
                  </div>
                  <p class="experience-desc">{{ exp.description }}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>

    <!-- 底部咨询按钮 -->
    <div class="bottom-bar">
      <div class="container">
        <button class="bottom-consult-btn" @click="startConsultation">立即咨询专家</button>
      </div>
    </div>

    <!-- 咨询表单弹窗 -->
    <div v-if="showConsultForm" class="consult-modal-overlay" @click.self="closeConsultForm">
      <div class="consult-modal">
        <div class="modal-header">
          <h3>发起咨询</h3>
          <span class="modal-close" @click="closeConsultForm">×</span>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>咨询专家</label>
            <input type="text" :value="expert.realName" disabled class="form-input readonly" />
          </div>
          <div class="form-group">
            <label>咨询标题 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="consultForm.title" 
              placeholder="请输入咨询标题（限128字）" 
              maxlength="128"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>咨询内容 <span class="required">*</span></label>
            <textarea 
              v-model="consultForm.content" 
              placeholder="请详细描述您的问题..." 
              rows="6"
              class="form-textarea"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeConsultForm">取消</button>
          <button class="btn-submit" @click="submitConsultation" :disabled="formSubmitting">
            {{ formSubmitting ? '提交中...' : '提交咨询' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { expertsApi, type AppExpertResponse, type AppQaQuestionRequest } from '~/utils/api/experts'

const router = useRouter()
const route = useRoute()

// 咨询表单状态
const showConsultForm = ref(false)
const formSubmitting = ref(false)
const consultForm = ref<AppQaQuestionRequest>({
  title: '',
  content: '',
  expertId: undefined,
  expertCategoryId: undefined
})

const expert = ref<AppExpertResponse>({
  id: 0,
  realName: '',
  gender: 'UNKNOWN',
  birthDate: '',
  mobile: '',
  avatarUrl: '',
  coverUrl: '',
  title: '',
  organization: '',
  specialty: '',
  introduction: '',
  consultationNotice: '',
  sortOrder: 0,
  categoryIds: [],
  experiences: []
})

const genderText = computed(() => {
  const map: Record<string, string> = {
    MALE: '男',
    FEMALE: '女',
    UNKNOWN: '未知'
  }
  return map[expert.value.gender] || '未知'
})

const educationExperiences = computed(() => {
  return expert.value.experiences
    .filter(exp => exp.experienceType === 'EDUCATION')
    .sort((a, b) => a.sortOrder - b.sortOrder)
})

const workExperiences = computed(() => {
  return expert.value.experiences
    .filter(exp => exp.experienceType === 'WORK')
    .sort((a, b) => a.sortOrder - b.sortOrder)
})

const achievementExperiences = computed(() => {
  return expert.value.experiences
    .filter(exp => exp.experienceType === 'ACHIEVEMENT')
    .sort((a, b) => a.sortOrder - b.sortOrder)
})

const goToHome = () => {
  router.push('/')
}

const goToConsult = () => {
  router.push('/consult')
}

const startConsultation = () => {
  // 初始化表单
  consultForm.value = {
    title: '',
    content: '',
    expertId: expert.value.id,
    expertCategoryId: expert.value.categoryIds?.[0]
  }
  showConsultForm.value = true
}

// 关闭咨询表单
const closeConsultForm = () => {
  showConsultForm.value = false
}

// 提交咨询
const submitConsultation = async () => {
  if (!consultForm.value.title.trim()) {
    alert('请输入咨询标题')
    return
  }
  if (!consultForm.value.content.trim()) {
    alert('请输入咨询内容')
    return
  }

  formSubmitting.value = true
  try {
    const response = await expertsApi.createQuestion({
      title: consultForm.value.title.trim(),
      content: consultForm.value.content.trim(),
      expertId: consultForm.value.expertId,
      expertCategoryId: consultForm.value.expertCategoryId
    })
    if (response.success) {
      alert('咨询已提交成功！即将跳转到我的咨询页面查看记录...')
      showConsultForm.value = false
      // 提交成功后跳转到"我的咨询"页面
      router.push({ path: '/consult', query: { tab: 'myQuestions' } })
    } else {
      alert(response.message || '提交失败，请稍后重试')
    }
  } catch (err: any) {
    console.error('提交咨询失败:', err)
    alert(err.message || '提交失败，请稍后重试')
  } finally {
    formSubmitting.value = false
  }
}

const formatDate = (date: string) => {
  if (!date) return '至今'
  return date
}

const loadExpertDetail = async () => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) return
  
  try {
    const response = await expertsApi.getExpertDetail(id)
    if (response.success) {
      expert.value = response.data
    }
  } catch (error) {
    console.error('Failed to load expert detail:', error)
  }
}

onMounted(() => {
  loadExpertDetail()
})
</script>

<style scoped>
.expert-detail-page {
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
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 80px 0;
  min-height: 300px;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.banner-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
}

.expert-avatar-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}

.expert-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.8);
  object-fit: cover;
}

.online-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 4px 12px;
  background: #2d5a27;
  color: #fff;
  font-size: 12px;
  border-radius: 12px;
  font-weight: 500;
}

.expert-name {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.expert-title {
  font-size: 16px;
  margin: 0 0 8px 0;
  opacity: 0.9;
}

.expert-specialty {
  font-size: 14px;
  margin: 0 0 20px 0;
  opacity: 0.8;
}

.consult-btn {
  padding: 12px 40px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.consult-btn:hover {
  background: #1f421b;
  transform: translateY(-2px);
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
  width: 280px;
  flex-shrink: 0;
}

.info-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 0 0 12px 0;
  border-bottom: 2px solid #2d5a27;
  margin-bottom: 16px;
}

.info-list {
  padding: 0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: #999;
}

.info-value {
  font-size: 14px;
  color: #333;
}

.consultation-notice .notice-content {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

/* 右侧内容区域 */
.content-area {
  flex: 1;
}

.content-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  padding-left: 12px;
  border-left: 4px solid #2d5a27;
}

.introduction-content {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
}

.experience-list {
  padding: 0;
}

.experience-item {
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.experience-item:last-child {
  border-bottom: none;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.experience-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.experience-period {
  font-size: 13px;
  color: #999;
}

.experience-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 底部固定栏 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 16px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.bottom-consult-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 14px 0;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.bottom-consult-btn:hover {
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
  }
  
  .expert-name {
    font-size: 26px;
  }
  
  .expert-avatar-wrapper {
    width: 120px;
    height: 120px;
  }
}

/* ===== 咨询表单弹窗样式 ===== */
.consult-modal-overlay {
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

.consult-modal {
  background: #fff;
  border-radius: 12px;
  width: 520px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2d5a27;
  margin: 0;
}

.modal-close {
  font-size: 24px;
  color: #999;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.required {
  color: #e74c3c;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #2d5a27;
}

.form-input.readonly {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.form-textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-textarea:focus {
  outline: none;
  border-color: #2d5a27;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
}

.btn-cancel {
  padding: 8px 24px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  border-color: #2d5a27;
  color: #2d5a27;
}

.btn-submit {
  padding: 8px 24px;
  border: none;
  border-radius: 6px;
  background: #2d5a27;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit:hover {
  background: #1f421b;
}

.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
