<template>
  <div class="consult-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">专家咨询</h1>
        <p class="page-desc">专业问题咨询，名师在线解答</p>
      </div>

      <div class="consult-types">
        <div 
          v-for="type in consultTypes" 
          :key="type.id" 
          class="consult-type-card"
          @click="selectedType = type.id"
          :class="{ active: selectedType === type.id }"
        >
          <span class="type-icon">{{ type.icon }}</span>
          <span class="type-name">{{ type.name }}</span>
        </div>
      </div>

      <div class="doctors-list">
        <div 
          v-for="doctor in doctors" 
          :key="doctor.id" 
          class="doctor-card"
          @click="goToConsult(doctor.id)"
        >
          <div class="doctor-avatar">
            <img :src="doctor.avatar" :alt="doctor.name" />
            <span class="doctor-status" :class="doctor.statusClass">{{ doctor.status }}</span>
          </div>
          <div class="doctor-info">
            <div class="doctor-header">
              <h3 class="doctor-name">{{ doctor.name }}</h3>
              <span class="doctor-title">{{ doctor.title }}</span>
            </div>
            <p class="doctor-department">{{ doctor.department }}</p>
            <p class="doctor-specialty">{{ doctor.specialty }}</p>
            <div class="doctor-stats">
              <span class="stat-item">⭐ {{ doctor.rating }}</span>
              <span class="stat-item">👥 {{ doctor.consultCount }} 次咨询</span>
              <span class="stat-item">⏱️ {{ doctor.responseTime }}分钟</span>
            </div>
          </div>
          <div class="consult-btn">
            <span>咨询</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedType = ref('all')

const consultTypes = [
  { id: 'all', icon: '🏥', name: '全部' },
  { id: 'internal', icon: '🩺', name: '内科' },
  { id: 'gynecology', icon: '🌸', name: '妇科' },
  { id: 'pediatrics', icon: '👶', name: '儿科' },
  { id: 'acupuncture', icon: '💉', name: '针灸' },
  { id: 'massage', icon: '💆', name: '推拿' }
]

const doctors = ref([
  {
    id: 1,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20doctor%20portrait%20professional&image_size=square',
    name: '张明华',
    title: '主任医师',
    department: '中医内科',
    specialty: '擅长治疗消化系统疾病、慢性胃炎、胃溃疡等',
    rating: 4.9,
    consultCount: 2580,
    responseTime: 15,
    status: '在线',
    statusClass: 'online'
  },
  {
    id: 2,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20female%20doctor%20portrait&image_size=square',
    name: '李秀珍',
    title: '副主任医师',
    department: '中医妇科',
    specialty: '擅长治疗月经不调、痛经、妇科炎症等',
    rating: 4.8,
    consultCount: 1890,
    responseTime: 20,
    status: '在线',
    statusClass: 'online'
  },
  {
    id: 3,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20male%20doctor%20portrait&image_size=square',
    name: '王建国',
    title: '主治医师',
    department: '针灸科',
    specialty: '擅长治疗颈椎病、腰椎间盘突出、面瘫等',
    rating: 4.7,
    consultCount: 1250,
    responseTime: 25,
    status: '忙碌',
    statusClass: 'busy'
  },
  {
    id: 4,
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20senior%20doctor%20portrait&image_size=square',
    name: '陈玉华',
    title: '主任医师',
    department: '中医儿科',
    specialty: '擅长治疗小儿感冒、咳嗽、消化不良等',
    rating: 4.9,
    consultCount: 3120,
    responseTime: 12,
    status: '在线',
    statusClass: 'online'
  }
])

const goToConsult = (id: number) => {
  router.push(`/consult/${id}`)
}
</script>

<style scoped>
.consult-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 0;
}

.container {
  max-width: 1000px;
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

.consult-types {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.consult-type-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #fff;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e0e0e0;
}

.consult-type-card.active {
  background: #4CAF50;
  border-color: #4CAF50;
}

.consult-type-card.active .type-name {
  color: #fff;
}

.type-icon {
  font-size: 20px;
}

.type-name {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.doctors-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.doctor-card {
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

.doctor-card:hover {
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.doctor-avatar {
  position: relative;
  flex-shrink: 0;
}

.doctor-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.doctor-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
}

.doctor-status.online {
  background: #4CAF50;
  color: #fff;
}

.doctor-status.busy {
  background: #FF9800;
  color: #fff;
}

.doctor-info {
  flex: 1;
  min-width: 0;
}

.doctor-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.doctor-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.doctor-title {
  padding: 4px 12px;
  background: #E8F5E9;
  color: #4CAF50;
  font-size: 12px;
  border-radius: 4px;
}

.doctor-department {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}

.doctor-specialty {
  font-size: 13px;
  color: #999;
  line-height: 1.5;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.doctor-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  font-size: 13px;
  color: #999;
}

.consult-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #4CAF50 0%, #2D5A27 100%);
  color: #fff;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.consult-btn:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .doctor-card {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .consult-btn {
    align-self: flex-end;
  }
}
</style>