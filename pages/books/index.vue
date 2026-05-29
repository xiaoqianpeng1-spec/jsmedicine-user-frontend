<template>
  <div class="books-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">数字图书馆</h1>
        <p class="page-desc">海量中医经典著作，随时随地阅读学习</p>
      </div>

      <div class="filter-bar">
        <div class="filter-tabs">
          <button 
            v-for="tab in filterTabs" 
            :key="tab.id"
            class="filter-tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <div class="books-grid">
        <div 
          v-for="book in books" 
          :key="book.id" 
          class="book-card"
          @click="goToDetail(book.id)"
        >
          <div class="book-cover">
            <img :src="book.cover" :alt="book.title" />
            <div class="book-badge" v-if="book.isHot">热门</div>
          </div>
          <div class="book-info">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>
            <p class="book-desc">{{ book.desc }}</p>
            <div class="book-meta">
              <span class="book-pages">{{ book.pages }} 页</span>
              <span class="book-reads">📖 {{ book.reads }} 人在读</span>
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

const activeTab = ref('all')

const filterTabs = [
  { id: 'all', name: '全部' },
  { id: 'classic', name: '经典著作' },
  { id: 'modern', name: '现代研究' },
  { id: 'clinical', name: '临床实践' }
]

const books = ref([
  {
    id: 1,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20traditional%20medicine%20book%20cover%20ancient%20style&image_size=square',
    title: '黄帝内经',
    author: '佚名',
    desc: '中医经典著作，奠定中医理论基础',
    pages: 580,
    reads: 12580,
    isHot: true
  },
  {
    id: 2,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20herbs%20book%20cover&image_size=square',
    title: '本草纲目',
    author: '李时珍',
    desc: '中药学巨著，收录1892种药物',
    pages: 1200,
    reads: 8960,
    isHot: true
  },
  {
    id: 3,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20prescription%20book%20cover&image_size=square',
    title: '伤寒论',
    author: '张仲景',
    desc: '中医临床经典，辨证论治典范',
    pages: 320,
    reads: 6540,
    isHot: false
  },
  {
    id: 4,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20diagnosis%20book%20cover&image_size=square',
    title: '中医诊断学',
    author: '邓铁涛',
    desc: '现代中医诊断学教材',
    pages: 450,
    reads: 10320,
    isHot: false
  },
  {
    id: 5,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20acupuncture%20book%20cover&image_size=square',
    title: '针灸大成',
    author: '杨继洲',
    desc: '针灸学经典著作',
    pages: 680,
    reads: 7890,
    isHot: false
  },
  {
    id: 6,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20modern%20book%20cover&image_size=square',
    title: '中医内科学',
    author: '张伯礼',
    desc: '现代中医内科临床指南',
    pages: 850,
    reads: 5670,
    isHot: false
  }
])

const goToDetail = (id: number) => {
  router.push(`/knowledge/detail/${id}`)
}
</script>

<style scoped>
.books-page {
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

.filter-bar {
  margin-bottom: 30px;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e0e0e0;
}

.filter-tab.active {
  background: #4CAF50;
  color: #fff;
  border-color: #4CAF50;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.book-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.15);
}

.book-cover {
  position: relative;
  height: 220px;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #FF5722;
  padding: 4px 12px;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
}

.book-info {
  padding: 20px;
}

.book-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.book-author {
  font-size: 14px;
  color: #4CAF50;
  margin: 0 0 8px 0;
}

.book-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.book-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.book-pages,
.book-reads {
  font-size: 12px;
  color: #999;
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
}
</style>