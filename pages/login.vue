<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-illustration">
        <div class="illustration-content">
          <h1>江苏中医在线</h1>
          <p>专业的中医在线学习平台</p>
        </div>
      </div>
      <div class="login-form-wrapper">
        <el-tabs v-model="loginType" class="login-tabs">
          <el-tab-pane label="账号登录" name="account">
            <el-form :model="accountForm" @submit.prevent="handleAccountLogin" class="login-form">
              <el-form-item>
                <el-input
                  v-model="accountForm.username"
                  placeholder="请输入用户名"
                  prefix-icon="User"
                  size="large"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="accountForm.password"
                  type="password"
                  placeholder="请输入密码"
                  prefix-icon="Lock"
                  size="large"
                  show-password
                  @keyup.enter="handleAccountLogin"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="large"
                  class="submit-button"
                  :loading="loading"
                  @click="handleAccountLogin"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机登录" name="sms">
            <el-form :model="smsForm" @submit.prevent="handleSmsLogin" class="login-form">
              <el-form-item>
                <el-input
                  v-model="smsForm.mobile"
                  placeholder="请输入手机号"
                  prefix-icon="Phone"
                  size="large"
                />
              </el-form-item>
              <el-form-item>
                <div class="code-input-group">
                  <el-input
                    v-model="smsForm.code"
                    placeholder="请输入验证码"
                    prefix-icon="Key"
                    size="large"
                    @keyup.enter="handleSmsLogin"
                  />
                  <el-button
                    :disabled="countdown > 0"
                    @click="sendSmsCode"
                    size="large"
                    class="send-code-button"
                  >
                    {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="large"
                  class="submit-button"
                  :loading="loading"
                  @click="handleSmsLogin"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div class="login-footer">
          <span>还没有账号？</span>
          <el-link type="primary">立即注册</el-link>
        </div>
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

const handleAccountLogin = async () => {
  if (!accountForm.value.username || !accountForm.value.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    await loginWithCredentials(accountForm.value.username, accountForm.value.password)
    ElMessage.success('登录成功')
    navigateTo('/')
  } catch (error: any) {
    ElMessage.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const handleSmsLogin = async () => {
  if (!smsForm.value.mobile || !smsForm.value.code) {
    ElMessage.warning('请输入手机号和验证码')
    return
  }

  loading.value = true
  try {
    await loginWithSms(smsForm.value.mobile, smsForm.value.code)
    ElMessage.success('登录成功')
    navigateTo('/')
  } catch (error: any) {
    ElMessage.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const sendSmsCode = async () => {
  if (!smsForm.value.mobile) {
    ElMessage.warning('请输入手机号')
    return
  }

  try {
    const { sendSmsCode: apiSendSmsCode } = await import('~/api')
    await apiSendSmsCode({ mobile: smsForm.value.mobile })
    ElMessage.success('验证码已发送')

    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error: any) {
    ElMessage.error(error.message || '发送验证码失败')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8e6cf 0%, #7dd4a0 50%, #6dbf8e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-page::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
  animation: float 20s infinite linear;
}

@keyframes float {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-card {
  width: 100%;
  max-width: 900px;
  min-height: 500px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.login-illustration {
  width: 50%;
  background: linear-gradient(135deg, #a8e6cf 0%, #7dd4a0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.login-illustration::before {
  content: '';
  position: absolute;
  right: -50px;
  top: 0;
  bottom: 0;
  width: 100px;
  background: #ffffff;
  border-radius: 50% 0 0 50%;
}

.illustration-content {
  text-align: center;
  color: #ffffff;
  padding: 40px;
}

.illustration-content h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
}

.illustration-content p {
  font-size: 16px;
  opacity: 0.9;
}

.login-form-wrapper {
  width: 50%;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
}

.login-tabs {
  margin-bottom: 30px;
}

.login-tabs :deep(.el-tabs__header) {
  margin-bottom: 30px;
}

.login-form {
  width: 100%;
}

.submit-button {
  width: 100%;
  margin-top: 10px;
}

.code-input-group {
  display: flex;
  gap: 12px;
}

.code-input-group :deep(.el-input) {
  flex: 1;
}

.send-code-button {
  white-space: nowrap;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666666;
}

.login-footer span {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    max-width: 400px;
  }

  .login-illustration {
    width: 100%;
    padding: 30px 20px;
  }

  .login-illustration::before {
    display: none;
  }

  .illustration-content {
    padding: 0;
  }

  .illustration-content h1 {
    font-size: 24px;
  }

  .login-form-wrapper {
    width: 100%;
    padding: 30px 20px;
  }
}
</style>
