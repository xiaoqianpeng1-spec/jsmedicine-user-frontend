<template>
  <div class="home-page">
    <!-- Banner -->
    <section class="home-banner">
      <div class="banner-content">
        <h1 class="banner-title">中医在线咨询</h1>
        <p class="banner-subtitle">— 专业名师在线 —</p>
        <NuxtLink to="/consult" class="btn-consult">立即咨询</NuxtLink>
      </div>
      <div class="banner-illustration">
        <div class="illustration-placeholder">
          <span>医疗插画</span>
        </div>
      </div>
    </section>

    <!-- Platform Intro -->
    <section class="platform-intro">
      <div class="container">
        <h2 class="platform-title">知识服务云平台</h2>
        <p class="platform-desc">精准、及时、交互式、全天候、全程陪伴式</p>
        <div class="platform-stats">
          <div class="stat-item">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <strong>20000+</strong>
              <span>用户在线学习</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">🏥</div>
            <div class="stat-info">
              <strong>3000+</strong>
              <span>各级医院免费培训</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">📚</div>
            <div class="stat-info">
              <strong>数百本</strong>
              <span>专业中医书籍配套视频</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">️</div>
            <div class="stat-info">
              <strong>5000+</strong>
              <span>题库测试学习</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">‍🏫</div>
            <div class="stat-info">
              <strong>上百位</strong>
              <span>专家在线答疑</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-heading">基础功能</h2>
        <p class="section-desc">资讯预览、在线学习、在线测评、专家答疑、知识库、专题整合、个人中心、官网展示</p>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📄</div>
            <h3>资讯预览</h3>
            <p>实时展示中医领域来的各类资讯，包括图文信息、资讯视频、专题</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📖</div>
            <h3>在线学习</h3>
            <p>提供多种学习方式，包括图文、图书、视频、音频、直播等，同时支持学习进度、回顾</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>在线测评</h3>
            <p>自由配置题库，动态生成考卷，随机抽取题目，及时获取评测结果</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💬</div>
            <h3>专家答疑</h3>
            <p>知名专家实时在线，一对一解答相关疑问，生成知识库便于后续查阅记录</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎓</div>
            <h3>知识库</h3>
            <p>按中医基础理论、中医诊断学、中药学、方剂学、中医内科、中医外科、四大经典等分类</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>专题整合</h3>
            <p>以专题形式，发布内容资讯，或者学习课程，用于完整的专题学习，专题中可以是图文资讯、电子书、视频及考试评测</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👤</div>
            <h3>个人中心</h3>
            <p>用于管理用户的登录名、个人基本信息，支持手机端实名认证及专业用户管理</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">️</div>
            <h3>官网展示</h3>
            <p>支持PC端和移动端适配，浏览平台所发布的内容，在线学习及评测在线移动小程序端</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-page {
  background: #ffffff;
}

/* === Banner === */
.home-banner {
  background: linear-gradient(135deg, #a8e6cf 0%, #7dd4a0 50%, #6dbf8e 100%);
  padding: 60px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  position: relative;
  overflow: hidden;
}

.home-banner::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.home-banner::after {
  content: '';
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ffffff;
}

.banner-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.banner-subtitle {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.95;
}

.btn-consult {
  display: inline-block;
  padding: 12px 36px;
  background: #5aa87a;
  color: #ffffff;
  border-radius: 24px;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.btn-consult:hover {
  background: #4a9668;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.banner-illustration {
  position: relative;
  z-index: 1;
}

.illustration-placeholder {
  width: 400px;
  height: 300px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 24px;
}

/* === Platform Intro === */
.platform-intro {
  padding: 60px 0 40px;
  text-align: center;
}

.platform-title {
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 12px;
}

.platform-desc {
  font-size: 14px;
  color: #999999;
  margin-bottom: 40px;
}

.platform-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: #f9f9f9;
  border-radius: 8px;
}

.stat-icon {
  font-size: 32px;
}

.stat-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.stat-info strong {
  font-size: 18px;
  color: #333333;
}

.stat-info span {
  font-size: 12px;
  color: #999999;
}

/* === Features === */
.features-section {
  padding: 40px 0 60px;
  background: #f5f7fa;
}

.section-heading {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
}

.section-desc {
  text-align: center;
  font-size: 13px;
  color: #999999;
  margin-bottom: 32px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.feature-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  background: #e8f5ee;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.feature-card h3 {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 12px;
  color: #999999;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .home-banner {
    flex-direction: column;
    padding: 40px 20px;
  }

  .banner-title {
    font-size: 32px;
  }

  .illustration-placeholder {
    width: 100%;
    height: 200px;
  }

  .platform-stats {
    flex-direction: column;
    align-items: center;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
