<template>
  <div class="topics-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">专题中心</h1>
        <p class="page-desc">精选专题，深入学习中医知识体系</p>
      </div>

      <div class="topics-grid">
        <div 
          v-for="topic in topics" 
          :key="topic.id" 
          class="topic-card"
          @click="goToTopic(topic.id)"
        >
          <div class="topic-image">
            <img :src="topic.image" :alt="topic.title" />
            <div class="topic-overlay">
              <span class="topic-count">{{ topic.courseCount }} 节课</span>
            </div>
          </div>
          <div class="topic-info">
            <span class="topic-category">{{ topic.category }}</span>
            <h3 class="topic-title">{{ topic.title }}</h3>
            <p class="topic-desc">{{ topic.desc }}</p>
            <div class="topic-footer">
              <span class="topic-students">👥 {{ topic.students }} 人学习</span>
              <span class="topic-rating">⭐ {{ topic.rating }}</span>
            </div>
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

const topics = ref([
  {
    id: 1,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20traditional%20medicine%20herbs%20green%20theme&image_size=landscape_4_3',
    title: '中医基础理论精讲',
    desc: '系统学习中医基础理论，掌握阴阳五行、气血津液等核心概念',
    category: '基础入门',
    courseCount: 24,
    students: 12580,
    rating: 4.9
  },
  {
    id: 2,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20acupuncture%20traditional%20medicine&image_size=landscape_4_3',
    title: '针灸技法与临床应用',
    desc: '深入学习针灸理论与实操技巧，提升临床诊疗能力',
    category: '技能提升',
    courseCount: 32,
    students: 8960,
    rating: 4.8
  },
  {
    id: 3,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbal%20medicine%20preparation&image_size=landscape_4_3',
    title: '中药方剂学专题',
    desc: '掌握经典方剂配伍规律，提升方剂应用水平',
    category: '专业进阶',
    courseCount: 48,
    students: 6540,
    rating: 4.9
  },
  {
    id: 4,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20diagnosis%20pulse%20diagnosis&image_size=landscape_4_3',
    title: '中医诊断学精要',
    desc: '系统学习望闻问切四诊方法，提高辨证论治能力',
    category: '核心课程',
    courseCount: 36,
    students: 10320,
    rating: 4.8
  },
  {
    id: 5,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20gynecology%20healthcare&image_size=landscape_4_3',
    title: '中医妇科疾病诊治',
    desc: '深入学习妇科常见病的中医诊疗方法与调理方案',
    category: '专科领域',
    courseCount: 28,
    students: 7890,
    rating: 4.7
  },
  {
    id: 6,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20pediatrics%20traditional&image_size=landscape_4_3',
    title: '中医儿科特色疗法',
    desc: '掌握小儿常见病的中医治疗与保健方法',
    category: '专科领域',
    courseCount: 22,
    students: 5670,
    rating: 4.8
  }
])

const goToTopic = (id: number) => {
  router.push(`/topics/${id}`)
}
</script>

<style scoped>
.topics-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
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

.topics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.topic-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.15);
}

.topic-image {
  position: relative;
  height: 180px;
}

.topic-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topic-overlay {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  border-radius: 20px;
}

.topic-count {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
}

.topic-info {
  padding: 20px;
}

.topic-category {
  display: inline-block;
  padding: 4px 12px;
  background: #E8F5E9;
  color: #4CAF50;
  font-size: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.topic-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.topic-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.topic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topic-students,
.topic-rating {
  font-size: 13px;
  color: #999;
}

@media (max-width: 768px) {
  .topics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .topics-grid {
    grid-template-columns: 1fr;
  }
}
</style>