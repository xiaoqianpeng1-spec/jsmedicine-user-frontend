<template>
  <div class="home-page">
    <!-- 轮播大图（网页风格） -->
    <section class="banner">
      <div class="banner-list" :style="{ transform: `translateX(-${currentBanner * 100}%)` }">
        <div class="banner-item" v-for="(b, i) in banners" :key="i">
          <img :src="b.image" alt="" />
          <div class="text">
            <h1>{{ b.title }}</h1>
            <p>{{ b.subtitle }}</p>
            <button>{{ b.button }}</button>
          </div>
        </div>
      </div>
      <div class="dots">
        <span v-for="(_, i) in banners" :class="{ active: currentBanner === i }" @click="currentBanner = i"></span>
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

    <!-- 最新资讯
    <section class="news">
      <div class="container">
        <div class="head">
          <h2>最新资讯</h2>
          <a href="/news">查看更多</a>
        </div>
        <div class="list">
          <div class="item" v-for="(n, i) in newsList" :key="i" @click="goToArticle(n.id)">
            <img :src="n.image" alt="" />
            <div class="info">
              <h4>{{ n.title }}</h4>
              <div class="meta">
                <span :class="n.tagClass">{{ n.tag }}</span>
                <span>{{ n.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- 底部 -->
    <footer class="footer">
      <div class="container">
       
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentBanner = ref(0)
let timer: any = null

// 图片全部换成可访问地址
const banners = ref([
  { image: 'https://picsum.photos/seed/1/1920/600', title: '中医在线咨询', subtitle: '专业名师在线', button: '立即咨询' },
  { image: 'https://picsum.photos/seed/2/1920/600', title: '在线学习平台', subtitle: '传承中医智慧', button: '开始学习' },
  { image: 'https://picsum.photos/seed/3/1920/600', title: '专业考核认证', subtitle: '提升专业水平', button: '参加考核' }
])

const stats = ref([
  { value: '20000+', label: '用户同时在线学习' },
  { value: '3000+', label: '音视频资源免费提供' },
  { value: '数百本', label: '专业中医书籍轻松查阅' },
  { value: '5000+', label: '题库测试学习' },
  { value: '上百位', label: '专家在线答疑' }
])

const features = ref([
  { title: '资讯预览', desc: '实时展示中医相关的各类资讯、包括图文结合音频、资讯收藏、分享', path: '/news' },
  { title: '在线学习', desc: '提供多种学习方式，包括图文、图书、视频、音频、直播等，同时对学习进行学习统计、追踪', path: '/videos' },
  { title: '在线测评', desc: '自由组题、动态生成考卷、随机抽题题目、及时回馈评测结果', path: '/exam' },
  { title: '专家答疑', desc: '知名专家实时在线、一对一解答相关疑问、生成公开展示对回答记录', path: '/consult' },
  { title: '知识库', desc: '按中医基础理论、中医诊断学、中药学、方剂学、中医内科、中医外科、四大经典等分类', path: '/books' },
  { title: '专题整合', desc: '以专题形式、发布内容推送、或者学习内容，供学员随时随地学习。专题中可以自定整合资讯、电子书、视频及考试测评', path: '/topics' },
  { title: '个人中心', desc: '用于管理用户的登录名、个人基本信息、支持手机短信实名认证和证书用户申请', path: '/profile' },
  { title: '官网展示', desc: '支持在WEB浏览器端、浏览平台所发布的内容。在线学习及评价均在移动前端小程序端', path: '/' }
])

const newsList = ref([
  { id: 1, image: 'https://picsum.photos/seed/news1/400/220', title: '首届中澳全科医学教育与基层医疗实践网络研讨会召开在即', tag: '新闻资讯', tagClass: 'red', time: '2024-01-15' },
  { id: 2, image: 'https://picsum.photos/seed/news2/400/220', title: '中医数字化转型研讨会成功举办', tag: '学术交流', tagClass: 'pink', time: '2024-01-14' },
  { id: 3, image: 'https://picsum.photos/seed/news3/400/220', title: '中医药高等教育创新发展论坛圆满落幕', tag: '行业动态', tagClass: 'blue', time: '2024-01-13' }
])

// 跳转方法（不会跳登录页）
const goToPage = (path: string) => {
  if (path === '/') return // 点击首页 → 不跳转！
  router.push(path)
}

const goToArticle = (id: number) => {
  router.push(`/news/detail/${id}`)
}

const goToProfile = () => {
  router.push('/profile')
}

onMounted(() => {
  timer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.value.length
  }, 4000)
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
/* 全局重置（标准网页必备） */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Microsoft YaHei", sans-serif;
  background: #fff;
}

/* 容器：标准网页宽度 1200px */
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 轮播图：网页大横幅 */
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
  top: 50%;
  left: 12%;
  transform: translateY(-50%);
  color: #fff;
}
.banner-item h1 {
  font-size: 52px;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.banner-item p {
  font-size: 24px;
  margin-bottom: 24px;
}
.banner-item button {
  padding: 14px 36px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
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
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  cursor: pointer;
}
.dots span.active {
  background: #2d5a27;
  width: 30px;
  border-radius: 6px;
}

/* 数据模块 */
.stats {
  padding: 90px 0;
  background: #f8fbf8;
  text-align: center;
}
.stats h2 {
  font-size: 32px;
  margin-bottom: 12px;
}
.stats .desc {
  color: #666;
  margin-bottom: 50px;
  font-size: 16px;
}
.stats .grid {
  display: flex;
  justify-content: space-between;
}
.stats .item {
  width: 20%;
}
.stats .val {
  font-size: 36px;
  font-weight: bold;
  color: #2d5a27;
  margin-bottom: 8px;
}
.stats .label {
  font-size: 16px;
  color: #666;
}

/* 功能模块 */
.features {
  padding: 90px 0;
  text-align: center;
}
.features h2 {
  font-size: 32px;
  margin-bottom: 12px;
}
.features .desc {
  color: #666;
  margin-bottom: 50px;
}
.features .grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}
.features .card {
  padding: 40px 24px;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}
.features .card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}
.features .card h3 {
  font-size: 20px;
  margin-bottom: 12px;
}
.features .card p {
  color: #666;
  line-height: 1.6;
}

/* 资讯 */
.news {
  padding: 90px 0;
  background: #f8fbf8;
}
.news .head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.news h2 {
  font-size: 32px;
}
.news a {
  color: #2d5a27;
  text-decoration: none;
}
.news .list {
  display: flex;
  gap: 30px;
}
.news .item {
  flex: 1;
  cursor: pointer;
}
.news .item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}
.news .item h4 {
  font-size: 18px;
  margin-bottom: 12px;
  line-height: 1.5;
}
.news .meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}
.news .meta span {
  padding: 2px 8px;
  border-radius: 4px;
}
.red { background: #ffebee; color: #c62828 }
.pink { background: #fce4ec; color: #ad1457 }
.blue { background: #e3f2fd; color: #1565c0 }

/* 底部 */
.footer {
  background: #333;
  color: #fff;
  padding: 30px 0;
}
.copyright {
  text-align: center;
  color: #999;
}
</style>