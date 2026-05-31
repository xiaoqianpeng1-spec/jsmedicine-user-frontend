import { ref } from 'vue'

export function useLoading() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  function withLoading<T>(fn: () => Promise<T>): Promise<T> {
    loading.value = true
    error.value = null
    return fn()
      .catch((e) => {
        error.value = e instanceof Error ? e.message : '未知错误'
        throw e
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    loading,
    error,
    withLoading,
  }
}
