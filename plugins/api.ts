import { setupInterceptors } from '~/api/request'

export default defineNuxtPlugin(() => {
  setupInterceptors()
})
