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
          <h1 class="page-title">修改密码</h1>
        </div>

        <div class="form-card">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label class="form-label">当前密码</label>
              <input
                v-model="form.oldPassword"
                type="password"
                class="form-input"
                placeholder="请输入当前密码"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">新密码</label>
              <input
                v-model="form.newPassword"
                type="password"
                class="form-input"
                placeholder="请输入新密码（至少6位）"
                minlength="6"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">确认新密码</label>
              <input
                v-model="form.confirmPassword"
                type="password"
                class="form-input"
                placeholder="请再次输入新密码"
                required
              />
            </div>

            <div class="form-tips">
              <p>密码要求：</p>
              <ul>
                <li>长度至少6位</li>
                <li>建议包含字母和数字</li>
              </ul>
            </div>

            <button type="submit" class="submit-btn" :disabled="loading">
              {{ loading ? '提交中...' : '确认修改' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const loading = ref(false)

function handleSubmit() {
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert('两次输入的新密码不一致')
    return
  }

  if (form.value.newPassword.length < 6) {
    alert('密码长度至少6位')
    return
  }

  loading.value = true
  
  // 模拟API调用
  setTimeout(() => {
    loading.value = false
    alert('密码修改成功')
    navigateTo('/settings')
  }, 1000)
}
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
