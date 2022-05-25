<template>
  <SwdFullScreenLoading />
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from 'vue'
import { useLogout } from '@/api/authentication/use-logout'
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { useRemoveStoreAccessToken } from '@/utils/useRemoveStoreAccessToken.js'

export default defineComponent({
  setup() {
    const { error, fetching, logout } = useLogout()

    const removeAccessToken = useRemoveStoreAccessToken()

    onMounted(() => {
      if (tokenStorage.getByKey('refresh_token_expired')) {
        removeAccessToken()
      } else {
        logout()
      }
    })

    return {
      error,
      fetching,
    }
  },
})
</script>
