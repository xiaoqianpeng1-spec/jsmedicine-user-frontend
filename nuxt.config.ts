export default defineNuxtConfig({
  compatibilityDate: '2026-06-09',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@element-plus/nuxt'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: (process as any).env.NUXT_PUBLIC_API_BASE || '',
    },
  },

  app: {
    head: {
      title: '江苏中医在线',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '江苏中医在线学习平台' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'https://api-test.arez.cc.cd',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      }
    }
  },

  elementPlus: {
    importStyle: 'css',
    themes: ['dark'],
  },
})
