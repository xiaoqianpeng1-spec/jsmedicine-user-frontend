export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  pinia: { autoImports: ['defineStore', 'storeToRefs'] },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: '中医在线',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '中医在线平台' }
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }]
    }
  },
  typescript: { strict: true, typeCheck: false },
  runtimeConfig: {
    public: {
      apiBase: '/api/v1'
    }
  },
  nitro: {
    devProxy: {
      '/api/v1': {
        target: 'https://api-test.arez.cc.cd',
        changeOrigin: true,
        prependPath: false
      }
    }
  }
});