<template>
  <div class="articles-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">资讯中心</h1>
        <p class="page-desc">获取最新中医行业动态与学术资讯</p>
      </div>

      <div class="filter-section">
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
        <div class="search-box">
          <input 
            v-model="searchKeyword" 
            type="text" 
            placeholder="搜索资讯..."
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">🔍</button>
        </div>
      </div>

      <div class="articles-list">
        <div 
          v-for="article in articles" 
          :key="article.id" 
          class="article-card"
          @click="goToDetail(article.id)"
        >
          <div class="article-image">
            <img :src="article.image" :alt="article.title" />
            <span class="article-tag" :class="article.tagClass">{{ article.tag }}</span>
          </div>
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-summary">{{ article.summary }}</p>
            <div class="article-footer">
              <span class="article-author">{{ article.author }}</span>
              <span class="article-time">{{ article.time }}</span>
              <div class="article-stats">
                <span>👁️ {{ article.views }}</span>
                <span>❤️ {{ article.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          ← 上一页
        </button>
        <div class="page-numbers">
          <span 
            v-for="page in pageNumbers" 
            :key="page"
            class="page-number"
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </span>
        </div>
        <button 
          class="pagination-btn" 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          下一页 →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('all')
const searchKeyword = ref('')
const currentPage = ref(1)
const totalPages = ref(5)

const filterTabs = [
  { id: 'all', name: '全部' },
  { id: 'news', name: '新闻资讯' },
  { id: 'academic', name: '学术交流' },
  { id: 'industry', name: '行业动态' },
  { id: 'research', name: '研究成果' }
]

const articles = ref([
  {
    id: 1,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=medical%20conference%20professional%20news&image_size=landscape_4_3',
    title: '首届中澳全科医学教育与基层医疗实践网络研讨会召开在即',
    summary: '本次研讨会将汇聚国内外全科医学领域的专家学者，共同探讨全科医学教育的创新模式和基层医疗实践的发展方向...',
    tag: '新闻资讯',
    tagClass: 'tag-red',
    author: '中医在线',
    time: '2024-01-15',
    views: 435678,
    likes: 43
  },
  {
    id: 2,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20research%20laboratory&image_size=landscape_4_3',
    title: '中医药数字化转型研讨会成功举办',
    summary: '会议围绕中医药数字化转型的前沿技术、应用场景和发展趋势进行了深入交流，展示了多项创新成果...',
    tag: '学术交流',
    tagClass: 'tag-pink',
    author: '学术部',
    time: '2024-01-14',
    views: 324567,
    likes: 38
  },
  {
    id: 3,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traditional%20Chinese%20medicine%20education%20classroom&image_size=landscape_4_3',
    title: '中医药高等教育创新发展论坛圆满落幕',
    summary: '来自全国各大中医药院校的专家学者齐聚一堂，就中医药人才培养、课程改革等议题展开研讨...',
    tag: '行业动态',
    tagClass: 'tag-blue',
    author: '教育频道',
    time: '2024-01-13',
    views: 298765,
    likes: 52
  },
  {
    id: 4,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbs%20research%20scientific&image_size=landscape_4_3',
    title: '中医药防治新冠病毒研究取得新进展',
    summary: '最新研究表明，中医药在新冠病毒防治中具有显著疗效，为全球抗疫提供了中国方案...',
    tag: '研究成果',
    tagClass: 'tag-green',
    author: '科研中心',
    time: '2024-01-12',
    views: 567890,
    likes: 89
  },
  {
    id: 5,
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20conference%20event&image_size=landscape_4_3',
    title: '2024年全国中医药工作会议在北京召开',
    summary: '会议总结了过去一年中医药事业发展取得的成就，部署了新一年的重点工作任务...',
    tag: '新闻资讯',
    tagClass: 'tag-red',
    author: '中医在线',
    time: '2024-01-11',
    views: 789012,
    likes: 120
  }
])

const pageNumbers = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1)
})

const goToDetail = (id: number) => {
  router.push(`/articles/detail/${id}`)
}

const handleSearch = () => {
  console.log('搜索:', searchKeyword.value)
}
</script>

<style scoped>
.articles-page {
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

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-tabs {
  display: flex;
  gap: 8px;
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

.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
}

.search-box input {
  border: none;
  outline: none;
  padding: 8px 12px;
  font-size: 14px;
  width: 200px;
}

.search-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.articles-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.article-card {
  display: flex;
  gap: 20px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.15);
}

.article-image {
  flex-shrink: 0;
  width: 220px;
  height: 160px;
  position: relative;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.tag-red {
  background: #FFEBEE;
  color: #C62828;
}

.tag-pink {
  background: #FCE4EC;
  color: #AD1457;
}

.tag-blue {
  background: #E3F2FD;
  color: #1565C0;
}

.tag-green {
  background: #E8F5E9;
  color: #2E7D32;
}

.article-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.article-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-summary {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 auto 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.article-author {
  font-size: 13px;
  color: #999;
}

.article-time {
  font-size: 13px;
  color: #999;
}

.article-stats {
  margin-left: auto;
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #999;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
}

.pagination-btn {
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background: #4CAF50;
  color: #fff;
  border-color: #4CAF50;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number.active {
  background: #4CAF50;
  color: #fff;
}

@media (max-width: 768px) {
  .articles-list {
    grid-template-columns: 1fr;
  }
  
  .article-card {
    flex-direction: column;
  }
  
  .article-image {
    width: 100%;
    height: 180px;
  }
  
  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-tabs {
    flex-wrap: wrap;
  }
}
</style>