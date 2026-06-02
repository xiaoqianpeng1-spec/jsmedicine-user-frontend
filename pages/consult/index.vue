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
                  <span class="department-name">{{ department.name }}</span>
                </div>
                <div 
                  v-if="expandedDepartments.includes(department.id)"
                  class="sub-departments"
                >
                  <div 
                    v-for="sub in department.subs" 
                    :key="sub.id"
                    class="sub-department"
                    :class="{ active: selectedSub === sub.id }"
                    @click.stop="selectSubDepartment(sub.id)"
                  >
                    {{ sub.name }}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- 右侧专家列表 -->
          <main class="content-area">
            <div class="doctors-grid">
              <div 
                v-for="doctor in doctors" 
                :key="doctor.id" 
                class="doctor-card"
                @click="goToDetail(doctor.id)"
              >
                <div class="doctor-avatar-wrapper">
                  <img :src="doctor.avatar" :alt="doctor.name" class="doctor-avatar" />
                  <span class="doctor-status" :class="doctor.statusClass">{{ doctor.status }}</span>
                </div>
                <h3 class="doctor-name">{{ doctor.name }}</h3>
                <p class="doctor-title">{{ doctor.title }}</p>
                <span class="doctor-department-tag">{{ doctor.department }}</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const expandedDepartments = ref(['internal'])
const selectedSub = ref('cardio')

const departments = ref([
  {
    id: 'internal',
    name: '中医内科',
    subs: [
      { id: 'cardio', name: '心血管' },
      { id: 'brain', name: '脑病' },
      { id: 'geriatric', name: '老年病' },
      { id: 'lung', name: '肺病' },
      { id: 'spleen', name: '脾胃病' },
      { id: 'kidney', name: '肾病' },
      { id: 'tumor', name: '肿瘤' }
    ]
  },
  {
    id: 'surgery',
    name: '中医外科',
    subs: []
  },
  {
    id: 'orthopedics',
    name: '中医骨伤科',
    subs: []
  },
  {
    id: 'gynecology',
    name: '中医妇科',
    subs: []
  },
  {
    id: 'pediatrics',
    name: '中医儿科',
    subs: []
  },
  {
    id: 'ent',
    name: '中医五官科',
    subs: []
  },
  {
    id: 'five-sense',
    name: '中医五官科学',
    subs: []
  },
  {
    id: 'tuina',
    name: '中医推拿',
    subs: []
  }
])

const doctors = ref([
  {
    id: 1,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20female%20doctor%20portrait%20professional&image_size=square',
    name: '林轶蓉',
    title: '主任中医师',
    department: '中医心血管',
    status: '在线',
    statusClass: 'online'
  },
  {
    id: 2,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20male%20doctor%20portrait%20professional&image_size=square',
    name: '刘健',
    title: '主任中医师',
    department: '中医心血管',
    status: '在线',
    statusClass: 'online'
  },
  {
    id: 3,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20male%20doctor%20middle%20age%20portrait&image_size=square',
    name: '郑晓丹',
    title: '副主任中医师',
    department: '中医心血管',
    status: '在线',
    statusClass: 'online'
  },
  {
    id: 4,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20male%20doctor%20portrait&image_size=square',
    name: '王庆春',
    title: '副主任中医师',
    department: '中医心血管',
    status: '在线',
    statusClass: 'online'
  },
  {
    id: 5,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20female%20doctor%20portrait%20middle%20age&image_size=square',
    name: '刘敏',
    title: '主任中医师',
    department: '中医心血管',
    status: '在线',
    statusClass: 'online'
  },
  {
    id: 6,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20male%20doctor%20senior%20portrait&image_size=square',
    name: '邹冲',
    title: '主任中医师',
    department: '中医心血管',
    status: '在线',
    statusClass: 'online'
  }
])

const toggleDepartment = (id: string) => {
  const index = expandedDepartments.value.indexOf(id)
  if (index > -1) {
    expandedDepartments.value.splice(index, 1)
  } else {
    expandedDepartments.value.push(id)
  }
}

const selectSubDepartment = (id: string) => {
  selectedSub.value = id
}

const goToHome = () => {
  router.push('/')
}

const goToDetail = (id: number) => {
  router.push(`/consult/${id}`)
}
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
  margin: 0 0 8px 0;
}

.doctor-department-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #E8F5E9;
  color: #2d5a27;
  font-size: 12px;
  border-radius: 4px;
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