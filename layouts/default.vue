<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="header-container">
        <div class="logo-section" @click="router.push('/home')">
          <img src="/icon.png" alt="江苏省中医药管理局" class="logo-image" />
          <span class="logo-text">中医在线</span>
        </div>
        
        <nav class="header-nav">
          <router-link 
            v-for="item in topNavItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: isActive(item.path) }"
          >
            {{ item.label }}
          </router-link>
        </nav>
        
        <div class="header-right">
          <router-link to="/profile" class="user-link">
            <img 
              :src="userAvatar" 
              alt="用户头像" 
              class="user-avatar"
            />
            <span class="user-name">{{ userName }}</span>
          </router-link>
        </div>
      </div>
    </header>
    
    <main class="app-main">
      <slot />
    </main>
    
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-info">
            <h4>联系我们</h4>
            <p>微信公众号: wz123545</p>
            <p>QQ: 1235345</p>
            <p>QQ: 1235345</p>
            <p>Email: 1235345@163.com</p>
          </div>
          <div class="footer-qrcodes">
            <div class="qrcode-item">
              <img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20white&image_size=square_hd" alt="关注公众号" />
              <span>关注公众号</span>
            </div>
            <div class="qrcode-item">
              <img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20white&image_size=square_hd" alt="小程序" />
              <span>江苏中医在线小程序</span>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <p>Copyright@2013********苏ICP备12345678号</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const topNavItems = [
  { path: '/home', label: '首页' },
  { path: '/articles', label: '资讯' },
  { path: '/topics', label: '专题' },
  { path: '/video', label: '视频' },
  { path: '/audio', label: '音频' },
  { path: '/books', label: '图书' },
  { path: '/consult', label: '咨询' },
  { path: '/exam', label: '考核' }
]

// 从用户store获取头像和用户名
const userAvatar = computed(() => {
  return userStore.userInfo.avatar || 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20avatar%20portrait%20simple&image_size=square'
})

const userName = computed(() => {
  return userStore.userInfo.nickname || userStore.userInfo.username || '用户'
})

const showTopNav = computed(() => {
  return !['/'].includes(route.path)
})

const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: #2D5A27;
}

.header-nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: #4CAF50;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.app-main {
  flex: 1;
}

.footer {
  background: #333;
  padding: 40px 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 30px;
  border-bottom: 1px solid #444;
}

.footer-info h4 {
  color: #fff;
  font-size: 18px;
  margin: 0 0 16px 0;
}

.footer-info p {
  color: #999;
  font-size: 14px;
  margin: 8px 0;
}

.footer-qrcodes {
  display: flex;
  gap: 40px;
}

.qrcode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-item img {
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
}

.qrcode-item span {
  color: #999;
  font-size: 12px;
}

.footer-copyright {
  text-align: center;
  padding-top: 20px;
}

.footer-copyright p {
  color: #666;
  font-size: 13px;
  margin: 0;
}

@media (max-width: 768px) {
  .header-nav {
    display: none;
  }
  
  .footer-content {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
}
</style>