<template>
  <div class="settings-page">
    <div class="container">
      <div class="settings-content">
        <div class="page-header">
          <button class="back-btn" @click="navigateTo('/settings')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 class="page-title">{{ user?.mobile ? '更换手机' : '绑定手机' }}</h1>
        </div>

        <div class="form-card">
          <form @submit.prevent="handleSubmit">
            <div v-if="user?.mobile" class="form-group">
              <label class="form-label">当前手机</label>
              <div class="current-value">{{ maskMobile(user.mobile) }}</div>
            </div>

            <div class="form-group">
              <label class="form-label">新手机号</label>
              <input
                v-model="form.mobile"
                type="tel"
                class="form-input"
                placeholder="请输入新手机号"
                pattern="^1[3-9]\d{9}$"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">验证码</label>
              <div class="code-row">
                <input
                  v-model="form.code"
                  type="text"
                  class="form-input code-input"
                  placeholder="请输入验证码"
                  maxlength="6"
                  required
                />
                <button
                  type="button"
                  class="send-code-btn"
                  :disabled="countdown > 0"
                  @click="handleSendCode"
                >
                  {{ countdown > 0 ? `${countdown}s后重发` : '获取验证码' }}
                </button>
              </div>
            </div>

            <div class="form-tips">
              <p>温馨提示：</p>
              <ul>
                <li>更换手机后，原手机号将不再关联此账号</li>
                <li>请确保新手机号可以正常接收短信</li>
              </ul>
            </div>

            <button type="submit" class="submit-btn" :disabled="loading">
              {{ loading ? '提交中...' : '确认绑定' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuth()

const form = ref({
  mobile: '',
  code: '',
})

const loading = ref(false)
const countdown = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function maskMobile(mobile: string) {
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

function handleSendCode() {
  if (!/^1[3-9]\d{9}$/.test(form.value.mobile)) {
    alert('请输入正确的手机号')
    return
  }

  countdown.value = 60
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0 && timer) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)

  // 模拟发送验证码
  alert('验证码已发送')
}

function handleSubmit() {
  if (!form.value.code || form.value.code.length !== 6) {
    alert('请输入6位验证码')
    return
  }

  loading.value = true
  
  // 模拟API调用
  setTimeout(() => {
    loading.value = false
    alert('手机绑定成功')
    navigateTo('/settings')
  }, 1000)
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: var(--bg-body);
  padding: var(--spacing-xl) 0;
}

.settings-content {
  max-width: 600px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.back-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.back-btn:hover {
  background: var(--primary-light);
  color: var(--primary);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.form-card {
  background: var(--bg-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-xl);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.current-value {
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-secondary);
}

.form-input {
  width: 100%;
  height: 44px;
  padding: 0 var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  transition: border-color var(--transition-fast);
}

.form-input:focus {
  border-color: var(--primary);
}

.form-input::placeholder {
  color: var(--text-placeholder);
}

.code-row {
  display: flex;
  gap: var(--spacing-sm);
}

.code-input {
  flex: 1;
}

.send-code-btn {
  padding: 0 var(--spacing-md);
  min-width: 120px;
  height: 44px;
  background: var(--primary-light);
  color: var(--primary);
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.send-code-btn:hover:not(:disabled) {
  background: var(--primary);
  color: var(--bg-white);
}

.send-code-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-tips {
  background: var(--bg-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.form-tips p {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.form-tips ul {
  padding-left: var(--spacing-md);
}

.form-tips li {
  font-size: 12px;
  color: var(--text-tertiary);
  line-height: 1.8;
}

.submit-btn {
  width: 100%;
  height: 44px;
  background: var(--primary);
  color: var(--bg-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.submit-btn:hover:not(:disabled) {
  background: var(--primary-dark);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
