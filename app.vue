<template>
  <div class="app-container">
    <el-container>
      <el-header class="app-header">
        <div class="header-wrapper">
          <div class="header-logo">
            <NuxtLink to="/">
              <span class="logo-text">江苏中医在线</span>
            </NuxtLink>
          </div>
          <el-menu
            :default-active="activeMenu"
            mode="horizontal"
            :ellipsis="false"
            class="header-menu"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/articles">资讯</el-menu-item>
            <el-menu-item index="/topics">专题</el-menu-item>
            <el-menu-item index="/videos">视频</el-menu-item>
            <el-menu-item index="/audio">音频</el-menu-item>
            <el-menu-item index="/books">图书</el-menu-item>
            <el-menu-item index="/consult">咨询</el-menu-item>
            <el-menu-item index="/exam">考核</el-menu-item>
          </el-menu>
          <div class="header-user">
            <template v-if="user">
              <el-dropdown @command="handleCommand">
                <span class="user-info">
                  <el-avatar :size="32" :src="user.avatarUrl || ''">
                    {{ (user.nickname || user.username || '').charAt(0) }}
                  </el-avatar>
                  <span class="user-name">{{ user.nickname || user.username }}</span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                    <el-dropdown-item command="settings">设置</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template v-else>
              <el-button type="primary" @click="navigateTo('/login')">登录</el-button>
            </template>
          </div>
        </div>
      </el-header>
      <el-main class="app-main">
        <div class="main-wrapper">
          <NuxtPage />
        </div>
      </el-main>
      <el-footer class="app-footer">
        <div class="footer-wrapper">
          <p>&copy; 2024 江苏中医在线 版权所有</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { user, logout } = useAuth()

const activeMenu = computed(() => route.path)

function handleCommand(command: string) {
  switch (command) {
    case 'profile':
      navigateTo('/profile')
      break
    case 'settings':
      navigateTo('/settings')
      break
    case 'logout':
      logout()
      navigateTo('/login')
      break
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.app-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 0;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.header-logo {
  flex-shrink: 0;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #6dbf8e;
  text-decoration: none;
}

.header-menu {
  flex: 1;
  border: none;
  margin: 0 40px;
  min-width: 0;
}

.header-user {
  flex-shrink: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.user-name {
  font-size: 14px;
  color: #333;
}

.app-main {
  padding: 0;
}

.main-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
}

.app-footer {
  background-color: #fff;
  padding: 0;
  height: 80px;
  border-top: 1px solid #e4e7ed;
}

.footer-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
}

.footer-wrapper p {
  margin: 0;
  font-size: 14px;
  color: #909399;
}
</style>
