<template>
  <div class="profile-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button class="retry-btn" @click="fetchProfile">重试</button>
    </div>

    <div v-else class="container">
      <div class="profile-layout">
        <!-- 左侧侧边栏 -->
        <aside class="sidebar">
          <div class="user-card">
            <!-- 头像 + 角色标签 -->
            <div class="avatar-box">
              <img :src="displayInfo.avatar" alt="头像" class="avatar" />
              <span class="role-tag">{{ displayInfo.role }}</span>
            </div>
            <h2 class="username">{{ displayInfo.nickname }}</h2>
            <p class="motto">{{ displayInfo.motto }}</p>
            <div class="btn-group">
              <button class="btn edit-btn" @click="goEdit">编辑资料</button>
              <button class="btn logout-btn" @click="handleLogout">退出登录</button>
            </div>
          </div>

          <nav class="side-nav">
            <ul>
              <li 
                v-for="item in navList" 
                :key="item.id"
                class="nav-item"
                :class="{ active: activeMenu === item.id }"
                @click="activeMenu = item.id"
              >
                <span class="icon-wrap" :class="item.icon"></span>
                <span class="text">{{ item.label }}</span>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- 右侧主内容区 -->
        <main class="main">
          <div class="breadcrumb">
            <span>您的位置：首页 > 个人中心</span>
          </div>

          <!-- 我的收藏 -->
          <div v-if="activeMenu === 'collect'" class="content-card">
            <div class="card-title">我的收藏</div>
            
            <!-- 加载状态 -->
            <div v-if="favoritesLoading" class="loading-state small">
              <div class="spinner"></div>
              <p>加载中...</p>
            </div>

            <!-- 错误状态 -->
            <div v-else-if="favoritesError" class="error-state small">
              <p>{{ favoritesError }}</p>
              <button class="retry-btn" @click="fetchFavorites">重试</button>
            </div>

            <!-- 空状态 -->
            <div v-else-if="collectList.length === 0" class="empty-state">
              <div class="empty-icon">☆</div>
              <p>暂无收藏内容</p>
            </div>

            <!-- 收藏列表 -->
            <div v-else class="list-wrap">
              <div class="list-item clickable" v-for="item in collectList" :key="item.id" @click="goToFavoriteDetail(item)">
                <div class="item-info">
                  <div class="item-name">{{ item.source || '未知资源' }}</div>
                  <div class="item-desc">
                    <span class="resource-type-badge">{{ getResourceTypeLabel(item.resourceType) }}</span>
                    <span class="divider">|</span>
                    <span>浏览: {{ item.viewCount }}次</span>
                    <span class="divider">|</span>
                    <span>{{ formatTime(item.occurredAt) }}</span>
                  </div>
                </div>
                <div class="item-actions">
                  <button class="view-btn" @click.stop="goToFavoriteDetail(item)">查看</button>
                </div>
              </div>
              
              <!-- 分页 -->
              <div v-if="favoritesPage && favoritesPage.total > favoritesPage.size" class="pagination">
                <button 
                  class="page-btn" 
                  :disabled="favoritesPage.page <= 1" 
                  @click="fetchFavorites(favoritesPage.page - 1, favoritesPage.size)"
                >上一页</button>
                <span class="page-info">第 {{ favoritesPage.page }} 页 / 共 {{ Math.ceil(favoritesPage.total / favoritesPage.size) }} 页</span>
                <button 
                  class="page-btn" 
                  :disabled="favoritesPage.page >= Math.ceil(favoritesPage.total / favoritesPage.size)" 
                  @click="fetchFavorites(favoritesPage.page + 1, favoritesPage.size)"
                >下一页</button>
              </div>
            </div>
          </div>

          <!-- 浏览记录 -->
          <div v-else-if="activeMenu === 'history'" class="content-card">
            <div class="card-title">浏览记录</div>
            
            <!-- 加载状态 -->
            <div v-if="historyLoading" class="loading-state small">
              <div class="spinner"></div>
              <p>加载中...</p>
            </div>

            <!-- 错误状态 -->
            <div v-else-if="historyError" class="error-state small">
              <p>{{ historyError }}</p>
              <button class="retry-btn" @click="fetchHistory">重试</button>
            </div>

            <!-- 空状态 -->
            <div v-else-if="historyList.length === 0" class="empty-state">
              <div class="empty-icon">👁️</div>
              <p>暂无浏览记录</p>
            </div>

            <!-- 浏览记录列表 -->
            <div v-else class="list-wrap">
              <div class="list-item clickable" v-for="item in historyList" :key="item.id" @click="goToHistoryDetail(item)">
                <div class="item-info">
                  <div class="item-name">{{ item.source || '未知资源' }}</div>
                  <div class="item-desc">
                    <span class="resource-type-badge">{{ getResourceTypeLabel(item.resourceType) }}</span>
                    <span class="divider">|</span>
                    <span>浏览: {{ item.viewCount }}次</span>
                    <span class="divider">|</span>
                    <span>{{ formatTime(item.occurredAt) }}</span>
                  </div>
                </div>
                <div class="item-actions">
                  <button class="view-btn" @click.stop="goToHistoryDetail(item)">查看</button>
                </div>
              </div>
              
              <!-- 分页 -->
              <div v-if="historyPage && historyPage.total > historyPage.size" class="pagination">
                <button 
                  class="page-btn" 
                  :disabled="historyPage.page <= 1" 
                  @click="fetchHistory(historyPage.page - 1, historyPage.size)"
                >上一页</button>
                <span class="page-info">第 {{ historyPage.page }} 页 / 共 {{ Math.ceil(historyPage.total / historyPage.size) }} 页</span>
                <button 
                  class="page-btn" 
                  :disabled="historyPage.page >= Math.ceil(historyPage.total / historyPage.size)" 
                  @click="fetchHistory(historyPage.page + 1, historyPage.size)"
                >下一页</button>
              </div>
            </div>
          </div>

          <!-- 我的问答 -->
          <div v-else-if="activeMenu === 'question'" class="content-card">
            <div class="card-title">我的问答</div>
            
            <!-- 加载状态 -->
            <div v-if="questionsLoading" class="loading-state small">
              <p>加载中...</p>
            </div>

            <!-- 错误状态 -->
            <div v-else-if="questionsError" class="error-state small">
              <p>{{ questionsError }}</p>
              <button class="retry-btn" @click="fetchQuestions">重试</button>
            </div>

            <!-- 空状态 -->
            <div v-else-if="questionList.length === 0" class="empty-state">
              <div class="empty-icon">💬</div>
              <p>暂无问答记录</p>
              <button class="empty-btn" @click="goToConsult">去咨询专家</button>
            </div>

            <div v-else class="list-wrap">
              <div class="q-item" v-for="item in questionList" :key="item.id">
                <div class="q-left" @click="goToQaDetail(item)">
                  <div class="q-title">{{ item.title }}</div>
                  <div class="q-desc">{{ truncateText(item.content, 50) }}</div>
                </div>
                <span class="q-status" :class="getQuestionStatusClass(item.status)">{{ getQuestionStatusLabel(item.status) }}</span>
              </div>
            </div>
          </div>

          <!-- 我的考核 -->
          <div v-else-if="activeMenu === 'exam'" class="content-card">
            <div class="card-title">我的考核</div>
            
            <!-- 加载状态 -->
            <div v-if="examLoading" class="loading-state small">
              <div class="spinner"></div>
              <p>加载中...</p>
            </div>

            <!-- 错误状态 -->
            <div v-else-if="examError" class="error-state small">
              <p>{{ examError }}</p>
              <button class="retry-btn" @click="fetchExamRecords">重试</button>
            </div>

            <!-- 空状态 -->
            <div v-else-if="examList.length === 0" class="empty-state">
              <div class="empty-icon">📝</div>
              <p>暂无考核记录</p>
              <button class="empty-btn" @click="goToExam">去参加考核</button>
            </div>

            <!-- 考核列表 -->
            <div v-else class="list-wrap">
              <div class="exam-item clickable" v-for="item in examList" :key="item.id" @click="goToExamDetail(item)">
                <div class="exam-left">
                  <div class="exam-title">{{ item.paperName }}</div>
                  <div class="exam-date">{{ formatTime(item.startedAt) }}</div>
                </div>
                <div class="exam-right">
                  <span class="score" v-if="item.score !== null">{{ item.score }}分</span>
                  <span class="grade" :class="getExamStatusClass(item.status)">{{ getExamStatusLabel(item.status) }}</span>
                </div>
              </div>
              
              <!-- 分页 -->
              <div v-if="examPage && examPage.total > examPage.size" class="pagination">
                <button 
                  class="page-btn" 
                  :disabled="examPage.page <= 1" 
                  @click="fetchExamRecords(examPage.page - 1, examPage.size)"
                >上一页</button>
                <span class="page-info">第 {{ examPage.page }} 页 / 共 {{ Math.ceil(examPage.total / examPage.size) }} 页</span>
                <button 
                  class="page-btn" 
                  :disabled="examPage.page >= Math.ceil(examPage.total / examPage.size)" 
                  @click="fetchExamRecords(examPage.page + 1, examPage.size)"
                >下一页</button>
              </div>
            </div>
          </div>

          <!-- 学习统计 -->
          <div v-else-if="activeMenu === 'stat'" class="content-card">
            <div class="card-title">学习统计</div>
            <div class="stat-grid">
              <div class="stat-item" v-for="item in statList" :key="item.id">
                <span class="stat-icon">{{ item.icon }}</span>
                <div class="stat-num">{{ item.value }}</div>
                <div class="stat-text">{{ item.label }}</div>
              </div>
            </div>
          </div>

          <!-- 学员认证 -->
          <div v-else-if="activeMenu === 'certification'" class="content-card certification-card">
            <div class="card-title">学员认证</div>
            
            <!-- 加载状态 -->
            <div v-if="certificationLoading" class="loading-state small">
              <div class="spinner"></div>
              <p>加载中...</p>
            </div>

            <template v-else>
              <!-- 当前认证状态 -->
              <div class="cert-status-box">
                <span class="cert-status-label">当前状态：</span>
                <span class="cert-status-tag" :class="typeof editForm.certificationStatus === 'string' ? editForm.certificationStatus.toLowerCase() : ''">
                  {{ certificationStatusLabel }}
                </span>
              </div>

              <!-- 拒绝原因 -->
              <div v-if="certificationResult?.rejectReason && editForm.certificationStatus === 'REJECTED'" class="reject-reason">
                <span class="reject-label">拒绝原因：</span>
                <span class="reject-text">{{ certificationResult.rejectReason }}</span>
              </div>

              <!-- 认证结果详情 -->
              <div v-if="certificationResult && (editForm.certificationStatus === 'PENDING' || editForm.certificationStatus === 'APPROVED')" class="cert-result">
                <h4 class="section-title">认证信息</h4>
                
                <div class="result-grid">
                  <div class="result-item">
                    <span class="result-label">学员编号</span>
                    <span class="result-value">{{ certificationResult.studentNo || '暂无' }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-label">真实姓名</span>
                    <span class="result-value">{{ certificationResult.realName || '暂无' }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-label">手机号码</span>
                    <span class="result-value">{{ certificationResult.mobile || '暂无' }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-label">所在地区</span>
                    <span class="result-value">{{ certificationResult.province }} {{ certificationResult.city }} {{ certificationResult.district }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-label">工作单位</span>
                    <span class="result-value">{{ certificationResult.organization || '暂无' }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-label">职位职称</span>
                    <span class="result-value">{{ certificationResult.positionTitle || '暂无' }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-label">学员状态</span>
                    <span class="result-value">{{ certificationResult.status === 'ENABLED' ? '启用' : '禁用' }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-label">提交时间</span>
                    <span class="result-value">{{ certificationResult.certificationSubmittedAt || '暂无' }}</span>
                  </div>
                  <div class="result-item" v-if="certificationResult.certificationReviewedAt">
                    <span class="result-label">审核时间</span>
                    <span class="result-value">{{ certificationResult.certificationReviewedAt }}</span>
                  </div>
                  <div class="result-item" v-if="certificationResult.enrolledAt">
                    <span class="result-label">入学时间</span>
                    <span class="result-value">{{ certificationResult.enrolledAt }}</span>
                  </div>
                  <div class="result-item" v-if="certificationResult.certificationMaterials">
                    <span class="result-label">补充说明</span>
                    <span class="result-value">{{ certificationResult.certificationMaterials }}</span>
                  </div>
                </div>

                <!-- 认证文件列表 -->
                <div v-if="certificationResult.certificationFiles && certificationResult.certificationFiles.length > 0" class="cert-files">
                  <h4 class="section-title">认证材料</h4>
                  <div class="file-list">
                    <div v-for="file in certificationResult.certificationFiles" :key="file.id" class="file-item">
                      <span class="file-type">{{ file.materialType || '附件' }}</span>
                      <a :href="file.sourceUrl" target="_blank" class="file-link">{{ file.sourceUrl }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 认证表单（未提交或被拒绝时显示） -->
              <form v-if="editForm.certificationStatus === 'UNSUBMITTED' || editForm.certificationStatus === 'REJECTED'" class="cert-form" @submit.prevent="submitCertification">
                <div class="form-section">
                  <h4 class="section-title">基本信息</h4>
                  
                  <div class="form-row cert-row">
                    <label class="form-label">真实姓名 <span class="required">*</span></label>
                    <input 
                      v-model="certificationForm.realName"
                      class="form-input cert-input"
                      placeholder="请输入真实姓名"
                      maxlength="64"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">手机号码</label>
                    <input 
                      v-model="certificationForm.mobile"
                      class="form-input cert-input"
                      type="tel"
                      placeholder="请输入手机号码"
                      maxlength="32"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">身份证号</label>
                    <input 
                      v-model="certificationForm.idCardNo"
                      class="form-input cert-input"
                      placeholder="请输入身份证号码"
                      maxlength="32"
                    />
                  </div>
                </div>

                <div class="form-section">
                  <h4 class="section-title">所在地区</h4>
                  
                  <div class="form-row cert-row">
                    <label class="form-label">省份</label>
                    <input 
                      v-model="certificationForm.province"
                      class="form-input cert-input"
                      placeholder="请输入省份"
                      maxlength="64"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">省份编码</label>
                    <input 
                      v-model="certificationForm.provinceCode"
                      class="form-input cert-input"
                      placeholder="请输入省份编码"
                      maxlength="32"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">城市</label>
                    <input 
                      v-model="certificationForm.city"
                      class="form-input cert-input"
                      placeholder="请输入城市"
                      maxlength="64"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">城市编码</label>
                    <input 
                      v-model="certificationForm.cityCode"
                      class="form-input cert-input"
                      placeholder="请输入城市编码"
                      maxlength="32"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">区县</label>
                    <input 
                      v-model="certificationForm.district"
                      class="form-input cert-input"
                      placeholder="请输入区县"
                      maxlength="64"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">区县编码</label>
                    <input 
                      v-model="certificationForm.districtCode"
                      class="form-input cert-input"
                      placeholder="请输入区县编码"
                      maxlength="32"
                    />
                  </div>
                </div>

                <div class="form-section">
                  <h4 class="section-title">工作信息</h4>
                  
                  <div class="form-row cert-row">
                    <label class="form-label">工作单位</label>
                    <input 
                      v-model="certificationForm.organization"
                      class="form-input cert-input"
                      placeholder="请输入工作单位"
                      maxlength="128"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">单位ID</label>
                    <input 
                      v-model.number="certificationForm.organizationId"
                      class="form-input cert-input"
                      type="number"
                      placeholder="请输入单位ID"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">职位职称</label>
                    <input 
                      v-model="certificationForm.positionTitle"
                      class="form-input cert-input"
                      placeholder="请输入职位职称"
                      maxlength="128"
                    />
                  </div>

                  <div class="form-row cert-row">
                    <label class="form-label">执业类型ID</label>
                    <input 
                      v-model.number="certificationForm.practiceTypeId"
                      class="form-input cert-input"
                      type="number"
                      placeholder="请输入执业类型ID"
                    />
                  </div>
                </div>

                <div class="form-section">
                  <h4 class="section-title">认证材料</h4>
                  
                  <div class="form-row cert-row">
                    <label class="form-label">补充说明</label>
                    <textarea 
                      v-model="certificationForm.certificationMaterials"
                      class="form-textarea"
                      placeholder="请输入其他需要说明的信息"
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                <!-- 错误提示 -->
                <div v-if="certificationError" class="error-message">
                  {{ certificationError }}
                </div>

                <div class="form-actions">
                  <button 
                    type="submit" 
                    class="save-btn cert-submit-btn"
                    :disabled="certificationSubmitting"
                  >
                    {{ certificationSubmitting ? '提交中...' : (editForm.certificationStatus === 'REJECTED' ? '重新提交认证' : '提交认证申请') }}
                  </button>
                </div>
              </form>
            </template>
          </div>

          <!-- 编辑资料 -->
          <div v-else-if="activeMenu === 'edit'" class="content-card edit-card">
            <div class="edit-header">
              <h3 class="card-title">修改资料</h3>
              <!-- 头像在右上角 -->
            <div class="edit-avatar-wrap">
              <div class="avatar-box edit-avatar" @click="clickAvatar">
                <img :src="getFullAvatarUrl(editForm.avatarUrl)" alt="头像" class="avatar" />
                <span class="edit-role-tag">{{ editForm.certificationStatus === 'APPROVED' ? '已认证学员' : '学员' }}</span>
              </div>
                <input 
                  ref="avatarInput"
                  type="file"
                  accept="image/*"
                  class="file-input"
                  @change="onAvatarChange"
                />
              </div>
            </div>

            <form class="edit-form" @submit.prevent="submitForm">
              <div class="form-row" @click="currentField = 'gender'">
                <label class="form-label">性别</label>
                <div class="form-value">
                  {{ genderLabel }}
                  <span class="arrow">›</span>
                </div>
                <select 
                  v-if="currentField === 'gender'" 
                  v-model="editForm.gender"
                  class="form-select"
                  @click.stop
                  @change="currentField = ''"
                >
                  <option value="UNKNOWN">未知</option>
                  <option value="MALE">男</option>
                  <option value="FEMALE">女</option>
                </select>
              </div>

              <div class="form-row" @click="currentField = 'nickname'">
                <label class="form-label">昵称</label>
                <div class="form-value">
                  {{ editForm.nickname || '未设置' }}
                  <span class="arrow">›</span>
                </div>
                <input 
                  v-if="currentField === 'nickname'"
                  v-model="editForm.nickname"
                  class="form-input"
                  @click.stop
                  @blur="currentField = ''"
                  @keyup.enter="currentField = ''"
                  placeholder="请输入昵称"
                  ref="nicknameInput"
                  :autofocus="currentField === 'nickname'"
                />
              </div>

              <div class="form-row">
                <label class="form-label">电话</label>
                <div class="form-value">
                  {{ editForm.mobile || '未绑定' }}
                </div>
              </div>

              <div class="form-row" @click="currentField = 'email'">
                <label class="form-label">邮箱</label>
                <div class="form-value">
                  {{ editForm.email || '未绑定' }}
                  <span class="arrow">›</span>
                </div>
                <input 
                  v-if="currentField === 'email'"
                  v-model="editForm.email"
                  class="form-input"
                  type="email"
                  @click.stop
                  @blur="currentField = ''"
                  @keyup.enter="currentField = ''"
                  placeholder="请输入邮箱"
                  :autofocus="currentField === 'email'"
                />
              </div>

              <div class="form-row">
                <label class="form-label">认证状态</label>
                <div class="form-value certification-status" :class="typeof editForm.certificationStatus === 'string' ? editForm.certificationStatus.toLowerCase() : ''">
                  {{ certificationStatusLabel }}
                </div>
              </div>

              <div class="form-row" @click="currentField = 'profileSignature'">
                <label class="form-label">个人签名</label>
                <div class="form-value">
                  {{ editForm.profileSignature || '请输入个人签名' }}
                  <span class="arrow">›</span>
                </div>
                <input 
                  v-if="currentField === 'profileSignature'"
                  v-model="editForm.profileSignature"
                  class="form-input"
                  maxlength="255"
                  @click.stop
                  @blur="currentField = ''"
                  @keyup.enter="currentField = ''"
                  placeholder="请输入个人签名"
                  :autofocus="currentField === 'profileSignature'"
                />
              </div>

              <div class="form-actions">
                <button type="submit" class="save-btn">保存修改</button>
              </div>
            </form>
          </div>


        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated, watch, computed } from 'vue'
import { useRouter, useRoute } from '#imports'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { authApi, profileApi, type AppProfileResponse, type AppProfileUpdateRequest, type AppAvatarUploadRequest, type AppAvatarConfirmRequest, type AppStudentCertificationRequest, type AppStudentCertificationResponse, type AppResourceRecordResponse, type PageResponseAppResourceRecordResponse } from '~/utils/api/auth'
import { expertsApi, type AppQaQuestionResponse } from '~/utils/api/experts'
import { learningApi, type AppExamRecordResponse, type PageResponse } from '~/utils/api/learning'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 加载状态
const loading = ref(false)
const error = ref('')

// 默认头像
const defaultAvatar = 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20avatar%20portrait%20simple&image_size=square'

// 当前选中菜单
const activeMenu = ref('collect')

// 编辑当前激活字段
const currentField = ref('')
const avatarInput = ref<HTMLInputElement | null>(null)

// 个人资料数据
const profileData = ref<AppProfileResponse>({
  id: 0,
  username: '',
  mobile: '',
  email: '',
  nickname: '',
  profileSignature: '',
  avatarUrl: '',
  authProvider: '',
  gender: 'UNKNOWN',
  status: 'ENABLED',
  profileCompleted: false,
  studentId: 0,
  certificationStatus: 'UNSUBMITTED'
})

// 编辑表单（只包含可更新字段）
const editForm = ref<Partial<AppProfileResponse>>({
  gender: 'UNKNOWN',
  certificationStatus: 'UNSUBMITTED'
})

// 学员认证表单
const certificationForm = ref<AppStudentCertificationRequest>({
  realName: '',
  mobile: '',
  idCardNo: '',
  province: '',
  provinceCode: '',
  city: '',
  cityCode: '',
  district: '',
  districtCode: '',
  organization: '',
  organizationId: undefined,
  positionTitle: '',
  practiceTypeId: undefined,
  certificationMaterials: '',
  certificationFiles: []
})

// 认证结果数据
const certificationResult = ref<AppStudentCertificationResponse | null>(null)

// 认证提交状态
const certificationSubmitting = ref(false)
const certificationError = ref('')
const certificationLoading = ref(false)

// 查询学员认证结果
const fetchCertification = async () => {
  certificationLoading.value = true
  certificationError.value = ''

  try {
    const response = await profileApi.getCertification()
    if (response.success) {
      certificationResult.value = response.data
      // 更新认证状态到表单
      if (response.data.certificationStatus) {
        profileData.value.certificationStatus = response.data.certificationStatus
        editForm.value.certificationStatus = response.data.certificationStatus
      }
    } else {
      certificationError.value = response.message || '查询认证结果失败'
    }
  } catch (err: any) {
    certificationError.value = err.message || '查询认证结果失败，请稍后重试'
    console.error('查询认证结果失败:', err)
  } finally {
    certificationLoading.value = false
  }
}

// 提交学员认证申请
const submitCertification = async () => {
  // 验证必填字段
  if (!certificationForm.value.realName.trim()) {
    certificationError.value = '请输入真实姓名'
    return
  }

  certificationSubmitting.value = true
  certificationError.value = ''

  try {
    const response = await profileApi.submitCertification(certificationForm.value)
    if (response.success) {
      alert('认证申请提交成功！')
      // 更新认证状态
      profileData.value.certificationStatus = response.data.certificationStatus
      editForm.value.certificationStatus = response.data.certificationStatus
      // 重置表单
      certificationForm.value = {
        realName: '',
        mobile: '',
        idCardNo: '',
        province: '',
        provinceCode: '',
        city: '',
        cityCode: '',
        district: '',
        districtCode: '',
        organization: '',
        organizationId: undefined,
        positionTitle: '',
        practiceTypeId: undefined,
        certificationMaterials: '',
        certificationFiles: []
      }
    } else {
      certificationError.value = response.message || '提交失败'
    }
  } catch (err: any) {
    certificationError.value = err.message || '提交失败，请稍后重试'
    console.error('提交认证失败:', err)
  } finally {
    certificationSubmitting.value = false
  }
}

// 性别标签映射（后端返回数字：0=未知, 1=男, 2=女）
const genderLabels: Record<string, string> = {
  'UNKNOWN': '未知',
  'MALE': '男',
  'FEMALE': '女'
}

// 数字到字符串的映射（后端 -> 前端）
const numToGender: Record<number, string> = {
  0: 'UNKNOWN',
  1: 'MALE',
  2: 'FEMALE'
}

// 字符串到数字的映射（前端 -> 后端）
const genderToNum: Record<string, number> = {
  'UNKNOWN': 0,
  'MALE': 1,
  'FEMALE': 2
}

// 认证状态标签映射
const certificationStatusLabels: Record<string, string> = {
  'UNSUBMITTED': '未提交',
  'PENDING': '审核中',
  'APPROVED': '已通过',
  'REJECTED': '已拒绝'
}

// 数字到字符串的认证状态映射（后端 -> 前端）
const numToCertStatus: Record<number, string> = {
  0: 'UNSUBMITTED',
  1: 'PENDING',
  2: 'APPROVED',
  3: 'REJECTED'
}

// 性别显示标签
const genderLabel = computed(() => {
  const gender = editForm.value.gender
  // 如果是数字，先转换为字符串
  if (typeof gender === 'number') {
    const genderStr = numToGender[gender] || 'UNKNOWN'
    return genderLabels[genderStr] || '未知'
  }
  return genderLabels[gender || 'UNKNOWN'] || '未知'
})

// 认证状态显示标签
const certificationStatusLabel = computed(() => {
  return certificationStatusLabels[editForm.value.certificationStatus || 'UNSUBMITTED'] || '未提交'
})

// 同步用户信息到编辑表单
const syncEditForm = () => {
  const data = { ...profileData.value }
  // 如果 gender 是数字（后端返回的），转换为字符串
  if (typeof data.gender === 'number') {
    data.gender = numToGender[data.gender] || 'UNKNOWN'
  }
  // 如果 certificationStatus 是数字（后端返回的），转换为字符串
  if (typeof data.certificationStatus === 'number') {
    data.certificationStatus = numToCertStatus[data.certificationStatus] || 'UNSUBMITTED'
  }
  editForm.value = data
}

// 构建完整头像 URL
const getFullAvatarUrl = (url: string | undefined | null): string => {
  if (!url) return defaultAvatar
  if (url.startsWith('http')) return url
  
  // 如果URL已经以 /api/v1 开头，直接使用（避免路径重复）
  if (url.startsWith('/api/v1')) {
    return url
  }
  
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || ''
  return baseUrl + url
}

// 侧边栏显示的数据源
const displayInfo = computed(() => {
  const data = activeMenu.value === 'edit' ? editForm.value : profileData.value
  return {
    avatar: getFullAvatarUrl(data.avatarUrl),
    nickname: data.nickname || data.username || '未设置昵称',
    role: data.certificationStatus === 'APPROVED' ? '已认证学员' : '学员',
    motto: data.profileSignature || '学习口号：加油！！'
  }
})

// 监听个人资料变化，自动同步表单
watch(profileData, () => {
  syncEditForm()
}, { immediate: true, deep: true })

// 监听菜单切换，查询认证结果和问答
watch(activeMenu, (newMenu) => {
  if (newMenu === 'certification') {
    fetchCertification()
  } else if (newMenu === 'question') {
    fetchQuestions()
  } else if (newMenu === 'exam') {
    fetchExamRecords()
  }
})

// 侧边栏菜单
const navList = ref([
  { id: 'collect', icon: 'icon-star', label: '我的收藏' },
  { id: 'history', icon: 'icon-eye', label: '浏览记录' },
  { id: 'question', icon: 'icon-chat', label: '我的问答' },
  { id: 'exam', icon: 'icon-file', label: '我的考核' },
  { id: 'stat', icon: 'icon-bar', label: '学习统计' },
  { id: 'certification', icon: 'icon-cert', label: '学员认证' },
  { id: 'edit', icon: 'icon-edit', label: '编辑资料' }
])

// 收藏列表数据
const collectList = ref<AppResourceRecordResponse[]>([])
const favoritesPage = ref<PageResponseAppResourceRecordResponse | null>(null)
const favoritesLoading = ref(false)
const favoritesError = ref('')

// 查询我的收藏
const fetchFavorites = async (page: number = 1, size: number = 20) => {
  favoritesLoading.value = true
  favoritesError.value = ''

  try {
    const response = await profileApi.getFavorites(page, size)
    if (response.success) {
      favoritesPage.value = response.data
      collectList.value = response.data.records
    } else {
      favoritesError.value = response.message || '查询收藏失败'
    }
  } catch (err: any) {
    favoritesError.value = err.message || '查询收藏失败，请稍后重试'
    console.error('查询收藏失败:', err)
  } finally {
    favoritesLoading.value = false
  }
}

// 跳转到收藏的资源详情
const goToFavoriteDetail = (item: AppResourceRecordResponse) => {
  if (!item.resourceType || !item.resourceId) {
    alert('资源信息不完整，无法查看详情')
    return
  }
  
  // 根据资源类型跳转到对应的详情页面
  const pathMap: Record<string, string> = {
    'ARTICLE': '/news/detail/',
    'COURSE': '/course/',
    'VIDEO': '/video/',
    'PODCAST': '/podcast/',
    'BOOK': '/book/',
    'EXAM_PAPER': '/exam/',
    'EXAM_ASSESSMENT': '/exam/'
  }
  
  const basePath = pathMap[item.resourceType] || '/'
  router.push(`${basePath}${item.resourceId}`)
}

// 获取资源类型的中文标签
const getResourceTypeLabel = (type?: string): string => {
  const labelMap: Record<string, string> = {
    'ARTICLE': '资讯',
    'COURSE': '课程',
    'VIDEO': '视频',
    'PODCAST': '音频',
    'BOOK': '图书',
    'EXAM_PAPER': '试卷',
    'EXAM_ASSESSMENT': '考核'
  }
  return labelMap[type || ''] || type || '未知'
}

// 格式化时间
const formatTime = (timeStr?: string): string => {
  if (!timeStr) return '-'
  try {
    const date = new Date(timeStr)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return timeStr
  }
}

// 监听菜单切换，查询收藏
watch(activeMenu, (newMenu) => {
  if (newMenu === 'collect') {
    fetchFavorites()
  }
})

// 浏览记录数据
const historyList = ref<AppResourceRecordResponse[]>([])
const historyPage = ref<PageResponseAppResourceRecordResponse | null>(null)
const historyLoading = ref(false)
const historyError = ref('')

// 查询浏览记录
const fetchHistory = async (page: number = 1, size: number = 20) => {
  historyLoading.value = true
  historyError.value = ''

  try {
    const response = await profileApi.getBrowseHistories(page, size)
    if (response.success) {
      historyPage.value = response.data
      historyList.value = response.data.records
    } else {
      historyError.value = response.message || '查询浏览记录失败'
    }
  } catch (err: any) {
    historyError.value = err.message || '查询浏览记录失败，请稍后重试'
    console.error('查询浏览记录失败:', err)
  } finally {
    historyLoading.value = false
  }
}

// 跳转到浏览记录的资源详情
const goToHistoryDetail = (item: AppResourceRecordResponse) => {
  if (!item.resourceType || !item.resourceId) {
    alert('资源信息不完整，无法查看详情')
    return
  }
  
  // 根据资源类型跳转到对应的详情页面
  const pathMap: Record<string, string> = {
    'ARTICLE': '/news/detail/',
    'COURSE': '/course/',
    'VIDEO': '/video/',
    'PODCAST': '/podcast/',
    'BOOK': '/book/',
    'EXAM_PAPER': '/exam/',
    'EXAM_ASSESSMENT': '/exam/'
  }
  
  const basePath = pathMap[item.resourceType] || '/'
  router.push(`${basePath}${item.resourceId}`)
}

// 监听菜单切换，查询浏览记录
watch(activeMenu, (newMenu) => {
  if (newMenu === 'history') {
    fetchHistory()
  }
})

// 问答列表数据
const questionList = ref<AppQaQuestionResponse[]>([])
const questionsLoading = ref(false)
const questionsError = ref('')

// 考核记录数据
const examList = ref<AppExamRecordResponse[]>([])
const examPage = ref<PageResponse<AppExamRecordResponse> | null>(null)
const examLoading = ref(false)
const examError = ref('')

// 查询我的考核记录
const fetchExamRecords = async (page: number = 1, size: number = 20) => {
  examLoading.value = true
  examError.value = ''

  try {
    const response = await learningApi.getExamRecords({ page, size })
    if (response.success) {
      examPage.value = response.data
      examList.value = response.data.records
    } else {
      examError.value = response.message || '查询考核记录失败'
    }
  } catch (err: any) {
    examError.value = err.message || '查询考核记录失败，请稍后重试'
    console.error('查询考核记录失败:', err)
  } finally {
    examLoading.value = false
  }
}

// 获取考核状态标签
const getExamStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    IN_PROGRESS: '进行中',
    SUBMITTED: '已提交',
    FORCED_SUBMITTED: '强制提交',
    TIMED_OUT: '超时'
  }
  return map[status] || status
}

// 获取考核状态样式类
const getExamStatusClass = (status: string): string => {
  const map: Record<string, string> = {
    IN_PROGRESS: 'progress',
    SUBMITTED: 'submitted',
    FORCED_SUBMITTED: 'forced',
    TIMED_OUT: 'timeout'
  }
  return map[status] || ''
}

// 跳转到考核页面
const goToExam = () => {
  router.push('/exam')
}

// 跳转到考核详情
const goToExamDetail = (item: AppExamRecordResponse) => {
  if (item.assessmentId) {
    router.push(`/exam/${item.paperId}?assessmentId=${item.assessmentId}`)
  } else {
    router.push(`/exam/${item.paperId}`)
  }
}

const statList = ref([
  { id: 1, icon: '▤', value: '48', label: '学习时长(小时)' },
  { id: 2, icon: '▢', value: '12', label: '完成课程' },
  { id: 3, icon: '✓', value: '6', label: '完成考核' },
  { id: 4, icon: '▣', value: '8', label: '提问次数' }
])

// 查询我的问答列表
const fetchQuestions = async () => {
  questionsLoading.value = true
  questionsError.value = ''

  try {
    const response = await expertsApi.getMyQuestions({
      page: 1,
      size: 20
    })
    if (response.success) {
      questionList.value = response.data.records
    } else {
      questionsError.value = response.message || '查询问答失败'
    }
  } catch (err: any) {
    questionsError.value = err.message || '查询问答失败，请稍后重试'
    console.error('查询问答失败:', err)
  } finally {
    questionsLoading.value = false
  }
}

// 获取问答状态标签
const getQuestionStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    PENDING: '待回复',
    ANSWERED: '已回答',
    CLOSED: '已关闭'
  }
  return map[status] || status
}

// 获取问答状态样式类
const getQuestionStatusClass = (status: string): string => {
  const map: Record<string, string> = {
    PENDING: 'wait',
    ANSWERED: 'ok',
    CLOSED: 'closed'
  }
  return map[status] || ''
}

// 跳转到咨询页面
const goToConsult = () => {
  router.push('/consult')
}

// 跳转到问答详情
const goToQaDetail = (item: AppQaQuestionResponse) => {
  router.push(`/consult/${item.expertId}/qa/${item.id}`)
}

// 截断文本
const truncateText = (text: string, maxLen: number): string => {
  if (!text) return ''
  return text.length > maxLen ? text.substring(0, maxLen) + '...' : text
}


const fetchProfile = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await profileApi.getProfile()
    if (response.success) {
      profileData.value = response.data
      // 更新用户存储（使用完整头像 URL），gender 转换为字符串
      const genderStr = typeof response.data.gender === 'number' 
        ? numToGender[response.data.gender] || 'UNKNOWN'
        : response.data.gender || 'UNKNOWN'
      userStore.updateUserInfo({
        id: response.data.id,
        username: response.data.username,
        nickname: response.data.nickname,
        avatar: getFullAvatarUrl(response.data.avatarUrl),
        mobile: response.data.mobile,
        gender: genderStr
      })
    } else {
      error.value = response.message || '获取个人资料失败'
    }
  } catch (err: any) {
    error.value = err.message || '网络错误，请稍后重试'
    console.error('Failed to fetch profile:', err)
  } finally {
    loading.value = false
  }
}

// 进入编辑页
const goEdit = () => {
  activeMenu.value = 'edit'
}

// 触发头像选择
const clickAvatar = () => {
  avatarInput.value?.click()
}

// 计算文件MD5
const calculateMD5 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      const hash = Array.from(new Uint8Array(arrayBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
      resolve(hash)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

// 头像上传处理
const onAvatarChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    // 验证文件
    validateAvatarFile(file)

    // 本地预览（先显示预览）
    const reader = new FileReader()
    reader.onload = (ev) => {
      editForm.value.avatarUrl = ev.target?.result as string
    }
    reader.readAsDataURL(file)

    // 1. 申请头像上传地址
    const uploadRequest: AppAvatarUploadRequest = {
      originalName: file.name,
      contentType: file.type,
      fileSize: file.size
    }

    const uploadResponse = await profileApi.applyAvatarUploadUrl(uploadRequest)
    if (!uploadResponse.success) {
      throw new Error(uploadResponse.message || '头像上传准备失败')
    }

    const uploadData = uploadResponse.data

    // 检查 uploadUrl 是否可访问
    if (uploadData.uploadUrl.includes('minio:9000') || 
        uploadData.uploadUrl.includes('127.0.0.1:9000') || 
        uploadData.uploadUrl.includes('localhost:9000')) {
      throw new Error('上传地址异常，请联系管理员检查环境配置')
    }

    // 2. 直传对象存储
    const uploadResult = await fetch(uploadData.uploadUrl, {
      method: uploadData.method || 'PUT',
      headers: {
        'Content-Type': file.type
      },
      body: file
    })

    if (!uploadResult.ok) {
      throw new Error('头像上传失败')
    }

    // 3. 确认头像上传
    const confirmRequest: AppAvatarConfirmRequest = {
      objectKey: uploadData.objectKey,
      originalName: file.name
    }

    const confirmResponse = await profileApi.confirmAvatarUpload(confirmRequest)
    if (!confirmResponse.success) {
      throw new Error(confirmResponse.message || '头像保存失败')
    }

    // 4. 更新头像URL为后端稳定地址（不是本地预览）
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase || ''
    editForm.value.avatarUrl = confirmResponse.data.avatarUrl.startsWith('http') 
      ? confirmResponse.data.avatarUrl 
      : baseUrl + confirmResponse.data.avatarUrl

    // 更新 profileData 中的头像
    profileData.value.avatarUrl = confirmResponse.data.avatarUrl

    alert('头像上传成功')
    
  } catch (err: any) {
    console.error('头像上传失败:', err)
    alert(err.message || '头像上传失败，请稍后重试')
    
    // 恢复原头像
    if (profileData.value.avatarUrl) {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase || ''
      editForm.value.avatarUrl = profileData.value.avatarUrl.startsWith('http') 
        ? profileData.value.avatarUrl 
        : baseUrl + profileData.value.avatarUrl
    } else {
      editForm.value.avatarUrl = defaultAvatar
    }
  } finally {
    // 清空 input 值，允许再次选择同一张图片
    if (target) {
      target.value = ''
    }
  }
}

// 验证头像文件
const validateAvatarFile = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('仅支持 jpg、png、webp 格式头像')
  }

  if (file.size > maxSize) {
    throw new Error('头像大小不能超过 5MB')
  }
}

