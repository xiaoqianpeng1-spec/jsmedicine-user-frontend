<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-layout">
        <!-- 左侧侧边栏 -->
        <aside class="sidebar">
          <div class="user-card">
            <!-- 头像 + 角色标签 -->
            <div class="avatar-box">
              <img :src="displayInfo.avatar" alt="头像" class="avatar" />
              <span class="role-tag">{{ displayInfo.role }}</span>
            </div>
            <h2 class="username">{{ displayInfo.nickname }}</h2>
            <p class="motto">{{ displayInfo.motto }}</p>
            <div class="btn-group">
              <button class="btn edit-btn" @click="goEdit">编辑资料</button>
              <button class="btn logout-btn" @click="handleLogout">退出登录</button>
            </div>
          </div>

          <nav class="side-nav">
            <ul>
              <li 
                v-for="item in navList" 
                :key="item.id"
                class="nav-item"
                :class="{ active: activeMenu === item.id }"
                @click="activeMenu = item.id"
              >
                <span class="icon-wrap" :class="item.icon"></span>
                <span class="text">{{ item.label }}</span>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- 右侧主内容区 -->
        <main class="main">
          <div class="breadcrumb">
            <span>您的位置：首页 > 个人中心</span>
          </div>

          <!-- 我的收藏 -->
          <div v-if="activeMenu === 'collect'" class="content-card">
            <div class="card-title">我的收藏</div>
            <div class="list-wrap">
              <div class="list-item" v-for="item in collectList" :key="item.id">
                <img :src="item.image" alt="" class="item-img" />
                <div class="item-info">
                  <div class="item-name">{{ item.title }}</div>
                  <div class="item-desc">{{ item.type }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 浏览记录 -->
          <div v-else-if="activeMenu === 'history'" class="content-card">
            <div class="card-title">浏览记录</div>
            <div class="list-wrap">
              <div class="list-item" v-for="item in historyList" :key="item.id">
                <img :src="item.image" alt="" class="item-img" />
                <div class="item-info">
                  <div class="item-name">{{ item.title }}</div>
                  <div class="item-desc">{{ item.time }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 我的问答 -->
          <div v-else-if="activeMenu === 'question'" class="content-card">
            <div class="card-title">我的问答</div>
            <div class="list-wrap">
              <div class="q-item" v-for="item in questionList" :key="item.id">
                <div class="q-left">
                  <div class="q-title">{{ item.title }}</div>
                  <div class="q-desc">{{ item.desc }}</div>
                </div>
                <span class="q-status" :class="item.statusClass">{{ item.status }}</span>
              </div>
            </div>
          </div>

          <!-- 我的考核 -->
          <div v-else-if="activeMenu === 'exam'" class="content-card">
            <div class="card-title">我的考核</div>
            <div class="list-wrap">
              <div class="exam-item" v-for="item in examList" :key="item.id">
                <div class="exam-left">
                  <div class="exam-title">{{ item.title }}</div>
                  <div class="exam-date">{{ item.date }}</div>
                </div>
                <div class="exam-right">
                  <span class="score">{{ item.score }}</span>
                  <span class="grade" :class="item.gradeClass">{{ item.grade }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 学习统计 -->
          <div v-else-if="activeMenu === 'stat'" class="content-card">
            <div class="card-title">学习统计</div>
            <div class="stat-grid">
              <div class="stat-item" v-for="item in statList" :key="item.id">
                <span class="stat-icon">{{ item.icon }}</span>
                <div class="stat-num">{{ item.value }}</div>
                <div class="stat-text">{{ item.label }}</div>
              </div>
            </div>
          </div>

          <!-- 编辑资料（参考图风格） -->
          <div v-else-if="activeMenu === 'edit'" class="content-card edit-card">
            <div class="edit-header">
              <h3 class="card-title">修改资料</h3>
              <!-- 头像在右上角 -->
              <div class="edit-avatar-wrap">
                <div class="avatar-box edit-avatar" @click="clickAvatar">
                  <img :src="editForm.avatar || defaultAvatar" alt="头像" class="avatar" />
                  <span class="edit-role-tag">{{ editForm.role || '学员' }}</span>
                </div>
                <input 
                  ref="avatarInput"
                  type="file"
                  accept="image/*"
                  class="file-input"
                  @change="onAvatarChange"
                />
              </div>
            </div>

            <form class="edit-form" @submit.prevent="submitForm">
              <div class="form-row" @click="currentField = 'gender'">
                <label class="form-label">性别</label>
                <div class="form-value">
                  {{ editForm.gender || '男' }}
                  <span class="arrow">›</span>
                </div>
                <select 
                  v-if="currentField === 'gender'" 
                  v-model="editForm.gender"
                  class="form-select"
                  @click.stop
                  @change="currentField = ''"
                >
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>

              <div class="form-row" @click="currentField = 'nickname'">
                <label class="form-label">昵称</label>
                <div class="form-value">
                  {{ editForm.nickname || '周某' }}
                  <span class="arrow">›</span>
                </div>
                <input 
                  v-if="currentField === 'nickname'"
                  v-model="editForm.nickname"
                  class="form-input"
                  @click.stop
                  @blur="currentField = ''"
                  placeholder="请输入昵称"
                />
              </div>

              <div class="form-row" @click="currentField = 'mobile'">
                <label class="form-label">电话</label>
                <div class="form-value">
                  {{ editForm.mobile || '18812334561' }}
                  <span class="arrow">›</span>
                </div>
                <input 
                  v-if="currentField === 'mobile'"
                  v-model="editForm.mobile"
                  class="form-input"
                  type="tel"
                  @click.stop
                  @blur="currentField = ''"
                  placeholder="请输入手机号"
                />
              </div>

              <div class="form-row">
                <label class="form-label">身份</label>
                <div class="form-value">{{ editForm.role || '学员' }}</div>
              </div>

              <div class="form-row" @click="currentField = 'motto'">
                <label class="form-label">口号</label>
                <div class="form-value">
                  {{ editForm.motto || '请输入口号(15字以内)' }}
                  <span class="arrow">›</span>
                </div>
                <input 
                  v-if="currentField === 'motto'"
                  v-model="editForm.motto"
                  class="form-input"
                  maxlength="15"
                  @click.stop
                  @blur="currentField = ''"
                  placeholder="请输入口号(15字以内)"
                />
              </div>

              <div class="form-row" @click="currentField = 'education'">
                <label class="form-label">学历</label>
                <div class="form-value">
                  {{ editForm.education || '专科' }}
                  <span class="arrow">›</span>
                </div>
                <select 
                  v-if="currentField === 'education'" 
                  v-model="editForm.education"
                  class="form-select"
                  @click.stop
                  @change="currentField = ''"
                >
                  <option value="专科">专科</option>
                  <option value="本科">本科</option>
                  <option value="硕士">硕士</option>
                  <option value="博士">博士</option>
                </select>
              </div>

              <div class="form-row" @click="currentField = 'city'">
                <label class="form-label">城市</label>
                <div class="form-value">
                  {{ editForm.city || '江苏省南京市 市辖区' }}
                  <span class="arrow">›</span>
                </div>
                <input 
                  v-if="currentField === 'city'"
                  v-model="editForm.city"
                  class="form-input"
                  @click.stop
                  @blur="currentField = ''"
                  placeholder="请输入城市"
                />
              </div>

              <div class="form-row" @click="currentField = 'company'">
                <label class="form-label">单位</label>
                <div class="form-value">
                  {{ editForm.company || '江苏凤凰科学科技出版社' }}
                  <span class="arrow">›</span>
                </div>
                <input 
                  v-if="currentField === 'company'"
                  v-model="editForm.company"
                  class="form-input"
                  @click.stop
                  @blur="currentField = ''"
                  placeholder="请输入单位"
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from '#imports'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { authApi } from '~/utils/api/auth'

const router = useRouter()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

userStore.loadFromCookie()
userStore.initFromStorage()

// 默认头像
const defaultAvatar = 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20avatar%20portrait%20simple&image_size=square'

// 当前选中菜单
const activeMenu = ref('collect')

// 编辑当前激活字段
const currentField = ref('')
const avatarInput = ref<HTMLInputElement | null>(null)

// 编辑表单初始化函数
const initEditForm = () => {
  return {
    avatar: userInfo.value.avatar || '',
    nickname: userInfo.value.nickname || userInfo.value.username || '',
    mobile: userInfo.value.mobile || '',
    role: userInfo.value.role || '',
    motto: userInfo.value.motto || '',
    gender: userInfo.value.gender || '',
    education: userInfo.value.education || '',
    city: userInfo.value.city || '',
    company: userInfo.value.company || ''
  }
}

// 编辑表单
const editForm = ref(initEditForm())

// 同步用户信息到编辑表单
const syncEditForm = () => {
  editForm.value = initEditForm()
}

// 侧边栏显示的数据源（编辑模式下显示editForm，否则显示userInfo）
const displayInfo = computed(() => {
  if (activeMenu.value === 'edit') {
    return {
      avatar: editForm.value.avatar || defaultAvatar,
      nickname: editForm.value.nickname || editForm.value.username || '未设置昵称',
      role: editForm.value.role || '学员',
      motto: editForm.value.motto || '学习口号：加油！！'
    }
  }
  return {
    avatar: userInfo.value.avatar || defaultAvatar,
    nickname: userInfo.value.nickname || userInfo.value.username || '未设置昵称',
    role: userInfo.value.role || '学员',
    motto: userInfo.value.motto || '学习口号：加油！！'
  }
})

// 监听全局用户信息变化，自动同步表单
watch(userInfo, () => {
  syncEditForm()
}, { immediate: true, deep: true })

// 侧边栏菜单
const navList = ref([
  { id: 'collect', icon: 'icon-star', label: '我的收藏' },
  { id: 'history', icon: 'icon-eye', label: '浏览记录' },
  { id: 'question', icon: 'icon-chat', label: '我的问答' },
  { id: 'exam', icon: 'icon-file', label: '我的考核' },
  { id: 'stat', icon: 'icon-bar', label: '学习统计' },
  { id: 'edit', icon: 'icon-edit', label: '编辑资料' }
])

// 模拟列表数据
const collectList = ref([
  { id: 1, title: '中医基础理论精讲', type: '视频课程', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=course1&image_size=square' },
  { id: 2, title: '针灸技法与临床应用', type: '专题课程', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=course2&image_size=square' },
  { id: 3, title: '黄帝内经解读', type: '音频课程', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=course3&image_size=square' }
])

const historyList = ref([
  { id: 1, title: '中医诊断学精要', time: '2024-01-15 14:30', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=doc1&image_size=square' },
  { id: 2, title: '中药方剂学专题', time: '2024-01-14 10:00', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=doc2&image_size=square' }
])

const questionList = ref([
  { id: 1, title: '中药配伍相关问题', desc: '请问十八反具体内容是什么？', status: '已回答', statusClass: 'ok' },
  { id: 2, title: '针灸疗程咨询', desc: '面瘫针灸需要多久恢复？', status: '待回答', statusClass: 'wait' }
])

const examList = ref([
  { id: 1, title: '中医基础理论考核', date: '2024-01-10', score: '92', grade: '优秀', gradeClass: 'excellent' },
  { id: 2, title: '针灸学考核', date: '2024-01-15', score: '85', grade: '良好', gradeClass: 'good' }
])

const statList = ref([
  { id: 1, icon: '▤', value: '48', label: '学习时长(小时)' },
  { id: 2, icon: '▢', value: '12', label: '完成课程' },
  { id: 3, icon: '✓', value: '6', label: '完成考核' },
  { id: 4, icon: '▣', value: '8', label: '提问次数' }
])

// 进入编辑页
const goEdit = () => {
  activeMenu.value = 'edit'
}

// 触发头像选择
const clickAvatar = () => {
  avatarInput.value?.click()
}

// 头像上传处理
const onAvatarChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    return
  }
  if (file.size > 2 * 1024 * 1024) {
    alert('图片大小不能超过 2MB')
    return
  }
  const reader = new FileReader()
  reader.onload = (ev) => {
    editForm.value.avatar = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

// 保存资料
const submitForm = async () => {
  const userData = {
    avatar: editForm.value.avatar,
    nickname: editForm.value.nickname,
    mobile: editForm.value.mobile,
    role: editForm.value.role,
    motto: editForm.value.motto,
    gender: editForm.value.gender,
    education: editForm.value.education,
    city: editForm.value.city,
    company: editForm.value.company
  }

  userStore.updateUserInfo(userData)

  if (userStore.token) {
    try {
      await authApi.updateUserInfo(userStore.token, userData)
    } catch (err) {
      console.error('服务器保存失败，已本地保存:', err)
    }
  }

  alert('资料保存成功！')
  activeMenu.value = 'collect'
}

// 退出登录
const handleLogout = () => {
  if (confirm('确定退出当前账号吗？')) {
    userStore.logout()
    router.push('/')
  }
}

onMounted(() => {
  syncEditForm()
  if (userStore.token) {
    const hasLocalData = userInfo.value.nickname || userInfo.value.username
    if (!hasLocalData) {
      userStore.fetchUserInfo()
    }
  }
})
</script>

<style scoped>
/* 全局页面样式 — 参考首页网站风格 */
.profile-page {
  background-color: #f8fbf8;
  min-height: 100vh;
  font-size: 14px;
  color: #333;
  font-family: "Microsoft YaHei", sans-serif;
}
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.profile-layout {
  display: flex;
  gap: 24px;
}

/* 左侧侧边栏 */
.sidebar {
  width: 280px;
  flex-shrink: 0;
}
.user-card {
  background: #fff;
  padding: 40px 24px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* 头像框样式 */
.avatar-box {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f0f0f0;
}
.role-tag {
  position: absolute;
  top: -5px;
  right: -15px;
  background: #2d5a27;
  color: #fff;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
}

.username {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px;
  color: #333;
}
.motto {
  color: #666;
  font-size: 14px;
  margin: 0 0 24px;
}
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.btn {
  height: 40px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: 0.3s;
}
.edit-btn {
  background: #2d5a27;
  color: #fff;
}
.edit-btn:hover {
  background: #1e3d1b;
  box-shadow: 0 4px 12px rgba(45,90,39,0.3);
}
.logout-btn {
  background: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}
.logout-btn:hover {
  background: #eee;
}

/* 侧边导航 */
.side-nav {
  background: #fff;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.side-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-item {
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 24px;
  cursor: pointer;
  color: #666;
  transition: 0.3s;
}
.nav-item:hover {
  background: #f8fbf8;
}
.nav-item.active {
  background: #e8f5e9;
  color: #2d5a27;
  border-left: 4px solid #2d5a27;
}
.icon-wrap {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  display: inline-block;
  position: relative;
}

/* 五角星图标 - 我的收藏 */
.icon-star {
  background: linear-gradient(135deg, transparent 35%, currentColor 35%, currentColor 65%, transparent 65%);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

/* 圆形图标 - 浏览记录 */
.icon-eye {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid currentColor;
  background: currentColor;
}

/* 聊天气泡图标 - 我的问答 */
.icon-chat {
  width: 16px;
  height: 12px;
  background: currentColor;
  border-radius: 0 6px 6px 6px;
}
.icon-chat::after {
  content: '';
  position: absolute;
  top: -4px;
  left: 0;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid currentColor;
  border-bottom: 4px solid currentColor;
  border-top: 4px solid transparent;
}

/* 文件图标 - 我的考核 */
.icon-file {
  width: 14px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 2px;
}
.icon-file::before {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background: currentColor;
}

/* 柱状图图标 - 学习统计 */
.icon-bar {
  width: 16px;
  height: 14px;
}
.icon-bar::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: currentColor;
}
.icon-bar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 6px;
  width: 4px;
  height: 60%;
  background: currentColor;
}

/* 编辑图标 - 编辑资料 */
.icon-edit {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-radius: 2px;
  transform: rotate(-30deg);
}
.icon-edit::after {
  content: '';
  position: absolute;
  bottom: -2px;
  right: -4px;
  width: 0;
  height: 0;
  border-left: 6px solid currentColor;
  border-top: 6px solid transparent;
}

/* 右侧主内容区 */
.main {
  flex: 1;
}
.breadcrumb {
  background: transparent;
  padding: 16px 0;
  color: #999;
  font-size: 14px;
}
.content-card {
  background: #fff;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-radius: 8px;
}
.card-title {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
  margin: 0 0 24px 0;
  color: #333;
}

/* 通用列表 */
.list-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  transition: 0.3s;
}
.list-item:hover {
  background: #f0f5f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.item-img {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 20px;
}
.item-info {
  flex: 1;
}
.item-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #333;
}
.item-desc {
  color: #999;
  font-size: 14px;
}

/* 问答项 */
.q-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  transition: 0.3s;
}
.q-item:hover {
  background: #f0f5f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.q-left {
  flex: 1;
}
.q-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}
.q-desc {
  color: #666;
  font-size: 14px;
}
.q-status {
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 13px;
}
.q-status.ok {
  background: #e8f5e9;
  color: #2d5a27;
}
.q-status.wait {
  background: #fff7e6;
  color: #e65100;
}

/* 考核项 */
.exam-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  transition: 0.3s;
}
.exam-item:hover {
  background: #f0f5f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.exam-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #333;
}
.exam-date {
  color: #999;
  font-size: 14px;
}
.score {
  font-size: 24px;
  font-weight: bold;
  color: #2d5a27;
  display: block;
  text-align: right;
}
.grade {
  font-size: 14px;
}
.grade.excellent {
  color: #2d5a27;
}
.grade.good {
  color: #e65100;
}

/* 统计卡片 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.stat-item {
  text-align: center;
  padding: 30px 20px;
  background: #fafafa;
  border-radius: 8px;
  transition: 0.3s;
}
.stat-item:hover {
  background: #f0f5f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.stat-icon {
  font-size: 32px;
  margin-bottom: 12px;
}
.stat-num {
  font-size: 28px;
  font-weight: bold;
  color: #2d5a27;
  margin-bottom: 8px;
}
.stat-text {
  color: #666;
  font-size: 14px;
}

/* 编辑资料表单 */
.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}
.edit-avatar-wrap {
  position: relative;
}
.edit-avatar {
  width: 90px;
  height: 90px;
  cursor: pointer;
}
.edit-avatar .avatar {
  border: 3px solid #f0f0f0;
}
.edit-role-tag {
  position: absolute;
  right: -15px;
  bottom: 5px;
  background: #2d5a27;
  color: #fff;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
}
.file-input {
  display: none;
}

.form-row {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 15px;
  cursor: pointer;
  position: relative;
}
.form-row:hover {
  background: #f8fbf8;
}
.form-label {
  width: 100px;
  color: #666;
  font-size: 15px;
}
.form-value {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.arrow {
  color: #ccc;
  margin-left: 10px;
}
.form-input,
.form-select {
  flex: 1;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 10px;
  margin-left: 10px;
  outline: none;
}
</style>