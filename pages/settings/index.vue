<template>
  <div class="settings-page">
    <div class="container">
      <div class="settings-content">
        <h1 class="page-title">设置</h1>

        <div class="settings-group">
          <h3 class="group-title">账号设置</h3>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">修改密码</span>
              <span class="setting-desc">定期修改密码保护账号安全</span>
            </div>
            <button class="setting-btn" @click="navigateTo('/settings/password')">修改</button>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">绑定手机</span>
              <span class="setting-desc">{{ user?.mobile || '未绑定' }}</span>
            </div>
            <button class="setting-btn" @click="navigateTo('/settings/mobile')">
              {{ user?.mobile ? '更换' : '绑定' }}
            </button>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">绑定邮箱</span>
              <span class="setting-desc">{{ user?.email || '未绑定' }}</span>
            </div>
            <button class="setting-btn" @click="navigateTo('/settings/email')">
              {{ user?.email ? '更换' : '绑定' }}
            </button>
          </div>
        </div>

        <div class="settings-group">
          <h3 class="group-title">隐私设置</h3>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">学习记录</span>
              <span class="setting-desc">记录我的学习进度和时长</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.learningRecord" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">浏览历史</span>
              <span class="setting-desc">记录我的浏览历史</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.browseHistory" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="settings-group">
          <h3 class="group-title">通知设置</h3>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">课程更新通知</span>
              <span class="setting-desc">关注的课程有更新时通知我</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.courseNotification" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">咨询回复通知</span>
              <span class="setting-desc">专家回复我的咨询时通知我</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.consultNotification" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="settings-group danger-group">
          <h3 class="group-title">危险操作</h3>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">清除缓存</span>
              <span class="setting-desc">清除本地缓存数据</span>
            </div>
            <button class="setting-btn danger-btn" @click="handleClearCache">清除</button>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">注销账号</span>
              <span class="setting-desc">注销后数据将无法恢复</span>
            </div>
            <button class="setting-btn danger-btn" @click="handleDeleteAccount">注销</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuth()

const settings = ref({
  learningRecord: true,
  browseHistory: true,
  courseNotification: true,
  consultNotification: true,
})

function handleClearCache() {
  if (confirm('确定要清除缓存吗？')) {
    localStorage.clear()
    sessionStorage.clear()
    alert('缓存已清除')
  }
}

function handleDeleteAccount() {
  if (confirm('确定要注销账号吗？此操作不可恢复！')) {
    alert('注销功能开发中')
  }
}
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: var(--bg-body);
  padding: var(--spacing-xl) 0;
}

.settings-content {
  max-width: 700px;
  margin: 0 auto;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
}

.settings-group {
  background: var(--bg-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
  overflow: hidden;
}

.group-title {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--bg-light);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.setting-desc {
  font-size: 13px;
  color: var(--text-tertiary);
}

.setting-btn {
  padding: 8px 20px;
  background: var(--primary-light);
  color: var(--primary);
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.setting-btn:hover {
  background: var(--primary);
  color: var(--bg-white);
}

.danger-btn {
  background: #ffebee;
  color: #e53935;
}

.danger-btn:hover {
  background: #e53935;
  color: var(--bg-white);
}

.toggle-switch {
  position: relative;
  width: 48px;
  height: 26px;
  flex-shrink: 0;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--border-color);
  border-radius: 26px;
  transition: var(--transition-fast);
}

.toggle-slider::before {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background: var(--bg-white);
  border-radius: 50%;
  transition: var(--transition-fast);
}

.toggle-switch input:checked + .toggle-slider {
  background: var(--primary);
}

.toggle-switch input:checked + .toggle-slider::before {
  transform: translateX(22px);
}

.danger-group {
  border: 1px solid #ffcdd2;
}
</style>
