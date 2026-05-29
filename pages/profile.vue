<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-layout">
        <!-- 左侧侧边栏 -->
        <aside class="sidebar">
          <div class="user-card">
            <!-- 头像 + 角色标签 -->
            <div class="avatar-box">
              <img :src="userInfo.avatar || defaultAvatar" alt="头像" class="avatar" />
              <span class="role-tag">{{ userInfo.role || '学员' }}</span>
            </div>
            <h2 class="username">{{ userInfo.nickname || userInfo.username || '未设置昵称' }}</h2>
            <p class="motto">{{ userInfo.motto || '学习口号：加油！！' }}</p>
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
                <span class="icon">{{ item.icon }}</span>
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
import { ref, onMounted, watch } from 'vue'
import { useRouter } from '#imports'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

const router = useRouter()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 默认头像
const defaultAvatar = 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20avatar%20portrait%20simple&image_size=square'

// 当前选中菜单
const activeMenu = ref('collect')

// 编辑当前激活字段
const currentField = ref('')
const avatarInput = ref<HTMLInputElement | null>(null)

// 编辑表单 —— 完全关联登录用户信息
const editForm = ref({
  avatar: '',
  nickname: '',
  mobile: '',
  role: '',
  motto: '',
  gender: '',
  education: '',
  city: '',
  company: ''
})

// 监听全局用户信息变化，自动同步表单
watch(userInfo, (val) => {
  editForm.value = {
    avatar: val.avatar || '',
    nickname: val.nickname || val.username || '',
    mobile: val.mobile || '',
    role: val.role || '',
    motto: val.motto || '',
    gender: val.gender || '',
    education: val.education || '',
    city: val.city || '',
    company: val.company || ''
  }
}, { immediate: true, deep: true })

// 侧边栏菜单
const navList = ref([
  { id: 'collect', icon: '⭐', label: '我的收藏' },
  { id: 'history', icon: '👁️', label: '浏览记录' },
  { id: 'question', icon: '💬', label: '我的问答' },
  { id: 'exam', icon: '📝', label: '我的考核' },
  { id: 'stat', icon: '📊', label: '学习统计' },
  { id: 'edit', icon: '✏️', label: '编辑资料' }
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
  { id: 1, icon: '📚', value: '48', label: '学习时长(小时)' },
  { id: 2, icon: '🎬', value: '12', label: '完成课程' },
  { id: 3, icon: '✓', value: '6', label: '完成考核' },
  { id: 4, icon: '💬', value: '8', label: '提问次数' }
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
const submitForm = () => {
  // 更新全局用户信息
  userStore.updateUserInfo({
    avatar: editForm.value.avatar,
    nickname: editForm.value.nickname,
    mobile: editForm.value.mobile,
    role: editForm.value.role,
    motto: editForm.value.motto,
    gender: editForm.value.gender,
    education: editForm.value.education,
    city: editForm.value.city,
    company: editForm.value.company
  })
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
  // 初始化读取登录态 & 用户信息
  userStore.loadFromCookie()
  if (userStore.token) {
    userStore.fetchUserInfo()
  }
})
</script>

<style scoped>
/* 全局页面样式 — 参考图风格 */
.profile-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  font-size: 14px;
  color: #333;
}
.container {
  width: 1040px;
  margin: 0 auto;
}
.profile-layout {
  display: flex;
  gap: 24px;
}

/* 左侧侧边栏 */
.sidebar {
  width: 260px;
  flex-shrink: 0;
}
.user-card {
  background: #fff;
  padding: 25px 20px;
  text-align: center;
  margin-bottom: 20px;
}

/* 头像框样式 */
.avatar-box {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto 10px;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.role-tag {
  position: absolute;
  top: -5px;
  right: -25px;
  background: #4CAF50;
  color: #fff;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
}

.username {
  font-size: 16px;
  font-weight: normal;
  margin: 0 0 6px;
}
.motto {
  color: #666;
  font-size: 13px;
  margin: 0 0 20px;
}
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn {
  height: 36px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}
.edit-btn {
  background: #4CAF50;
  color: #fff;
}
.edit-btn:hover {
  background: #388E3C;
}
.logout-btn {
  background: #4CAF50;
  color: #fff;
}
.logout-btn:hover {
  background: #388E3C;
}

/* 侧边导航 */
.side-nav {
  background: #fff;
  overflow: hidden;
}
.side-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-item {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  cursor: pointer;
  color: #666;
  transition: 0.2s;
}
.nav-item:hover {
  background: #f5f5f5;
}
.nav-item.active {
  background: #e8f5e9;
  color: #4CAF50;
  border-left: 3px solid #4CAF50;
}
.icon {
  font-size: 16px;
  margin-right: 10px;
}

/* 右侧主内容区 */
.main {
  flex: 1;
}
.breadcrumb {
  background: transparent;
  padding: 12px 0;
  color: #999;
  font-size: 12px;
}
.content-card {
  background: #fff;
  padding: 20px;
}
.card-title {
  font-size: 14px;
  font-weight: normal;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin: 0 0 20px 0;
}

/* 通用列表 */
.list-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #fafafa;
  border-radius: 4px;
}
.item-img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 15px;
}
.item-info {
  flex: 1;
}
.item-name {
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 4px;
}
.item-desc {
  color: #999;
  font-size: 13px;
}

/* 问答项 */
.q-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px;
  background: #fafafa;
  border-radius: 4px;
}
.q-left {
  flex: 1;
}
.q-title {
  font-size: 14px;
  margin-bottom: 6px;
}
.q-desc {
  color: #666;
  font-size: 13px;
}
.q-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
}
.q-status.ok {
  background: #e8f5e9;
  color: #4CAF50;
}
.q-status.wait {
  background: #fff7e6;
  color: #FF9800;
}

/* 考核项 */
.exam-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #fafafa;
  border-radius: 4px;
}
.exam-title {
  font-size: 14px;
  margin-bottom: 4px;
}
.exam-date {
  color: #999;
  font-size: 13px;
}
.score {
  font-size: 20px;
  font-weight: bold;
  color: #4CAF50;
  display: block;
  text-align: right;
}
.grade {
  font-size: 13px;
}
.grade.excellent {
  color: #4CAF50;
}
.grade.good {
  color: #FF9800;
}

/* 统计卡片 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.stat-item {
  text-align: center;
  padding: 20px;
  background: #fafafa;
  border-radius: 4px;
}
.stat-icon {
  font-size: 28px;
  margin-bottom: 10px;
}
.stat-num {
  font-size: 22px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 6px;
}
.stat-text {
  color: #999;
  font-size: 13px;
}

/* 编辑资料表单 */
.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.edit-avatar-wrap {
  position: relative;
}
.edit-avatar {
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.edit-role-tag {
  position: absolute;
  right: -10px;
  bottom: 5px;
  background: #4CAF50;
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
}
.file-input {
  display: none;
}

.form-row {
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #eee;
  padding: 0 10px;
  cursor: pointer;
  position: relative;
}
.form-row:hover {
  background: #fafafa;
}
.form-label {
  width: 80px;
  color: #666;
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