<template>
  <div class="consult-page">
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
          <span class="breadcrumb-item active">咨询</span>
        </div>
      </div>
    </div>

    <!-- 搜索框 -->
    <section class="search-section">
      <div class="container">
        <div class="search-box">
          <input 
            type="text" 
            v-model="keyword" 
            placeholder="搜索专家姓名..." 
            class="search-input"
            @keyup.enter="loadExperts"
          />
          <button class="search-btn" @click="loadExperts">
            搜索
          </button>
        </div>
      </div>
    </section>

    <!-- Tab 切换 -->
    <section class="tab-section">
      <div class="container">
        <div class="tab-bar">
          <div 
            class="tab-item" 
            :class="{ active: activeTab === 'experts' }"
            @click="switchToExperts"
          >找专家</div>
          <div 
            class="tab-item" 
            :class="{ active: activeTab === 'myQuestions' }"
            @click="switchToMyQuestions"
          >我的咨询</div>
        </div>
      </div>
    </section>

    <!-- 主内容区域 - 找专家 -->
    <section class="main-section" v-if="activeTab === 'experts'">
      <div class="container">
        <div class="main-content">
          <!-- 左侧科室分类 -->
          <aside class="sidebar">
            <div class="sidebar-title">科室分类</div>
            <!-- 分类搜索框 -->
            <div class="category-search">
              <input 
                type="text" 
                v-model="categoryKeyword" 
                placeholder="搜索科室..." 
                class="category-search-input"
                @keyup.enter="loadCategories"
              />
            </div>
            <div class="department-tree">
              <!-- 加载状态 -->
              <div v-if="categoriesLoading" class="loading-text">
                <span class="spinner"></span>
                <span>加载中...</span>
              </div>
              <!-- 分类列表 -->
              <template v-else>
                <div 
                  v-for="department in departments" 
                  :key="department.id"
                  class="department-item"
                >
                  <div 
                    class="department-header"
                    @click="toggleDepartment(department.id)"
                  >
                    <span class="expand-icon">{{ expandedDepartments.includes(department.id) ? '▼' : '▶' }}</span>
                    <span class="department-name">{{ department.categoryName }}</span>
                  </div>
                  <div 
                    v-if="expandedDepartments.includes(department.id)"
                    class="sub-departments"
                  >
                    <div 
                      v-for="sub in department.children" 
                      :key="sub.id"
                      class="sub-department"
                      :class="{ active: selectedCategoryId === sub.id }"
                      @click.stop="selectCategory(sub.id)"
                    >
                      {{ sub.categoryName }}
                    </div>
                  </div>
                </div>
                <div v-if="departments.length === 0" class="empty-departments">
                  <p>暂无科室分类</p>
                </div>
              </template>
            </div>
          </aside>

          <!-- 右侧专家列表 -->
          <main class="content-area">
            <!-- 加载状态 -->
            <div v-if="expertsLoading" class="loading-center">
              <span class="spinner"></span>
              <span>加载专家列表中...</span>
            </div>
            <!-- 专家列表 -->
            <template v-else>
              <div class="doctors-grid">
                <div 
                  v-for="doctor in experts" 
                  :key="doctor.id" 
                  class="doctor-card"
                  @click="goToDetail(doctor.id)"
                >
                  <div class="doctor-avatar-wrapper">
                    <img :src="doctor.avatarUrl" :alt="doctor.realName" class="doctor-avatar" />
                    <span class="doctor-status online">在线</span>
                  </div>
                  <h3 class="doctor-name">{{ doctor.realName }}</h3>
                  <p class="doctor-title">{{ doctor.title }}</p>
                  <p class="doctor-organization">{{ doctor.organization }}</p>
                  <p class="doctor-specialty">{{ doctor.specialty }}</p>
                </div>
              </div>
              <div v-if="experts.length === 0" class="empty-state">
                <p>暂无专家</p>
              </div>

              <!-- 分页组件 -->
              <section class="pagination-section" v-if="total > pageSize">
                <div class="pagination">
                  <button 
                    class="page-btn" 
                    :disabled="currentPage === 1"
                    @click="goToPage(currentPage - 1)"
                  >上一页</button>
                  <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
                  <button 
                    class="page-btn" 
                    :disabled="currentPage === totalPages"
                    @click="goToPage(currentPage + 1)"
                  >下一页</button>
                </div>
              </section>
            </template>
          </main>
        </div>
      </div>
    </section>

    <!-- 主内容区域 - 我的咨询 -->
    <section class="main-section" v-if="activeTab === 'myQuestions'">
      <div class="container">
        <div class="questions-table-wrapper">
          <table class="questions-table" v-if="questions.length > 0">
            <thead>
              <tr>
                <th style="width: 60px">序号</th>
                <th>咨询标题</th>
                <th style="width: 100px">状态</th>
                <th style="width: 160px">提交时间</th>
                <th style="width: 100px">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(q, index) in questions" 
                :key="q.id"
                class="question-row"
              >
                <td>{{ (questionPage - 1) * questionSize + index + 1 }}</td>
                <td class="question-title-cell">
                  <span class="question-title" @click="goToQa(q)">{{ q.title }}</span>
                  <p class="question-desc">{{ truncateText(q.content, 50) }}</p>
                </td>
                <td>
                  <span class="status-badge" :class="'status-' + (typeof q.status === 'string' ? q.status.toLowerCase() : 'unknown')">
                    {{ statusLabelMap[q.status as string] || (typeof q.status === 'string' ? q.status : '未知') }}
                  </span>
                </td>
                <td class="question-time">-</td>
                <td>
                  <button class="view-btn" @click="goToQa(q)">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-state">
            <p>暂无咨询记录</p>
          </div>

          <!-- 分页 -->
          <section class="pagination-section" v-if="questionTotal > questionSize">
            <div class="pagination">
              <button 
                class="page-btn" 
                :disabled="questionPage === 1"
                @click="goToQuestionPage(questionPage - 1)"
              >上一页</button>
              <span class="page-info">第 {{ questionPage }} / {{ questionTotalPages }} 页</span>
              <button 
                class="page-btn" 
                :disabled="questionPage === questionTotalPages"
                @click="goToQuestionPage(questionPage + 1)"
              >下一页</button>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { expertsApi, type AppExpertCategoryResponse, type AppExpertResponse, type AppQaQuestionResponse } from '~/utils/api/experts'

