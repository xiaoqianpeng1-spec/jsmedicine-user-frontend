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

    <!-- 主内容区域 -->
    <section class="main-section">
      <div class="container">
        <div class="main-content">
          <!-- 左侧科室分类 -->
          <aside class="sidebar">
            <div class="sidebar-title">科室分类</div>
            <div class="department-tree">
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
            </div>
          </aside>

          <!-- 右侧专家列表 -->
          <main class="content-area">
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
                >
                  上一页
                </button>
                <span class="page-info">
                  第 {{ currentPage }} / {{ totalPages }} 页
                </span>
                <button 
                  class="page-btn" 
                  :disabled="currentPage === totalPages"
                  @click="goToPage(currentPage + 1)"
                >
                  下一页
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { expertsApi, type AppExpertCategoryResponse, type AppExpertResponse } from '~/utils/api/experts'

const router = useRouter()

const expandedDepartments = ref<number[]>([])
const selectedCategoryId = ref<number | null>(null)
const keyword = ref('')
const categories = ref<AppExpertCategoryResponse[]>([])
const experts = ref<AppExpertResponse[]>([])
const currentPage = ref(1)
const pageSize = ref(6)
const total = ref(0)

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
  try {
    const response = await expertsApi.getExpertCategories({
      page: 1,
      size: 100
    })
    if (response.success) {
      categories.value = response.data.records
      if (categories.value.length > 0 && categories.value[0].parentId === 0) {
        expandedDepartments.value = [categories.value[0].id]
      }
    }
  } catch (error) {
    console.error('Failed to load expert categories:', error)
  }
}

const loadExperts = async () => {
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
    }
  } catch (error) {
    console.error('Failed to load experts:', error)
  }
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadExperts()
}

onMounted(() => {
  loadCategories()
  loadExperts()
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
  padding: 0 0 12px 0;
  border-bottom: 2px solid #2d5a27;
  margin-bottom: 12px;
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
