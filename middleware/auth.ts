export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  
  if (!userStore.isLoggedIn && !userStore.token) {
    return navigateTo('/login', { 
      redirectCode: 302,
      query: { redirect: to.fullPath }
    })
  }
})
