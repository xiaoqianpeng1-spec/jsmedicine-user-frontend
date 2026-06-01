<template>
  <div class="books-page">
    <el-page-header @back="navigateTo('/')" content="图书" class="page-header">
      <template #extra>
        <el-input
          v-model="keyword"
          placeholder="搜索图书..."
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
      <el-skeleton :loading="loading" :count="8" :rows="3" animated>
        <template #default>
          <el-empty v-if="!loading && books.length === 0" description="暂无图书" />
          <el-row :gutter="20" v-else>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="book in books" :key="book.id">
              <el-card
                class="book-card"
                shadow="hover"
                @click="navigateTo(`/books/${book.id}`)"
              >
                <div class="book-cover">
                  <img :src="book.coverUrl || '/placeholder.jpg'" :alt="book.title" />
                </div>
                <div class="book-info">
                  <h3 class="book-title">{{ book.title }}</h3>
                  <p class="book-author">{{ book.author }}</p>
                  <div class="book-meta">
                    <el-tag size="small" v-if="book.categoryName">{{ book.categoryName }}</el-tag>
                    <span class="book-views">{{ book.viewCount }} 阅读</span>
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
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

const keyword = ref('')
const books = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)

const fetchBooks = async () => {
  loading.value = true
  try {
    const { getBookList } = await import('~/api')
    const result = await getBookList({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
    })
    books.value = result.records || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取图书失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchBooks()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchBooks()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  fetchBooks()
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped>
.books-page {
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

.book-card {
  cursor: pointer;
  margin-bottom: 20px;
  transition: transform 0.2s;
}

.book-card:hover {
  transform: translateY(-4px);
}

.book-cover {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 12px;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-info {
  padding: 4px;
}

.book-title {
  font-size: 15px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 8px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.book-author {
  font-size: 13px;
  color: #666666;
  margin-bottom: 12px;
}

.book-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-views {
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
}
</style>