const router = useRouter()
const route = useRoute()

const activeTab = ref<'experts' | 'myQuestions'>('experts')
const expandedDepartments = ref<number[]>([])
const selectedCategoryId = ref<number | null>(null)
const keyword = ref('')
const categoryKeyword = ref('')  // 分类搜索关键词
const categories = ref<AppExpertCategoryResponse[]>([])
const experts = ref<AppExpertResponse[]>([])
const currentPage = ref(1)
const pageSize = ref(6)
const total = ref(0)
const categoriesLoading = ref(false)
const expertsLoading = ref(false)
const categoriesError = ref('')

// 我的咨询相关状态
const questions = ref<AppQaQuestionResponse[]>([])
const questionPage = ref(1)
const questionSize = ref(10)
const questionTotal = ref(0)

const statusLabelMap: Record<string, string> = {
  PENDING: '待回复',
  ANSWERED: '已回复',
  CLOSED: '已关闭'
}

const questionTotalPages = computed(() => Math.ceil(questionTotal.value / questionSize.value))

const departments = computed(() => {
  const parentCategories = categories.value.filter(cat => cat.parentId === 0)
  return parentCategories.map(parent => ({
    ...parent,
    children: categories.value.filter(cat => cat.parentId === parent.id)
  }))
})

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

const toggleDepartment = (id: number) => {
  const index = expandedDepartments.value.indexOf(id)
  if (index > -1) {
    expandedDepartments.value.splice(index, 1)
  } else {
    expandedDepartments.value.push(id)
  }
}

const selectCategory = (id: number) => {
  selectedCategoryId.value = selectedCategoryId.value === id ? null : id
  currentPage.value = 1
  loadExperts()
}

const goToHome = () => {
  router.push('/')
}

const goToDetail = (id: number) => {
  router.push(`/consult/${id}`)
}

const loadCategories = async () => {
  categoriesLoading.value = true
  categoriesError.value = ''
  
  try {
    const response = await expertsApi.getExpertCategories({
      page: 1,
      size: 100,
      keyword: categoryKeyword.value || undefined
    })
    if (response.success) {
      categories.value = response.data.records
      // 如果API返回的数据为空，使用模拟数据
      if (categories.value.length === 0) {
        loadMockCategories()
      }
    } else {
      console.warn('获取专家分类失败:', response.message)
      loadMockCategories()
    }
  } catch (error: any) {
    console.error('Failed to load expert categories:', error)
    loadMockCategories()
  } finally {
    categoriesLoading.value = false
  }
}

