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
              <!-- 加载中 -->
              <div v-if="qrLoading" class="qrcode-loading">
                <div class="spinner"></div>
                <p>正在获取二维码...</p>
              </div>
              
              <!-- 错误状态 -->
              <div v-else-if="qrError" class="qrcode-error">
                <p>{{ qrError }}</p>
                <button @click="fetchQrConfig" class="retry-btn">重新获取</button>
              </div>
              
              <!-- 二维码内容 -->
      <div v-else class="qrcode-content">
        <div v-if="qrCodeUrl" class="qrcode-display">
          <a :href="qrCodeUrl" target="_blank" class="qrcode-link">
            <img 
              :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeUrl)}`" 
              alt="微信扫码登录"
              class="qrcode-image"
            />
          </a>
          <p class="qrcode-hint">点击二维码在新窗口打开微信登录</p>
        </div>
        
        <!-- 二维码状态提示 -->
        <div class="qrcode-status">
          <p v-if="scanStatus === 'waiting'" class="status-waiting">
            <span class="icon">📱</span>
            请使用微信扫描二维码登录
          </p>
          <p v-else-if="scanStatus === 'scanned'" class="status-scanned">
            <span class="icon">✅</span>
            已扫描，请在手机上确认登录
          </p>
          <p v-else-if="scanStatus === 'expired'" class="status-expired">
            <span class="icon">⏰</span>
            二维码已过期
            <button @click="fetchQrConfig" class="refresh-btn">刷新二维码</button>
          </p>
        </div>
        
        <!-- 倒计时 -->
        <div class="qrcode-timer" v-if="scanStatus === 'waiting' && qrExpiresIn > 0">
          <span>有效期：</span>
          <span class="timer-value">{{ formatTime(qrExpiresIn) }}</span>
        </div>
      </div>
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

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from '#imports'
import { useUserStore } from '~/stores/user'
import { authApi } from '~/utils/api/auth'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loginType = ref<'phone' | 'password' | 'qrcode'>('phone')
const loading = ref(false)
const smsCountdown = ref(0)

// 二维码登录相关状态
const qrLoading = ref(false)
const qrError = ref('')
const qrConfig = ref<any>(null)
const qrCodeUrl = ref('')
const qrExpiresIn = ref(0)
const scanStatus = ref<'waiting' | 'scanned' | 'expired'>('waiting')
const qrPollTimer = ref<NodeJS.Timeout | null>(null)
const qrExpireTimer = ref<NodeJS.Timeout | null>(null)

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

// 格式化时间
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 停止轮询
const stopPollTimer = () => {
  if (qrPollTimer.value) {
    clearInterval(qrPollTimer.value)
    qrPollTimer.value = null
  }
}

// 开始过期倒计时
const startExpireTimer = () => {
  if (qrExpireTimer.value) {
    clearInterval(qrExpireTimer.value)
  }
  qrExpireTimer.value = setInterval(() => {
    qrExpiresIn.value--
    if (qrExpiresIn.value <= 0) {
      if (qrExpireTimer.value) {
        clearInterval(qrExpireTimer.value)
      }
      scanStatus.value = 'expired'
    }
  }, 1000)
}

// 开始轮询检查回调
const startPollTimer = () => {
  stopPollTimer()
  qrPollTimer.value = setInterval(() => {
    // 检查 URL 中是否有微信回调参数
    const query = route.query
    if (query.code && query.state) {
      handleWechatCallback(query.code as string, query.state as string)
    }
  }, 1000)
}

// 获取二维码配置
const fetchQrConfig = async () => {
  if (process.server) return
  
  qrLoading.value = true
  qrError.value = ''
  scanStatus.value = 'waiting'

  // 清除之前的定时器
  stopPollTimer()
  if (qrExpireTimer.value) {
    clearInterval(qrExpireTimer.value)
  }

  try {
    const data: any = await authApi.getWechatWebQrConfig()
    
    if (data.success && data.data) {
      qrConfig.value = data.data
      qrExpiresIn.value = data.data.expiresIn || 300
      
      // 构建微信登录二维码 URL
      qrCodeUrl.value = `https://open.weixin.qq.com/connect/qrconnect?appid=${data.data.appId}&redirect_uri=${encodeURIComponent(data.data.redirectUri)}&response_type=code&scope=${data.data.scope}&state=${data.data.state}#wechat_redirect`
      
      startExpireTimer()
      startPollTimer()
    } else {
      qrError.value = data.message || '获取二维码配置失败'
    }
  } catch (err: any) {
    qrError.value = err.message || '网络错误，请稍后重试'
  } finally {
    qrLoading.value = false
  }
}

// 处理微信回调
const handleWechatCallback = async (code: string, state: string) => {
  stopPollTimer()
  if (qrExpireTimer.value) {
    clearInterval(qrExpireTimer.value)
  }

  loading.value = true
  scanStatus.value = 'scanned'

  try {
    const data: any = await authApi.wechatWebLogin(code, state)
    
    if (data.success && data.data) {
      const { accessToken, user, needBindMobile, bindToken } = data.data
      
      // 保存登录信息
      await userStore.login(accessToken, user)
      
      if (needBindMobile && bindToken) {
        // 需要绑定手机号，跳转到绑定页面
        router.push({
          path: '/settings/mobile',
          query: { bindToken }
        })
      } else {
        // 登录成功，跳转到个人中心
        router.push('/profile')
      }
    } else {
      qrError.value = data.message || '登录失败'
      scanStatus.value = 'waiting'
      fetchQrConfig()
    }
  } catch (err: any) {
    qrError.value = err.message || '登录失败，请重试'
    scanStatus.value = 'waiting'
    fetchQrConfig()
  } finally {
    loading.value = false
  }
}

// 监听登录类型切换
watch(loginType, (newType) => {
  if (newType === 'qrcode') {
    fetchQrConfig()
  } else {
    // 切换到其他登录方式时，清除二维码相关状态
    stopPollTimer()
    if (qrExpireTimer.value) {
      clearInterval(qrExpireTimer.value)
    }
  }
})

// 组件挂载时检查是否已有回调参数
onMounted(() => {
  const query = route.query
  if (query.code && query.state) {
    loginType.value = 'qrcode'
    handleWechatCallback(query.code as string, query.state as string)
  }
})

// 组件卸载时清除定时器
onUnmounted(() => {
  stopPollTimer()
  if (qrExpireTimer.value) {
    clearInterval(qrExpireTimer.value)
  }
})
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

.qrcode-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.qrcode-link {
  display: block;
  text-decoration: none;
}

.qrcode-image {
  width: 200px;
  height: 200px;
  display: block;
}

.qrcode-hint {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.qrcode-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #43b05c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.qrcode-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  text-align: center;
  padding: 20px;
}

.qrcode-error p {
  color: #666;
  margin: 0;
}

.retry-btn, .refresh-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  background: #43b05c;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-btn:hover, .refresh-btn:hover {
  background: #38a169;
}

.qrcode-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 10px;
}

.qrcode-status {
  text-align: center;
  width: 100%;
}

.qrcode-status p {
  margin: 0;
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-direction: column;
}

.qrcode-status .icon {
  font-size: 24px;
}

.status-scanned {
  color: #43b05c !important;
}

.status-expired {
  color: #e53e3e !important;
}

.qrcode-timer {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
}

.timer-value {
  color: #43b05c;
  font-weight: 600;
  font-family: monospace;
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