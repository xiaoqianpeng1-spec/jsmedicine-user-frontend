<template>
  <div class="login-page">
    <div class="background-decoration">
      <div class="decor-circle circle-1"></div>
      <div class="decor-circle circle-2"></div>
      <div class="decor-circle circle-3"></div>
      <div class="decor-circle circle-4"></div>
      <div class="decor-wave wave-1"></div>
      <div class="decor-wave wave-2"></div>
      <div class="decor-wave wave-3"></div>
      <div class="decor-wave wave-4"></div>
    </div>

    <div class="login-wrapper">
      <div class="left-section">
        <img src="/login-page.png" alt="中医医师" class="login-illustration" />
      </div>

      <div class="right-section">
        <div class="login-box">
          <div class="logo-section">
            <img src="/icon.png" alt="中医在线" class="logo-image" />
            <h1 class="title">中医在线</h1>
          </div>

          <div class="login-tabs">
            <button
              class="tab-btn"
              :class="{ active: loginType === 'phone' }"
              @click="loginType = 'phone'"
            >
              手机号登录
            </button>
            <span class="tab-divider">|</span>
            <button
              class="tab-btn"
              :class="{ active: loginType === 'password' }"
              @click="loginType = 'password'"
            >
              账号密码登录
            </button>
            <span class="tab-divider">|</span>
            <button
              class="tab-btn"
              :class="{ active: loginType === 'qrcode' }"
              @click="loginType = 'qrcode'"
            >
              二维码登录
            </button>
          </div>

          <!-- 手机号验证码登录 -->
          <div v-if="loginType === 'phone'" class="login-form">
            <div class="form-group">
              <div class="input-wrapper">
                <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input
                  v-model="form.mobile"
                  type="tel"
                  class="form-input"
                  placeholder="请输入手机号"
                  maxlength="11"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="input-wrapper">
                <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <input
                  v-model="form.code"
                  type="text"
                  class="form-input"
                  placeholder="请输入验证码"
                  maxlength="6"
                />
                <button
                  type="button"
                  class="sms-btn"
                  :disabled="smsDisabled"
                  @click="sendSms"
                >
                  {{ smsText }}
                </button>
              </div>
            </div>

            <button type="button" class="login-btn" :disabled="loading" @click="handleSmsLogin">
              <span v-if="loading">登录中...</span>
              <span v-else>登录</span>
            </button>
          </div>

          <!-- 账号密码登录 -->
          <div v-else-if="loginType === 'password'" class="login-form">
            <div class="form-group">
              <div class="input-wrapper">
                <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  v-model="form.username"
                  type="text"
                  class="form-input"
                  placeholder="请输入用户名/手机号"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="input-wrapper">
                <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-input"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            <button type="button" class="login-btn" :disabled="loading" @click="handlePasswordLogin">
              <span v-if="loading">登录中...</span>
              <span v-else>登录</span>
            </button>
          </div>

          <!-- 二维码登录 -->
          <div v-else class="qrcode-section">
            <div class="qrcode-wrapper">
              <img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20and%20white%20clean%20background&image_size=square" alt="登录二维码" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  ssr: false,
  layout: false
})

import { ref, computed } from 'vue'
import { useRouter } from '#imports'
import { useUserStore } from '~/stores/user'
import { authApi } from '~/utils/api/auth'

const router = useRouter()
const userStore = useUserStore()

const loginType = ref<'phone' | 'password' | 'qrcode'>('phone')
const loading = ref(false)
const smsCountdown = ref(0)

const form = ref({
  mobile: '',
  code: '',
  username: '',
  password: ''
})

const smsDisabled = computed(() => smsCountdown.value > 0 || !form.value.mobile || form.value.mobile.length !== 11)
const smsText = computed(() => {
  if (smsCountdown.value > 0) {
    return `${smsCountdown.value}s`
  }
  return '获取验证码'
})

const sendSms = async () => {
  if (process.server) return

  const phone = form.value.mobile.trim()
  if (!phone || phone.length !== 11) {
    alert('请输入正确的11位手机号')
    return
  }

  try {
    const data = await authApi.sendSmsCode(phone)

    if (data.success) {
      console.log('发送成功', data)
      alert('验证码发送成功！')

      smsCountdown.value = 60
      const timer = setInterval(() => {
        smsCountdown.value--
        if (smsCountdown.value <= 0) clearInterval(timer)
      }, 1000)
    } else {
      alert(data.message || '发送失败')
    }

  } catch (err: any) {
    console.error('发送失败：', err)
    alert('发送失败：' + (err.message || '服务异常'))
  }
}

