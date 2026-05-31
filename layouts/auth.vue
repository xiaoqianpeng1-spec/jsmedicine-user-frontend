<template>
  <div class="auth-layout">
    <main class="auth-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.auth-content {
  width: 100%;
  max-width: 480px;
  padding: 20px;
}
</style>