// 保存资料
const submitForm = async () => {
  // 验证邮箱格式
  if (editForm.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.value.email)) {
    alert('请输入正确的邮箱格式')
    return
  }

  // 性别映射：后端期望数字 0, 1, 2
  const genderValue = genderToNum[editForm.value.gender || 'UNKNOWN'] || 0

  // 只提交 OpenAPI 规范中定义的可更新字段
  // 注意：avatarUrl 不要通过这个接口更新，已经在头像上传确认接口中处理
  const updateData = {
    nickname: editForm.value.nickname,
    email: editForm.value.email || undefined,
    gender: genderValue,
    profileSignature: editForm.value.profileSignature || undefined
  }

  // 调试：打印提交的数据
  console.log('[Submit Form Data]', updateData)

  try {
    const response = await profileApi.updateProfile(updateData)
    if (response.success) {
      // 保存成功后，重新从后端获取最新数据，确保一致性
      await fetchProfile()
      alert('资料保存成功！')
      // 保持在编辑页面，不跳转
    } else {
      alert(response.message || '保存失败')
    }
  } catch (err: any) {
    console.error('保存失败:', err)
    alert(err.message || '保存失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}

// 退出登录
const handleLogout = () => {
  if (confirm('确定退出当前账号吗？')) {
    userStore.logout()
    router.push('/')
  }
}

// 页面每次激活时重新获取最新数据（处理 keep-alive 缓存和路由跳转场景）
onMounted(() => {
  fetchProfile()
})

onActivated(() => {
  fetchProfile()
})

// 监听路由变化，当导航到个人中心页面时重新获取数据
watch(() => route.path, (newPath) => {
  if (newPath === '/profile') {
    fetchProfile()
  }
})
</script>

<style scoped>
/* 全局页面样式 — 参考首页网站风格 */
.profile-page {
  background-color: #f8fbf8;
  min-height: 100vh;
  font-size: 14px;
  color: #333;
  font-family: "Microsoft YaHei", sans-serif;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #2d5a27;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #666;
  font-size: 16px;
}

/* 错误状态 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 20px;
}

.error-state p {
  color: #e53935;
  font-size: 16px;
  margin-bottom: 16px;
}

.error-state .retry-btn {
  padding: 10px 24px;
  background: #2d5a27;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.profile-layout {
  display: flex;
  gap: 24px;
}

/* 左侧侧边栏 */
.sidebar {
  width: 280px;
  flex-shrink: 0;
}
.user-card {
  background: #fff;
  padding: 40px 24px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* 头像框样式 */
.avatar-box {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f0f0f0;
}
.role-tag {
  position: absolute;
  top: -5px;
  right: -15px;
  background: #2d5a27;
  color: #fff;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
}

.username {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px;
  color: #333;
}
.motto {
  color: #666;
  font-size: 14px;
  margin: 0 0 24px;
}
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.btn {
  height: 40px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: 0.3s;
}
.edit-btn {
  background: #2d5a27;
  color: #fff;
}
.edit-btn:hover {
  background: #1e3d1b;
  box-shadow: 0 4px 12px rgba(45,90,39,0.3);
}
.logout-btn {
  background: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}
.logout-btn:hover {
  background: #eee;
}

/* 侧边导航 */
.side-nav {
  background: #fff;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.side-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-item {
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 24px;
  cursor: pointer;
  color: #666;
  transition: 0.3s;
}
.nav-item:hover {
  background: #f8fbf8;
}
.nav-item.active {
  background: #e8f5e9;
  color: #2d5a27;
  border-left: 4px solid #2d5a27;
}
.icon-wrap {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  display: inline-block;
  position: relative;
}

/* 五角星图标 - 我的收藏 */
.icon-star {
  background: linear-gradient(135deg, transparent 35%, currentColor 35%, currentColor 65%, transparent 65%);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #999;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

/* 分割线 */
.divider {
  margin: 0 8px;
  color: #ddd;
}

/* 圆形图标 - 浏览记录 */
.icon-eye {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid currentColor;
  background: currentColor;
}

/* 聊天气泡图标 - 我的问答 */
.icon-chat {
  width: 16px;
  height: 12px;
  background: currentColor;
  border-radius: 0 6px 6px 6px;
}
.icon-chat::after {
  content: '';
  position: absolute;
  top: -4px;
  left: 0;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid currentColor;
  border-bottom: 4px solid currentColor;
  border-top: 4px solid transparent;
}

/* 文件图标 - 我的考核 */
.icon-file {
  width: 14px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 2px;
}
.icon-file::before {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background: currentColor;
}

/* 柱状图图标 - 学习统计 */
.icon-bar {
  width: 16px;
  height: 14px;
}
.icon-bar::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: currentColor;
}
.icon-bar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 6px;
  width: 4px;
  height: 60%;
  background: currentColor;
}

/* 认证图标 - 学员认证 */
.icon-cert {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 4px;
  position: relative;
}
.icon-cert::after {
  content: '✓';
  position: absolute;
  top: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
  background: currentColor;
  border-radius: 50%;
  font-size: 7px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 右侧主内容区 */
.main {
  flex: 1;
}
.breadcrumb {
  background: transparent;
  padding: 16px 0;
  color: #999;
  font-size: 14px;
}
.content-card {
  background: #fff;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-radius: 8px;
}
.card-title {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
  margin: 0 0 24px 0;
  color: #333;
}

/* 通用列表 */
.list-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  transition: 0.3s;
}
.list-item:hover {
  background: #f0f5f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.item-img {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 20px;
}
.item-info {
  flex: 1;
}
.item-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #333;
}
.item-desc {
  color: #999;
  font-size: 14px;
}

/* 问答项 */
.q-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  transition: 0.3s;
}
.q-item:hover {
  background: #f0f5f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.q-left {
  flex: 1;
}
.q-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}
.q-desc {
  color: #666;
  font-size: 14px;
}
.q-status {
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 13px;
}
.q-status.ok {
  background: #e8f5e9;
  color: #2d5a27;
}
.q-status.wait {
  background: #fff7e6;
  color: #e65100;
}

