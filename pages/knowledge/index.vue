<template>
  <div class="knowledge-page">
    <el-page-header @back="navigateTo('/')" content="知识库" class="page-header">
      <template #extra>
        <el-input
          v-model="keyword"
          placeholder="搜索知识库..."
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
      <el-row :gutter="20">
        <el-col :xs="24" :md="6">
          <el-card class="category-sidebar">
            <template #header>
              <div class="card-header">
                <span>分类</span>
              </div>
            </template>
            <el-menu
              :default-active="activeCategory"
              @select="handleSelectCategory"
              class="category-menu"
            >
              <el-menu-item index="">全部</el-menu-item>
              <el-menu-item 
                v-for="cat in categories" 
                :key="cat.id" 
                :index="String(cat.id)"
              >
                {{ cat.categoryName }}
              </el-menu-item>
            </el-menu>
          </el-card>
        </el-col>

        <el-col :xs="24" :md="18">
          <el-skeleton :loading="loading" :count="5" :rows="3" animated>
            <template #default>
              <el-empty v-if="!loading && entries.length === 0" description="暂无知识库条目" />
              <el-card 
                v-else
                v-for="entry in entries" 
                :key="entry.id"
                class="entry-card"
                shadow="hover"
                @click="navigateTo(`/knowledge/detail/${entry.id}`)"
              >
                <div class="entry-content">
                  <h3 class="entry-title">{{ entry.title }}</h3>
                  <p class="entry-summary">{{ entry.summary }}</p>
                  <div class="entry-meta">
                    <el-tag size="small" type="success" v-if="entry.categoryName">
                      {{ entry.categoryName }}
                    </el-tag>
                    <span class="entry-views">{{ entry.viewCount }} 阅读</span>
                  </div>
                </div>
                <div class="entry-arrow">
                  <el-icon><Right /></el-icon>
                </div>
              </el-card>

              <el-pagination
                v-if="total > 0"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 40]"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
                class="pagination"
              />
            </template>
          </el-skeleton>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Right } from '@element-plus/icons-vue'

const keyword = ref('')
const categories = ref<any[]>([])
const entries = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const activeCategory = ref('')
const selectedCategory = ref<number | null>(null)

const fetchCategories = async () => {
  try {
    const { getKnowledgeCategoryTree } = await import('~/api')
    categories.value = await getKnowledgeCategoryTree()
  } catch (error) {
    console.error('获取分类失败:', error)
  }
}

const fetchEntries = async () => {
  loading.value = true
  try {
    const { searchKnowledgeEntries } = await import('~/api')
    const result = await searchKnowledgeEntries({
      page: currentPage.value,
      size: pageSize.value,
      keyword: keyword.value || undefined,
      categoryId: selectedCategory.value || undefined,
    })
    entries.value = result.records || []
    total.value = result.total || 0
  } catch (error) {
    console.error('获取知识库条目失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchEntries()
}

const handleSelectCategory = (index: string) => {
  activeCategory.value = index
  selectedCategory.value = index ? Number(index) : null
  currentPage.value = 1
  fetchEntries()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchEntries()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  fetchEntries()
}

onMounted(() => {
  fetchCategories()
  fetchEntries()
})
</script>

<style scoped>
.knowledge-page {
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

.category-sidebar {
  height: fit-content;
}

.card-header {
  font-weight: 500;
}

.category-menu {
  border: none;
}

.entry-card {
  cursor: pointer;
  margin-bottom: 16px;
}

.entry-card :deep(.el-card__body) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.entry-content {
  flex: 1;
  min-width: 0;
}

.entry-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 8px;
}

.entry-summary {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  display: box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entry-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.entry-views {
  font-size: 13px;
  color: #999999;
}

.entry-arrow {
  color: #999999;
  font-size: 20px;
  flex-shrink: 0;
  margin-left: 16px;
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

  .category-sidebar {
    margin-bottom: 20px;
  }
}
</style>