// 加载模拟分类数据
const loadMockCategories = () => {
  categories.value = [
    { id: 1, parentId: 0, categoryName: '内科', sortOrder: 1 },
    { id: 2, parentId: 0, categoryName: '外科', sortOrder: 2 },
    { id: 3, parentId: 0, categoryName: '妇产科', sortOrder: 3 },
    { id: 4, parentId: 0, categoryName: '儿科', sortOrder: 4 },
    { id: 5, parentId: 0, categoryName: '皮肤科', sortOrder: 5 },
    { id: 11, parentId: 1, categoryName: '呼吸内科', sortOrder: 1 },
    { id: 12, parentId: 1, categoryName: '消化内科', sortOrder: 2 },
    { id: 13, parentId: 1, categoryName: '心血管内科', sortOrder: 3 },
    { id: 21, parentId: 2, categoryName: '普外科', sortOrder: 1 },
    { id: 22, parentId: 2, categoryName: '骨科', sortOrder: 2 },
    { id: 23, parentId: 2, categoryName: '神经外科', sortOrder: 3 },
    { id: 31, parentId: 3, categoryName: '妇科', sortOrder: 1 },
    { id: 32, parentId: 3, categoryName: '产科', sortOrder: 2 }
  ]
  
  // 默认展开第一个父分类
  const firstParent = categories.value.find(cat => cat.parentId === 0)
  if (firstParent) {
    expandedDepartments.value = [firstParent.id]
  }
}

const loadExperts = async () => {
  expertsLoading.value = true
  
  try {
    const response = await expertsApi.getExperts({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
      categoryId: selectedCategoryId.value || undefined
    })
    if (response.success) {
      experts.value = response.data.records
      total.value = response.data.total
      currentPage.value = response.data.page
      pageSize.value = response.data.size
      
      // 如果专家列表为空且没有搜索条件，使用模拟数据
      if (experts.value.length === 0 && !keyword.value && !selectedCategoryId.value) {
        loadMockExperts()
      }
    } else {
      console.warn('获取专家列表失败:', response.message)
      loadMockExperts()
    }
  } catch (error: any) {
    console.error('Failed to load experts:', error)
    loadMockExperts()
  } finally {
    expertsLoading.value = false
  }
}