/* 考核项 */
.exam-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  transition: 0.3s;
}
.exam-item:hover {
  background: #f0f5f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.exam-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #333;
}
.exam-date {
  color: #999;
  font-size: 14px;
}
.score {
  font-size: 24px;
  font-weight: bold;
  color: #2d5a27;
  display: block;
  text-align: right;
}
.grade {
  font-size: 14px;
}
.grade.excellent {
  color: #2d5a27;
}
.grade.good {
  color: #e65100;
}

/* 考核状态样式 */
.grade.progress {
  color: #1976d2;
}
.grade.submitted {
  color: #388e3c;
}
.grade.forced {
  color: #f57c00;
}
.grade.timeout {
  color: #d32f2f;
}

/* 统计卡片 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.stat-item {
  text-align: center;
  padding: 30px 20px;
  background: #fafafa;
  border-radius: 8px;
  transition: 0.3s;
}
.stat-item:hover {
  background: #f0f5f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.stat-icon {
  font-size: 32px;
  margin-bottom: 12px;
}
.stat-num {
  font-size: 28px;
  font-weight: bold;
  color: #2d5a27;
  margin-bottom: 8px;
}
.stat-text {
  color: #666;
  font-size: 14px;
}

/* 编辑资料表单 */
.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}
.edit-avatar-wrap {
  position: relative;
}
.edit-avatar {
  width: 90px;
  height: 90px;
  cursor: pointer;
}
.edit-avatar .avatar {
  border: 3px solid #f0f0f0;
}
.edit-role-tag {
  position: absolute;
  right: -15px;
  bottom: 5px;
  background: #2d5a27;
  color: #fff;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
}
.file-input {
  display: none;
}