// 短信登录
const handleSmsLogin = async () => {
  if (process.server) return
  if (!form.value.mobile || !form.value.code) {
    alert('请填写完整信息')
    return
  }

  loading.value = true

  try {
    const data: any = await authApi.smsLogin(form.value.mobile, form.value.code)

    if (data.success && data.data) {
      const { accessToken, user } = data.data
      await userStore.login(accessToken, user)
      router.push('/profile')
    } else {
      alert(data.message || '登录失败')
    }
  } catch (err: any) {
    alert(err.message || '登录失败')
  } finally {
    loading.value = false
  }
}

// 账号密码登录
const handlePasswordLogin = async () => {
  if (process.server) return
  if (!form.value.username || !form.value.password) {
    alert('请输入用户名和密码')
    return
  }

  loading.value = true

  try {
    console.log('[Login Attempt] Username:', form.value.username)
    console.log('[Login Attempt] Password:', form.value.password)
    
    const data: any = await authApi.login(form.value.username, form.value.password)

    console.log('[Login Response]', data)
    
    if (data.success && data.data) {
      const { accessToken, user } = data.data
      console.log('[Login Success] Token:', accessToken)
      console.log('[Login Success] User:', user)
      await userStore.login(accessToken, user)
      router.push('/profile')
    } else {
      console.log('[Login Failed] Message:', data.message)
      alert(data.message || '账号或密码错误')
    }
  } catch (err: any) {
    console.error('[Login Error]', err)
    alert(err.message || '账号或密码错误')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #86e8a0 0%, #43b05c 30%, #38a169 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.decor-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 25%;
}

.circle-2 {
  width: 80px;
  height: 80px;
  bottom: 15%;
  right: 20%;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 0;
  right: 0;
  background: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.2) 0px,
    rgba(255,255,255,0.2) 2px,
    transparent 2px,
    transparent 6px
  );
}

.circle-4 {
  width: 180px;
  height: 180px;
  bottom: 0;
  left: 0;
  background: repeating-linear-gradient(
    -45deg,
    rgba(255,255,255,0.2) 0px,
    rgba(255,255,255,0.2) 2px,
    transparent 2px,
    transparent 6px
  );
}

.decor-wave {
  position: absolute;
  width: 600px;
  height: 300px;
  background: transparent;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.wave-1 {
  top: 10%;
  left: 30%;
  transform: rotate(-20deg);
}

.wave-2 {
  bottom: 10%;
  right: 10%;
  transform: rotate(20deg);
}

.wave-3 {
  top: 40%;
  left: 0;
  transform: rotate(10deg);
}

.wave-4 {
  bottom: 40%;
  right: 0;
  transform: rotate(-10deg);
}

.login-wrapper {
  display: flex;
  width: 100%;
  max-width: 850px;
  min-height: 520px;
  position: relative;
  z-index: 1;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
}

.left-section {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #a5f3c3 0%, #43b05c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-illustration {
  width: 85%;
  height: auto;
  object-fit: contain;
}

.right-section {
  flex: 1;
  padding: 50px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.login-box {
  width: 100%;
  max-width: 300px;
}

.logo-section {
  text-align: center;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.logo-image {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #222;
  margin: 0;
}

.login-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
}

.tab-btn {
  padding: 8px 10px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  color: #43b05c;
  font-weight: 600;
}

.tab-divider {
  color: #ccc;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 16px;
  background: #f9f9f9;
  transition: all 0.3s;
}

.input-wrapper:focus-within {
  border-color: #43b05c;
  background: #fff;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #999;
}

.form-input {
  width: 100%;
  padding-left: 24px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
}

.form-input::placeholder {
  color: #aaa;
}

.sms-btn {
  position: absolute;
  right: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #43b05c;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.sms-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.login-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #43b05c 0%, #38a169 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #38a169 0%, #2d8a5a 100%);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.qrcode-section {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.qrcode-wrapper {
  width: 200px;
  height: 200px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.qrcode-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 768px) {
  .login-wrapper {
    flex-direction: column;
  }

  .left-section {
    display: none;
  }

  .right-section {
    padding: 30px 20px;
  }
}
</style>