// 加载模拟专家数据
const loadMockExperts = () => {
  experts.value = [
    {
      id: 1,
      realName: '王晓明',
      gender: 'MALE',
      birthDate: '1968-05-15',
      mobile: '13800138001',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      coverUrl: '',
      title: '主任医师',
      organization: '北京中医药大学附属医院',
      specialty: '内科',
      introduction: '从事中医内科临床工作30余年，擅长治疗呼吸系统疾病、消化系统疾病等。',
      consultationNotice: '每周一、三、五上午坐诊',
      sortOrder: 1,
      categoryIds: [1, 11],
      experiences: [
        { id: 1, expertId: 1, experienceType: 'EDUCATION', title: '北京中医药大学', description: '中医专业博士', startDate: '1985-09-01', endDate: '1992-06-30', sortOrder: 1 },
        { id: 2, expertId: 1, experienceType: 'WORK', title: '北京中医药大学附属医院', description: '主任医师', startDate: '1992-07-01', endDate: '', sortOrder: 2 }
      ]
    },
    {
      id: 2,
      realName: '李芳华',
      gender: 'FEMALE',
      birthDate: '1972-08-20',
      mobile: '13800138002',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      coverUrl: '',
      title: '副主任医师',
      organization: '上海中医药大学附属龙华医院',
      specialty: '妇产科',
      introduction: '擅长妇科疾病的中医治疗，尤其在月经不调、痛经等方面有丰富经验。',
      consultationNotice: '每周二、四下午坐诊',
      sortOrder: 2,
      categoryIds: [3, 31],
      experiences: [
        { id: 3, expertId: 2, experienceType: 'EDUCATION', title: '上海中医药大学', description: '中医妇科专业硕士', startDate: '1990-09-01', endDate: '1995-06-30', sortOrder: 1 },
        { id: 4, expertId: 2, experienceType: 'WORK', title: '上海中医药大学附属龙华医院', description: '副主任医师', startDate: '1995-07-01', endDate: '', sortOrder: 2 }
      ]
    },
    {
      id: 3,
      realName: '张建国',
      gender: 'MALE',
      birthDate: '1965-12-10',
      mobile: '13800138003',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      coverUrl: '',
      title: '主任医师',
      organization: '广东省中医院',
      specialty: '骨科',
      introduction: '从事骨伤科临床工作25年，擅长中医手法治疗骨折、脱位等疾病。',
      consultationNotice: '每周一至周五上午坐诊',
      sortOrder: 3,
      categoryIds: [2, 22],
      experiences: [
        { id: 5, expertId: 3, experienceType: 'EDUCATION', title: '广州中医药大学', description: '中医骨伤专业博士', startDate: '1983-09-01', endDate: '1990-06-30', sortOrder: 1 },
        { id: 6, expertId: 3, experienceType: 'WORK', title: '广东省中医院', description: '骨科主任医师', startDate: '1990-07-01', endDate: '', sortOrder: 2 }
      ]
    },
    {
      id: 4,
      realName: '陈美玲',
      gender: 'FEMALE',
      birthDate: '1975-03-08',
      mobile: '13800138004',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      coverUrl: '',
      title: '副主任医师',
      organization: '浙江省中医院',
      specialty: '儿科',
      introduction: '擅长儿童常见病的中医调理，在小儿脾胃病、呼吸道疾病方面有独到见解。',
      consultationNotice: '每周三、六上午坐诊',
      sortOrder: 4,
      categoryIds: [4],
      experiences: [
        { id: 7, expertId: 4, experienceType: 'EDUCATION', title: '浙江中医药大学', description: '中医儿科专业硕士', startDate: '1993-09-01', endDate: '1998-06-30', sortOrder: 1 },
        { id: 8, expertId: 4, experienceType: 'WORK', title: '浙江省中医院', description: '儿科副主任医师', startDate: '1998-07-01', endDate: '', sortOrder: 2 }
      ]
    },
    {
      id: 5,
      realName: '刘德远',
      gender: 'MALE',
      birthDate: '1962-07-25',
      mobile: '13800138005',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      coverUrl: '',
      title: '主任医师',
      organization: '江苏省中医院',
      specialty: '皮肤科',
      introduction: '从事皮肤科临床工作30年，擅长中西医结合治疗各种皮肤病。',
      consultationNotice: '每周二、四、六下午坐诊',
      sortOrder: 5,
      categoryIds: [5],
      experiences: [
        { id: 9, expertId: 5, experienceType: 'EDUCATION', title: '南京中医药大学', description: '中医皮肤科专业博士', startDate: '1980-09-01', endDate: '1987-06-30', sortOrder: 1 },
        { id: 10, expertId: 5, experienceType: 'WORK', title: '江苏省中医院', description: '皮肤科主任医师', startDate: '1987-07-01', endDate: '', sortOrder: 2 }
      ]
    },
    {
      id: 6,
      realName: '赵明华',
      gender: 'MALE',
      birthDate: '1970-11-15',
      mobile: '13800138006',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      coverUrl: '',
      title: '主任医师',
      organization: '四川省中医院',
      specialty: '心血管内科',
      introduction: '擅长心血管疾病的中医治疗，在冠心病、高血压等方面有深入研究。',
      consultationNotice: '每周一、三上午坐诊',
      sortOrder: 6,
      categoryIds: [1, 13],
      experiences: [
        { id: 11, expertId: 6, experienceType: 'EDUCATION', title: '成都中医药大学', description: '中医心血管专业博士', startDate: '1988-09-01', endDate: '1995-06-30', sortOrder: 1 },
        { id: 12, expertId: 6, experienceType: 'WORK', title: '四川省中医院', description: '心血管内科主任医师', startDate: '1995-07-01', endDate: '', sortOrder: 2 }
      ]
    }
  ]
  total.value = 100
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadExperts()
}

// Tab 切换
const switchToExperts = () => {
  activeTab.value = 'experts'
}

const switchToMyQuestions = () => {
  activeTab.value = 'myQuestions'
  questionPage.value = 1  // 重置到第一页
  loadMyQuestions()       // 每次切换都重新加载，确保数据最新
}