.form-row {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 15px;
  cursor: pointer;
  position: relative;
}
.form-row:hover {
  background: #f8fbf8;
}
.form-label {
  width: 100px;
  color: #666;
  font-size: 15px;
}
.form-value {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.arrow {
  color: #ccc;
  margin-left: 10px;
}
.form-input,
.form-select {
  flex: 1;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 10px;
  margin-left: 10px;
  outline: none;
}

/* 认证状态样式 */
.certification-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
}
.certification-status.unsubmitted {
  background: #f5f5f5;
  color: #999;
}
.certification-status.pending {
  background: #fff7e6;
  color: #e65100;
}
.certification-status.approved {
  background: #e8f5e9;
  color: #2d5a27;
}
.certification-status.rejected {
  background: #ffebee;
  color: #c62828;
}

/* 学员认证 */
.certification-card {
  padding: 30px;
}
.cert-status-box {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8fbf8;
  border-radius: 8px;
}
.cert-status-label {
  font-size: 14px;
  color: #666;
}
.cert-status-tag {
  margin-left: 8px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
}
.cert-status-tag.unsubmitted {
  background: #f5f5f5;
  color: #999;
}
.cert-status-tag.pending {
  background: #fff7e6;
  color: #e65100;
}
.cert-status-tag.approved {
  background: #e8f5e9;
  color: #2d5a27;
}
.cert-status-tag.rejected {
  background: #ffebee;
  color: #c62828;
}

