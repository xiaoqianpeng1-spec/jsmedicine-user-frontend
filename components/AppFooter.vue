<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-info">
        <h3>联系我们</h3>
        <p>微信公众号：wx12345645</p>
        <p>QQ：123534545</p>
        <p>Email：123534545@163.com</p>
        <p>Copyright©2012***********苏ICP12345678号</p>
      </div>
      <div class="footer-qrcodes">
        <div class="qrcode-item">
          <div class="qrcode-placeholder">二维码</div>
          <p>关注公众号</p>
        </div>
        <div class="qrcode-item">
          <div class="qrcode-placeholder">二维码</div>
          <p>江苏中医在线小程序</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-footer {
  background: #2d2d2d;
  color: #cccccc;
  padding: 40px 0 20px;
  margin-top: 60px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-info h3 {
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 16px;
}

.footer-info p {
  font-size: 13px;
  line-height: 2;
  color: #999999;
}

.footer-qrcodes {
  display: flex;
  gap: 40px;
}

.qrcode-item {
  text-align: center;
}

.qrcode-placeholder {
  width: 120px;
  height: 120px;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  font-size: 12px;
  margin-bottom: 8px;
}

.qrcode-item p {
  font-size: 12px;
  color: #999999;
}
</style>
