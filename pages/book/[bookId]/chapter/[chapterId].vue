<template>
  <div class="chapter-detail">
    <div class="chapter-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h2>{{ chapterTitle }}</h2>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadChapterDetail">重新加载</button>
    </div>

    <div v-else-if="chapter" class="chapter-content">
      <!-- 章节信息卡片 -->
      <div class="info-card">
        <div class="info-row">
          <span class="label">章节标题</span>
          <span class="value">{{ chapter.chapterTitle }}</span>
        </div>
        <div class="info-row">
          <span class="label">起始页</span>
          <span class="value">{{ chapter.startPage }}</span>
        </div>
        <div class="info-row">
          <span class="label">页数</span>
          <span class="value">{{ chapter.pageCount }}</span>
        </div>
        <div class="info-row">
          <span class="label">排序</span>
          <span class="value">{{ chapter.sortOrder }}</span>
        </div>
      </div>

      <!-- 章节正文内容 -->
      <div class="content-section">
        <h3>章节内容</h3>
        <div v-if="chapter.content" class="content-body">
          <div v-html="formattedContent"></div>
        </div>
        <div v-else class="no-content">
          <p>暂无章节内容</p>
        </div>
      </div>

      <!-- 相关操作按钮 -->
      <div v-if="chapter.paperId" class="action-section">
        <button class="action-btn" @click="goToPractice">
         去做练习
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { learningApi, type AppBookChapterResponse } from '~/utils/api/learning'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const error = ref('')
const chapter = ref<AppBookChapterResponse | null>(null)

const chapterTitle = computed(() => {
  return chapter.value?.chapterTitle || '章节详情'
})

const formattedContent = computed(() => {
  if (!chapter.value?.content) return ''
  // 将换行符转换为<br>标签
  return chapter.value.content.replace(/\n/g, '<br>')
})

const loadChapterDetail = async () => {
  loading.value = true
  error.value = ''
  
  const bookId = parseInt(route.params.bookId as string)
  const chapterId = parseInt(route.params.chapterId as string)
  
  if (isNaN(bookId) || isNaN(chapterId)) {
    error.value = '无效的图书ID或章节ID'
    loading.value = false
    return
  }

  try {
    const response = await learningApi.getBookChapterDetail(bookId, chapterId)
    if (response.success && response.data) {
      chapter.value = response.data
    } else {
      error.value = response.message || '获取章节详情失败'
    }
  } catch (err: any) {
    console.error('获取章节详情失败:', err)
    error.value = err.message || '获取章节详情失败'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}

const goToPractice = () => {
  if (chapter.value?.paperId) {
    router.push(`/exam/${chapter.value.paperId}`)
  }
}

onMounted(() => {
  loadChapterDetail()
})
</script>

<style scoped>
.chapter-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  min-height: 100vh;
}

.chapter-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.back-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.back-btn:hover {
  background: #eee;
}

.chapter-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.loading, .error {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #20c997;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: #dc3545;
}

.error button {
  margin-top: 16px;
  padding: 8px 20px;
  background: #20c997;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.info-card {
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.label {
  display: inline-block;
  width: 80px;
  font-weight: 500;
  color: #666;
  font-size: 14px;
  flex-shrink: 0;
}

.value {
  color: #333;
  font-size: 14px;
  flex: 1;
}

.content-section {
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.content-section h3 {
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 600;
}

.content-body {
  font-size: 14px;
  line-height: 1.8;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.content-body :deep(p) {
  margin-bottom: 16px;
}

.content-body :deep(h1),
.content-body :deep(h2),
.content-body :deep(h3) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.content-body :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 16px 0;
}

.no-content {
  text-align: center;
  padding: 30px;
  color: #999;
}

.action-section {
  text-align: center;
  padding: 20px 0;
}

.action-btn {
  padding: 12px 32px;
  background: #20c997;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #1ba97f;
}
</style>