/* 拒绝原因 */
.reject-reason {
  padding: 12px 16px;
  background: #ffebee;
  border-radius: 8px;
  margin-bottom: 20px;
}
.reject-label {
  font-size: 14px;
  color: #c62828;
  font-weight: bold;
}
.reject-text {
  font-size: 14px;
  color: #c62828;
  margin-left: 8px;
}

/* 认证结果详情 */
.cert-result {
  margin-bottom: 24px;
}
.result-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.result-item {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background: #fafafa;
  border-radius: 8px;
}
.result-label {
  font-size: 13px;
  color: #999;
  margin-bottom: 4px;
}
.result-value {
  font-size: 14px;
  color: #333;
}

/* 认证文件列表 */
.cert-files {
  margin-top: 20px;
}
.file-list {
  margin-top: 16px;
}
.file-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 8px;
}
.file-type {
  font-size: 13px;
  color: #999;
  margin-right: 12px;
  padding: 4px 10px;
  background: #fff;
  border-radius: 4px;
}
.file-link {
  font-size: 14px;
  color: #2d5a27;
  word-break: break-all;
}
.file-link:hover {
  text-decoration: underline;
}

.cert-form {
  margin-top: 20px;
}
.form-section {
  margin-bottom: 24px;
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}
.cert-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.cert-row .form-label {
  width: 120px;
  font-size: 14px;
  color: #666;
}
.cert-input {
  flex: 1;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}
