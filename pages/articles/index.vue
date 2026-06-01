<template>
  <div class="articles-page">
    <el-page-header @back="navigateTo('/')" content="资讯" class="page-header">
      <template #extra>
        <el-input
          v-model="keyword"
          placeholder="搜索资讯..."
          class="search-input"
          clearable
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button :icon="Search" @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </template>
    </el-page-header>

    <div class="page-content">
      <el-skeleton :loading="loading" :count="6" :rows="4" animated>
        <el-empty v-if="!loading && articles.length === 0" description="暂无资讯" />
        <el-row :gutter="20" v-else>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="article in articles" :key="article.id">
            <el-card 
              class="article-card" 
              shadow="hover"
              @click="navigateTo(`/articles/detail/${article.id}`)"
            >
              <div class="article-cover">
                <img :src="article.coverUrl || '/placeholder.jpg'" :alt="article.title" />
              </div>
              <div class="article-info">
                <h3 class="article-title">{{ article.title }}</h3>
                <p class="article-summary">{{ article.summary }}</p>
                <div class="article-meta">
                  <span class="article-date">{{ formatDate(article.publishedAt) }}</span>
                  <span class="article-views">{{ article.viewCount }} 阅读</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-pagination
          v-if="total > 0"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[8, 12, 20, 40]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          class="pagination"
        />
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

const keyword = ref('')
const articles = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(8)
const total = ref(0)

const fetchArticles = async () => {
  loading.value = true
  try {
    const { searchKnowledgeEntries } = await import('~/api')
    const result = await searchKnowledgeEntries({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
    })
    articles.value = result.records?.map((item: any) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      coverUrl: item.coverUrl || '',
      viewCount: item.viewCount || 0,
      publishedAt: item.publishedAt || '',
    })) || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取资讯列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchArticles()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchArticles()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  fetchArticles()
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.articles-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.page-header {
  background: #ffffff;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
}

.search-input {
  width: 400px;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.article-card {
  cursor: pointer;
  margin-bottom: 20px;
  height: 100%;
}

.article-card :deep(.el-card__body) {
  padding: 0;
}

.article-cover {
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-info {
  padding: 16px;
}

.article-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-summary {
  font-size: 13px;
  color: #999999;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999999;
}

.pagination {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .search-input {
    width: 100%;
    margin-top: 12px;
  }

  .article-cover {
    height: 160px;
  }
}
</style>
