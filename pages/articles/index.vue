<template>
  <div class="articles-page">
    <!-- 顶部横幅 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="banner-title">资讯中心</h1>
        <p class="banner-desc">获取最新中医行业动态与学术资讯</p>
      </div>
    </section>

    <!-- 筛选区域 -->
    <section class="filter-section">
      <div class="container">
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
          <button class="search-btn" @click="handleSearch">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- 资讯列表 -->
    <section class="articles-section">
      <div class="container">
        <div class="articles-list">
          <div 
            v-for="article in articles" 
            :key="article.id" 
            class="article-card"
            @click="goToDetail(article.id)"
          >
            <div class="article-image">
              <img :src="article.image" :alt="article.title" />
            </div>
            <div class="article-content">
              <span class="article-tag" :class="article.tagClass">{{ article.tag }}</span>
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-summary">{{ article.summary }}</p>
              <div class="article-footer">
                <span class="article-author">{{ article.author }}</span>
                <span class="article-time">{{ article.time }}</span>
                <span class="article-views">👁️ {{ article.views }}</span>
                <span class="article-comments">💬 {{ article.comments }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
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
    </section>
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
    comments: 43
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
    comments: 38
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
    comments: 52
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
    comments: 89
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
    comments: 120
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
/* 全局样式 */
.articles-page {
  font-family: "Microsoft YaHei", sans-serif;
  min-height: 100vh;
  background: #fff;
}

/* 容器 */
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

/* 筛选区域 */
.filter-section {
  background: #f8fbf8;
  padding: 20px 0;
}

.filter-section .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-tabs {
  display: flex;
  gap: 12px;
}

.filter-tab {
  padding: 10px 24px;
  border: none;
  border-radius: 25px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e0e0e0;
}

.filter-tab.active {
  background: #2d5a27;
  color: #fff;
  border-color: #2d5a27;
}

.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 25px;
  padding: 6px 16px;
  border: 1px solid #e0e0e0;
}

.search-box input {
  border: none;
  outline: none;
  padding: 8px 12px;
  font-size: 14px;
  width: 200px;
  background: transparent;
}

.search-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
}

.search-btn:hover {
  color: #2d5a27;
}

/* 资讯列表区域 */
.articles-section {
  padding: 50px 0;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-card {
  display: flex;
  gap: 24px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.article-card:hover {
  box-shadow: 0 8px 24px rgba(45, 90, 39, 0.15);
  transform: translateY(-2px);
}

.article-image {
  flex-shrink: 0;
  width: 200px;
  height: 140px;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.article-tag {
  display: inline-block;
  align-self: flex-start;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
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

.article-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.5;
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
  gap: 20px;
  margin-top: 16px;
  font-size: 13px;
  color: #999;
}

.article-author {
  padding-right: 16px;
  border-right: 1px solid #eee;
}

.article-time {
  padding-right: 16px;
  border-right: 1px solid #eee;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 50px;
}

.pagination-btn {
  padding: 12px 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background: #2d5a27;
  color: #fff;
  border-color: #2d5a27;
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
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e0e0e0;
}

.page-number.active {
  background: #2d5a27;
  color: #fff;
  border-color: #2d5a27;
}

/* 响应式 */
@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .filter-section .container {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .filter-tabs {
    flex-wrap: wrap;
  }
  
  .article-card {
    flex-direction: column;
  }
  
  .article-image {
    width: 100%;
    height: 200px;
  }
  
  .banner-title {
    font-size: 28px;
  }
}
</style>