.cert-input:focus {
  border-color: #2d5a27;
}
.form-textarea {
  flex: 1;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  transition: border-color 0.3s;
}
.form-textarea:focus {
  border-color: #2d5a27;
}
.required {
  color: #e53935;
}
.error-message {
  color: #e53935;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 12px;
  background: #ffebee;
  border-radius: 6px;
}
.cert-submit-btn {
  width: 200px;
  margin: 0 auto;
  display: block;
}
.cert-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-actions {
  padding: 20px 15px;
  margin-top: 20px;
}
.save-btn {
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #43b05c 0%, #38a169 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}
.save-btn:hover {
  background: linear-gradient(135deg, #38a169 0%, #2d8a5a 100%);
  box-shadow: 0 4px 12px rgba(67, 176, 92, 0.4);
}
.save-btn:active {
  transform: scale(0.98);
}

/* 收藏列表增强样式 */
.list-item.clickable {
  cursor: pointer;
}

.list-item.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.resource-type-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #20c997;
  color: #fff;
  font-size: 12px;
  border-radius: 12px;
  font-weight: 500;
}

.item-actions {
  display: flex;
  gap: 8px;
}

.view-btn {
  padding: 6px 16px;
  background: #20c997;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.3s;
}

.view-btn:hover {
  background: #1ba97f;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 16px;
}

.page-btn {
  padding: 8px 20px;
  background: #20c997;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.page-btn:hover:not(:disabled) {
  background: #1ba97f;
}

.page-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #666;
}
</style>