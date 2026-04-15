import { reactive } from 'vue'

/**
 * Track async operations by string key (e.g. per table row) for button :loading states.
 */
export function usePendingKeys() {
  const pending = reactive({})

  function isPending(key) {
    return !!pending[key]
  }

  async function run(key, fn) {
    if (pending[key]) return
    pending[key] = true
    try {
      await fn()
    } finally {
      pending[key] = false
    }
  }

  return { pending, isPending, run }
}
