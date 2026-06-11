<template>
  <div class="home-page">
    <!-- 轮播大图（使用API数据或默认数据） -->
    <section class="banner">
      <div class="banner-list" :style="{ transform: `translateX(-${currentBanner * 100}%)` }">
        <div class="banner-item" v-for="(b, i) in bannerItems" :key="i">
          <img :src="b.coverUrl || b.image" alt="" />
          <div class="text">
            <h1>{{ b.title }}</h1>
            <p>{{ b.subtitle }}</p>
            <button @click="goToPage(b.linkUrl || b.path)">{{ b.button || '立即查看' }}</button>
          </div>
        </div>
      </div>
      <div class="dots">
        <span v-for="(_, i) in bannerItems" :class="{ active: currentBanner === i }" @click="currentBanner = i"></span>
      </div>
    </section>

    <!-- 数据概览 -->
    <section class="stats">
      <div class="container">
        <h2>知识服务云平台</h2>
        <p class="desc">精准、及时、交互式、全天候、全程顾问式</p>
        <div class="grid">
          <div class="item" v-for="(s, i) in stats" :key="i">
            <div class="val">{{ s.value }}</div>
            <div class="label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能模块 -->
    <section class="features">
      <div class="container">
        <h2>基础功能</h2>
        <p class="desc">资讯预览、在线学习、在线测评、专家答疑、知识库、专题整合、个人中心、官网展示</p>
        <div class="grid">
          <div class="card" v-for="(f, i) in features" :key="i" @click="goToPage(f.path)">
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- API获取的首页分区内容 -->
    <section v-if="homeSections.length > 0" class="home-sections">
      <div class="container">
        <div v-for="section in homeSections" :key="section.id" class="section">
          <div class="section-header">
            <h2>{{ section.categoryName }}</h2>
            <p class="section-desc">{{ section.description }}</p>
          </div>
          <div class="section-items">
            <div 
              v-for="item in section.items" 
              :key="item.id" 
              class="section-item"
              @click="handleItemClick(item)"
            >
              <img v-if="item.coverUrl" :src="item.coverUrl" :alt="item.title" />
              <div class="item-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.subtitle || item.summary }}</p>
                <span class="content-type">{{ item.contentTypeLabel }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <div class="container">
       
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { contentApi, type AppHomeSectionResponse, type AppHomeItemResponse } from '~/utils/api/content'

const router = useRouter()

const currentBanner = ref(0)
let timer: any = null

const loading = ref(false)
const homeSections = ref<AppHomeSectionResponse[]>([])

// 默认轮播图数据（作为fallback）
const defaultBanners = ref([
  { 
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=600&fit=crop', 
    title: '中医在线咨询', 
    subtitle: '专业名师在线', 
    button: '立即咨询', 
    path: '/consult' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&h=600&fit=crop', 
    title: '在线学习平台', 
    subtitle: '传承中医智慧', 
    button: '开始学习', 
    path: '/video' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&h=600&fit=crop', 
    title: '专业考核认证', 
    subtitle: '提升专业水平', 
    button: '参加考核', 
    path: '/exam' 
  }
])

// 从API获取的轮播图数据（如果有）
const apiBanners = computed(() => {
  const bannerSection = homeSections.value.find(s => s.categoryCode === 'BANNER')
  if (bannerSection && bannerSection.items && bannerSection.items.length > 0) {
    return bannerSection.items
  }
  return []
})

// 合并后的轮播图数据
const bannerItems = computed(() => {
  if (apiBanners.value.length > 0) {
    return apiBanners.value
  }
  return defaultBanners.value
})

const stats = ref([
  { value: '20000+', label: '用户同时在线学习' },
  { value: '3000+', label: '音视频资源免费提供' },
  { value: '数百本', label: '专业中医书籍轻松查阅' },
  { value: '5000+', label: '题库测试学习' },
  { value: '上百位', label: '专家在线答疑' }
])

const features = ref([
  { title: '资讯预览', desc: '实时展示中医相关的各类资讯、包括图文结合音频、资讯收藏、分享', path: '/articles' },
  { title: '在线学习', desc: '提供多种学习方式，包括图文、图书、视频、音频、直播等，同时对学习进行学习统计、追踪', path: '/video' },
  { title: '在线测评', desc: '自由组题、动态生成考卷、随机抽题题目、及时回馈评测结果', path: '/exam' },
  { title: '专家答疑', desc: '知名专家实时在线、一对一解答相关疑问、生成公开展示对回答记录', path: '/consult' },
  { title: '知识库', desc: '按中医基础理论、中医诊断学、中药学、方剂学、中医内科、中医外科、四大经典等分类', path: '/books' },
  { title: '专题整合', desc: '以专题形式、发布内容推送、或者学习内容，供学员随时随地学习。专题中可以自定整合资讯、电子书、视频及考试测评', path: '/topics' },
  { title: '个人中心', desc: '用于管理用户的登录名、个人基本信息、支持手机短信实名认证和证书用户申请', path: '/profile' },
  { title: '官网展示', desc: '支持在WEB浏览器端、浏览平台所发布的内容。在线学习及评价均在移动前端小程序端', path: '/' }
])

// 获取首页聚合数据
const fetchHomeData = async () => {
  loading.value = true
  try {
    const response = await contentApi.getHome()
    if (response.success && response.data && response.data.sections) {
      homeSections.value = response.data.sections
    }
  } catch (error: any) {
    console.error('获取首页数据失败:', error)
    // 使用默认数据
  } finally {
    loading.value = false
  }
}

// 跳转方法
const goToPage = (path: string) => {
  if (!path || path === '/') return
  router.push(path)
}

// 处理首页项点击
const handleItemClick = (item: AppHomeItemResponse) => {
  if (item.linkUrl) {
    router.push(item.linkUrl)
  } else if (item.contentType && item.targetId) {
    // 根据内容类型跳转
    const pathMap: Record<string, string> = {
      'ARTICLE': '/news/detail/',
      'COURSE': '/course/',
      'VIDEO': '/video/',
      'PODCAST': '/podcast/',
      'BOOK': '/book/',
      'EXAM': '/exam/'
    }
    const basePath = pathMap[item.contentType] || '/'
    router.push(`${basePath}${item.targetId}`)
  }
}

onMounted(() => {
  fetchHomeData()
  timer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % bannerItems.value.length
  }, 4000)
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
/* 全局重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Microsoft YaHei", sans-serif;
  background: #fff;
}

/* 容器 */
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 轮播图 */
.banner {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
}
.banner-list {
  display: flex;
  height: 100%;
  transition: 0.6s;
}
.banner-item {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
}
.banner-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner-item .text {
  position: absolute;
  left: 10%;
  top: 30%;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
.banner-item .text h1 {
  font-size: 48px;
  margin-bottom: 16px;
}
.banner-item .text p {
  font-size: 20px;
  margin-bottom: 24px;
}
.banner-item .text button {
  padding: 12px 32px;
  background: #20c997;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}
.banner-item .text button:hover {
  background: #1ba97f;
}
.dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}
.dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s;
}
.dots span.active {
  width: 30px;
  border-radius: 6px;
  background: #20c997;
}

/* 数据概览 */
.stats {
  padding: 50px 0;
  background: linear-gradient(135deg, #2d5a27 0%, #38a169 100%);
  color: #fff;
  text-align: center;
}
.stats h2 {
  font-size: 28px;
  margin-bottom: 8px;
}
.stats .desc {
  margin-bottom: 40px;
  opacity: 0.8;
}
.stats .grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
}
.stats .item {
  text-align: center;
}
.stats .item .val {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 8px;
}
.stats .item .label {
  font-size: 14px;
  opacity: 0.9;
}

/* 功能模块 */
.features {
  padding: 60px 0;
}
.features h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 8px;
}
.features .desc {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}
.features .grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.features .card {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.features .card:hover {
  background: #20c997;
  color: #fff;
  transform: translateY(-5px);
}
.features .card h3 {
  font-size: 18px;
  margin-bottom: 12px;
}
.features .card p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}
.features .card:hover p {
  color: rgba(255,255,255,0.8);
}

/* 首页分区内容 */
.home-sections {
  padding: 60px 0;
  background: #f5f5f5;
}
.section {
  margin-bottom: 40px;
}
.section:last-child {
  margin-bottom: 0;
}
.section-header {
  margin-bottom: 20px;
}
.section-header h2 {
  font-size: 24px;
  margin-bottom: 8px;
}
.section-desc {
  color: #666;
  font-size: 14px;
}
.section-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.section-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}
.section-item:hover {
  transform: translateY(-5px);
}
.section-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.item-content {
  padding: 16px;
}
.item-content h3 {
  font-size: 16px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-content p {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.content-type {
  display: inline-block;
  padding: 4px 12px;
  background: #f0f0f0;
  color: #666;
  font-size: 12px;
  border-radius: 12px;
}

/* 底部 */
.footer {
  padding: 40px 0;
  background: #333;
  color: #999;
}
</style>