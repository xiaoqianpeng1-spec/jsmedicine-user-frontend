export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie<string | null>('auth_token')
  
  if (!token.value) {
    return navigateTo('/login', { redirectCode: 301 })
  }
})
