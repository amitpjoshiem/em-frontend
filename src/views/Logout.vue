<template>
  <div>Logout...</div>
</template>

<script>
import { onMounted } from 'vue'
import { useLogout } from '@/api/authentication/use-logout'

export default {
  name: 'Logout',
  setup() {
    const { error, fetching, logout } = useLogout()

    onMounted(() => {
      logout()
    })

    return {
      error,
      fetching,
      logout,
    }
  },
}
</script>
