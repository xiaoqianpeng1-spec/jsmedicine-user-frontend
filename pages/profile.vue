<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-content">
        <div class="profile-header">
          <div class="profile-avatar">
            <img :src="user?.avatarUrl || '/default-avatar.png'" alt="头像" />
          </div>
          <div class="profile-info">
            <h2 class="profile-name">{{ user?.nickname || user?.username || '未设置昵称' }}</h2>
            <p class="profile-username">@{{ user?.username }}</p>
            <p class="profile-mobile">{{ user?.mobile || '未绑定手机' }}</p>
          </div>
        </div>

        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-value">{{ studyHours }}</span>
            <span class="stat-label">学习时长</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ completedCourses }}</span>
            <span class="stat-label">完成课程</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ examCount }}</span>
            <span class="stat-label">考试次数</span>
          </div>
        </div>

        <div class="profile-menu">
          <div class="menu-group">
            <h3 class="menu-group-title">学习中心</h3>
            <NuxtLink to="/favorites" class="menu-item">
              <span class="menu-icon">⭐</span>
              <span class="menu-text">我的收藏</span>
              <span class="menu-arrow">›</span>
            </NuxtLink>
            <NuxtLink to="/exam" class="menu-item">
              <span class="menu-icon">📝</span>
              <span class="menu-text">考试记录</span>
              <span class="menu-arrow">›</span>
            </NuxtLink>
            <NuxtLink to="/settings" class="menu-item">
              <span class="menu-icon">⚙️</span>
              <span class="menu-text">设置</span>
              <span class="menu-arrow">›</span>
            </NuxtLink>
          </div>

          <div class="menu-group">
            <h3 class="menu-group-title">账号管理</h3>
            <NuxtLink to="/certify" class="menu-item">
              <span class="menu-icon"></span>
              <span class="menu-text">实名认证</span>
              <span class="menu-arrow">›</span>
            </NuxtLink>
            <button class="menu-item logout-btn" @click="handleLogout">
              <span class="menu-icon">🚪</span>
              <span class="menu-text">退出登录</span>
              <span class="menu-arrow">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()

const studyHours = ref(0)
const completedCourses = ref(0)
const examCount = ref(0)

async function handleLogout() {
  await logout()
}

async function fetchProfileSummary() {
  try {
    const { getProfileSummary } = await import('~/api')
    const result = await getProfileSummary()
    studyHours.value = result.studyHours || 0
    completedCourses.value = result.completedCourses || 0
    examCount.value = result.examCount || 0
  } catch (error) {
    console.error('获取用户统计失败:', error)
  }
}

onMounted(async () => {
  if (!user.value) {
    navigateTo('/login')
    return
  }
  await fetchProfileSummary()
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--bg-body);
  padding: var(--spacing-xl) 0;
}

.profile-content {
  max-width: 600px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  background: var(--bg-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.profile-username {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-xs);
}

.profile-mobile {
  font-size: 13px;
  color: var(--text-secondary);
}

.profile-stats {
  display: flex;
  background: var(--bg-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
  overflow: hidden;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-lg);
  border-right: 1px solid var(--border-light);
}

.stat-item:last-child {
  border-right: none;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: 13px;
  color: var(--text-tertiary);
}

.profile-menu {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.menu-group {
  background: var(--bg-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.menu-group-title {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--bg-light);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
  transition: background var(--transition-fast);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: var(--bg-light);
}

.menu-icon {
  font-size: 20px;
}

.menu-text {
  flex: 1;
  font-size: 15px;
  color: var(--text-primary);
}

.menu-arrow {
  font-size: 20px;
  color: var(--text-tertiary);
}

.logout-btn {
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.logout-btn .menu-text {
  color: #e53935;
}
</style>
