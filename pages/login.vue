<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1 class="login-title">欢迎登录</h1>
        <p class="login-subtitle">中医在线学习平台</p>
      </div>

      <div class="login-tabs">
        <button :class="['tab-btn', { active: loginType === 'account' }]" @click="loginType = 'account'">账号登录</button>
        <button :class="['tab-btn', { active: loginType === 'sms' }]" @click="loginType = 'sms'">手机登录</button>
      </div>

      <form v-if="loginType === 'account'" class="login-form" @submit.prevent="handleAccountLogin">
        <div class="form-group">
          <label class="form-label">用户名</label>
          <input v-model="accountForm.username" type="text" placeholder="请输入用户名" class="form-input" required />
        </div>
        <div class="form-group">
          <label class="form-label">密码</label>
          <input v-model="accountForm.password" type="password" placeholder="请输入密码" class="form-input" required />
        </div>
        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <form v-else class="login-form" @submit.prevent="handleSmsLogin">
        <div class="form-group">
          <label class="form-label">手机号</label>
          <input v-model="smsForm.mobile" type="tel" placeholder="请输入手机号" class="form-input" required />
        </div>
        <div class="form-group">
          <label class="form-label">验证码</label>
          <div class="code-input-group">
            <input v-model="smsForm.code" type="text" placeholder="请输入验证码" class="form-input code-input" required />
            <button type="button" class="btn-send-code" :disabled="countdown > 0" @click="sendSmsCode">
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </button>
          </div>
        </div>
        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="login-footer">
        <p>还没有账号？<NuxtLink to="/register" class="link-register">立即注册</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { loginWithCredentials, loginWithSms } = useAuth()

const loginType = ref<'account' | 'sms'>('account')
const loading = ref(false)
const countdown = ref(0)

const accountForm = ref({
  username: '',
  password: '',
})

const smsForm = ref({
  mobile: '',
  code: '',
})

async function handleAccountLogin() {
  loading.value = true
  try {
    await loginWithCredentials(accountForm.value.username, accountForm.value.password)
    navigateTo('/')
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}

async function handleSmsLogin() {
  loading.value = true
  try {
    await loginWithSms(smsForm.value.mobile, smsForm.value.code)
    navigateTo('/')
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}

async function sendSmsCode() {
  if (!smsForm.value.mobile) return
  try {
    const { sendSmsCode: apiSendSmsCode } = await import('~/api')
    await apiSendSmsCode({ mobile: smsForm.value.mobile })
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) clearInterval(timer)
    }, 1000)
  } catch (error) {
    console.error('发送验证码失败:', error)
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a8e6cf 0%, #7dd4a0 50%, #6dbf8e 100%);
  padding: var(--spacing-lg);
}

.login-container {
  width: 100%;
  max-width: 420px;
  background: var(--bg-white);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xxl);
  box-shadow: var(--shadow-lg);
}

.login-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.login-subtitle {
  font-size: 14px;
  color: var(--text-tertiary);
}

.login-tabs {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  flex: 1;
  padding: var(--spacing-md) 0;
  font-size: 16px;
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color var(--transition-fast);
}

.tab-btn.active {
  color: var(--primary);
  font-weight: 500;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input {
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  outline: none;
  transition: border-color var(--transition-fast);
}

.form-input:focus {
  border-color: var(--primary);
}

.code-input-group {
  display: flex;
  gap: var(--spacing-sm);
}

.code-input {
  flex: 1;
}

.btn-send-code {
  padding: 0 16px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: var(--radius-md);
  font-size: 13px;
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.btn-send-code:hover:not(:disabled) {
  background: var(--primary);
  color: var(--bg-white);
}

.btn-send-code:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-login {
  padding: 14px;
  background: var(--primary);
  color: var(--bg-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.btn-login:hover:not(:disabled) {
  background: var(--primary-dark);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  margin-top: var(--spacing-xl);
  font-size: 14px;
  color: var(--text-secondary);
}

.link-register {
  color: var(--primary);
  font-weight: 500;
}

.link-register:hover {
  color: var(--primary-dark);
}
</style>
