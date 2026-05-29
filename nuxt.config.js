export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: '中医在线',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '中医在线平台 - 传承中医智慧，守护健康生活' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' }]
    }
  },
  typescript: {
    strict: true,
    typeCheck: false
  },
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },
  nitro: {
    devProxy: {
      '/api/v1/app': {
        target: 'https://api-test.arez.cc.cd/api/v1/app',
        changeOrigin: true
      }
    }
  }
});