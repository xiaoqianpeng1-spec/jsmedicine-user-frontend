<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo">
        <NuxtLink to="/">中医在线</NuxtLink>
      </div>
      <nav class="main-nav">
        <NuxtLink to="/" class="nav-item" active-class="active">首页</NuxtLink>
        <NuxtLink to="/articles" class="nav-item" active-class="active">资讯</NuxtLink>
        <NuxtLink to="/topics" class="nav-item" active-class="active">专题</NuxtLink>
        <NuxtLink to="/videos" class="nav-item" active-class="active">视频</NuxtLink>
        <NuxtLink to="/audio" class="nav-item" active-class="active">音频</NuxtLink>
        <NuxtLink to="/knowledge" class="nav-item" active-class="active">图书</NuxtLink>
        <NuxtLink to="/consult" class="nav-item" active-class="active">咨询</NuxtLink>
        <NuxtLink to="/exam" class="nav-item" active-class="active">考核</NuxtLink>
      </nav>
      <div class="header-actions">
        <NuxtLink v-if="!isLoggedIn" to="/login" class="btn-login">登录</NuxtLink>
        <div v-else class="user-menu">
          <NuxtLink to="/profile">{{ user?.nickname || '用户' }}</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { isLoggedIn, user } = useAuth()
</script>

<style scoped>
.app-header {
  background: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 20px;
  font-weight: 600;
  color: #4a9e6e;
}

.logo a:hover {
  color: #3d8b5e;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  padding: 8px 16px;
  font-size: 14px;
  color: #666666;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-item:hover {
  color: #4a9e6e;
  background: #f0f9f4;
}

.nav-item.active {
  color: #4a9e6e;
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
}

.btn-login {
  padding: 6px 20px;
  font-size: 14px;
  color: #4a9e6e;
  border: 1px solid #4a9e6e;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-login:hover {
  background: #4a9e6e;
  color: #ffffff;
}

.user-menu a {
  font-size: 14px;
  color: #666666;
}

.user-menu a:hover {
  color: #4a9e6e;
}
</style>
