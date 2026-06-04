<template>
  <div class="chapter-detail-page">
    <!-- 顶部导航 -->
    <section class="chapter-header">
      <div class="container">
        <div class="header-content">
          <button class="back-btn" @click="goBack">
            <span>←</span>
          </button>
          <div class="header-title">
            <h2 class="book-title">{{ bookTitle }}</h2>
            <p class="chapter-label">第 {{ chapterData.sortOrder }} 章</p>
          </div>
          <button class="menu-btn" @click="toggleMenu">
            ☰
          </button>
        </div>
      </div>
    </section>

    <!-- 目录侧边栏 -->
    <div class="sidebar-overlay" v-if="showMenu" @click="toggleMenu"></div>
    <aside class="chapters-sidebar" :class="{ show: showMenu }">
      <div class="sidebar-header">
        <h3>章节目录</h3>
        <button class="close-btn" @click="toggleMenu">×</button>
      </div>
      <div class="sidebar-content">
        <div 
          v-for="chapter in chapters" 
          :key="chapter.id"
          class="sidebar-chapter"
          :class="{ active: chapter.id === chapterData.id }"
          @click="goToChapter(chapter.id)"
        >
          <span class="chapter-num">{{ chapter.sortOrder }}</span>
          <span class="chapter-name">{{ chapter.chapterTitle }}</span>
        </div>
      </div>
    </aside>

    <!-- 章节内容 -->
    <main class="chapter-content">
      <div class="container">
        <article class="content-article">
          <h1 class="chapter-title">{{ chapterData.chapterTitle }}</h1>
          <div class="chapter-meta">
            <span class="meta-item">起始页：{{ chapterData.startPage }}</span>
            <span class="meta-item">页数：{{ chapterData.pageCount }}</span>
          </div>
          <div class="content-body" v-html="chapterData.content"></div>
        </article>
      </div>
    </main>

    <!-- 底部导航 -->
    <section class="chapter-nav">
      <div class="container">
        <div class="nav-buttons">
          <button 
            class="nav-btn prev-btn" 
            :disabled="!prevChapter"
            @click="goToPrevChapter"
          >
            <span class="nav-icon">←</span>
            <span class="nav-text">上一章</span>
          </button>
          <button class="nav-btn toc-btn" @click="toggleMenu">
            <span class="nav-icon">☰</span>
            <span class="nav-text">目录</span>
          </button>
          <button 
            class="nav-btn next-btn" 
            :disabled="!nextChapter"
            @click="goToNextChapter"
          >
            <span class="nav-text">下一章</span>
            <span class="nav-icon">→</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { booksApi, type AppBookChapterResponse } from '~/utils/api/books'

const router = useRouter()
const route = useRoute()

const bookTitle = ref('')
const chapterData = ref<AppBookChapterResponse>({
  id: 0,
  bookId: 0,
  parentId: 0,
  chapterTitle: '',
  content: '',
  startPage: 0,
  pageCount: 0,
  paperId: 0,
  sortOrder: 0
})

const chapters = ref<AppBookChapterResponse[]>([])
const showMenu = ref(false)

const prevChapter = computed(() => {
  const currentIndex = chapters.value.findIndex(c => c.id === chapterData.value.id)
  return currentIndex > 0 ? chapters.value[currentIndex - 1] : null
})

const nextChapter = computed(() => {
  const currentIndex = chapters.value.findIndex(c => c.id === chapterData.value.id)
  return currentIndex < chapters.value.length - 1 ? chapters.value[currentIndex + 1] : null
})

const goBack = () => {
  router.back()
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const goToChapter = (chapterId: number) => {
  router.push(`/books/${route.params.id}/chapter/${chapterId}`)
  showMenu.value = false
}

const goToPrevChapter = () => {
  if (prevChapter.value) {
    goToChapter(prevChapter.value.id)
  }
}

const goToNextChapter = () => {
  if (nextChapter.value) {
    goToChapter(nextChapter.value.id)
  }
}

onMounted(async () => {
  const bookId = parseInt(route.params.id as string)
  const chapterId = parseInt(route.params.chapterId as string)
  
  if (bookId && chapterId) {
    try {
      const [bookResponse, chapterResponse] = await Promise.all([
        booksApi.getBookDetail(bookId),
        booksApi.getChapterDetail(bookId, chapterId)
      ])
      
      if (bookResponse.success) {
        bookTitle.value = bookResponse.data.bookName
        chapters.value = bookResponse.data.chapters
      }
      
      if (chapterResponse.success) {
        chapterData.value = chapterResponse.data
      }
    } catch (error) {
      console.error('Failed to load chapter detail:', error)
    }
  }
})
</script>

<style scoped>
.chapter-detail-page {
  font-family: "Microsoft YaHei", "SimSun", serif;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 顶部导航 */
.chapter-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-btn,
.menu-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  color: #333;
  transition: all 0.3s;
}

.back-btn:hover,
.menu-btn:hover {
  background: #f0f0f0;
}

.header-title {
  flex: 1;
  overflow: hidden;
}

.book-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chapter-label {
  font-size: 12px;
  color: #999;
  margin: 2px 0 0 0;
}

/* 侧边栏 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
}

.chapters-sidebar {
  position: fixed;
  top: 0;
  right: -320px;
  width: 320px;
  height: 100%;
  background: #fff;
  z-index: 300;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
}

.chapters-sidebar.show {
  right: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  color: #666;
}

.close-btn:hover {
  background: #f0f0f0;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.sidebar-chapter {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.sidebar-chapter:hover {
  background: #f8fbf8;
}

.sidebar-chapter.active {
  background: #e8f5e9;
}

.sidebar-chapter.active .chapter-num {
  background: #2d5a27;
  color: #fff;
}

.chapter-num {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 500;
  color: #666;
  margin-right: 12px;
}

.chapter-name {
  flex: 1;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 章节内容 */
.chapter-content {
  flex: 1;
  padding: 80px 0 100px;
}

.content-article {
  padding: 24px 0;
}

.chapter-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.chapter-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.meta-item {
  font-size: 13px;
  color: #999;
}

.content-body {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  text-align: justify;
}

.content-body p {
  margin: 16px 0;
  text-indent: 2em;
}

.content-body h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 24px 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.content-body h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 20px 0 12px;
}

.content-body ul,
.content-body ol {
  padding-left: 24px;
  margin: 12px 0;
}

.content-body li {
  margin: 8px 0;
}

.content-body blockquote {
  margin: 16px 0;
  padding: 12px 16px;
  background: #f8fbf8;
  border-left: 4px solid #2d5a27;
  font-style: italic;
  color: #666;
}

/* 底部导航 */
.chapter-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #f5f7fa;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.3s;
}

.nav-btn:hover:not(:disabled) {
  background: #e8f5e9;
  color: #2d5a27;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev-btn {
  flex: 1;
  justify-content: flex-start;
}

.next-btn {
  flex: 1;
  justify-content: flex-end;
}

.toc-btn {
  min-width: 100px;
  justify-content: center;
}

.nav-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .content-body {
    font-size: 15px;
    line-height: 1.7;
  }
  
  .chapter-title {
    font-size: 20px;
  }
  
  .nav-btn {
    padding: 10px 16px;
    font-size: 13px;
  }
}
</style>