// 加载我的咨询列表
const loadMyQuestions = async () => {
  try {
    const response = await expertsApi.getMyQuestions({
      page: questionPage.value,
      size: questionSize.value
    })
    if (response.success) {
      // 检查数据是否存在
      if (response.data && response.data.records) {
        questions.value = response.data.records
        questionTotal.value = response.data.total
        questionPage.value = response.data.page
        questionSize.value = response.data.size
      } else {
        questions.value = []
        questionTotal.value = 0
        console.warn('咨询列表数据为空:', response.data)
      }
    } else {
      console.error('获取咨询列表失败:', response.message)
      questions.value = []
      questionTotal.value = 0
    }
  } catch (error) {
    console.error('Failed to load my questions:', error)
    questions.value = []
    questionTotal.value = 0
  }
}

const goToQuestionPage = (page: number) => {
  if (page < 1 || page > questionTotalPages.value) return
  questionPage.value = page
  loadMyQuestions()
}

const goToQa = (q: AppQaQuestionResponse) => {
  router.push(`/consult/detail/${q.id}`)
}

const truncateText = (text: string, maxLen: number): string => {
  if (!text) return ''
  return text.length > maxLen ? text.substring(0, maxLen) + '...' : text
}

onMounted(() => {
  loadCategories()
  loadExperts()
  
  // 检查URL参数，如果有tab=myQuestions，自动切换到我的咨询页面
  if (route.query.tab === 'myQuestions') {
    switchToMyQuestions()
  }
})
</script>

<style scoped>
.consult-page {
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

.search-box {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: 8px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #2d5a27;
}

.search-btn {
  padding: 12px 24px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #1f421b;
}

/* Tab 切换 */
.tab-section {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.tab-bar {
  display: flex;
  gap: 0;
}

.tab-item {
  padding: 14px 32px;
  font-size: 15px;
  color: #666;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
  font-weight: 500;
}

.tab-item:hover {
  color: #2d5a27;
}

.tab-item.active {
  color: #2d5a27;
  border-bottom-color: #2d5a27;
}

/* 咨询列表表格 */
.questions-table-wrapper {
  background: #fff;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

.questions-table {
  width: 100%;
  border-collapse: collapse;
}

.questions-table thead {
  background: #f8fbf8;
}

.questions-table th {
  padding: 14px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
}

.questions-table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}

.question-row:hover {
  background: #fafafa;
}

.question-title-cell {
  max-width: 300px;
}

.question-title {
  color: #2d5a27;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s;
}

.question-title:hover {
  color: #1f421b;
  text-decoration: underline;
}

.question-desc {
  margin: 4px 0 0;
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.question-time {
  font-size: 13px;
  color: #999;
}

/* 状态标签 */
.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
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

/* 查看按钮 */
.view-btn {
  padding: 6px 16px;
  background: transparent;
  border: 1px solid #2d5a27;
  border-radius: 4px;
  color: #2d5a27;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn:hover {
  background: #2d5a27;
  color: #fff;
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
  width: 220px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

/* 分类搜索框 */
.category-search {
  margin-bottom: 12px;
}

.category-search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.category-search-input:focus {
  border-color: #2d5a27;
}

.category-search-input::placeholder {
  color: #ccc;
}

.department-tree {
  padding: 0;
}

.empty-departments {
  padding: 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.department-item {
  margin-bottom: 4px;
}

.department-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
}

.department-header:hover {
  background: #f8fbf8;
}

.expand-icon {
  font-size: 10px;
  color: #999;
}

.department-name {
  font-size: 14px;
  color: #333;
}

.sub-departments {
  padding-left: 24px;
}

.sub-department {
  padding: 8px 12px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.sub-department:hover {
  background: #f0f8f0;
  color: #2d5a27;
}

.sub-department.active {
  background: #2d5a27;
  color: #fff;
}

/* 右侧内容区域 */
.content-area {
  flex: 1;
}

.doctors-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.doctor-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.doctor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.doctor-avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 12px;
}

.doctor-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.doctor-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
}

.doctor-status.online {
  background: #2d5a27;
  color: #fff;
}

.doctor-status.busy {
  background: #FF9800;
  color: #fff;
}

.doctor-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
}

.doctor-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 4px 0;
}

.doctor-organization {
  font-size: 12px;
  color: #999;
  margin: 0 0 4px 0;
}

.doctor-specialty {
  display: inline-block;
  padding: 4px 12px;
  background: #E8F5E9;
  color: #2d5a27;
  font-size: 12px;
  border-radius: 4px;
  margin-top: 8px;
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
  
  .doctors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .doctors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .banner-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .doctors-grid {
    grid-template-columns: 1fr;
  }
}
</style>
