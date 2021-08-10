<script>
import { defineComponent, watch } from 'vue'
import { ElLoading } from 'element-plus'
import { onMounted } from 'vue'
import { useLogout } from '@/api/authentication/use-logout'
import { tokenStorage } from './api/api-client/TokenStorage'
import { useRemoveStoreAccessToken } from '@/utils/useRemoveStoreAccessToken.js'

export default defineComponent({
  setup() {
    const { error, fetching, logout } = useLogout()

    const removeAccessToken = useRemoveStoreAccessToken()

    let loadingInstance

    onMounted(() => {
      loadingInstance = ElLoading.service({
        lock: true,
        text: 'Logout',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        if (tokenStorage.getByKey('refresh_token_expired')) {
          removeAccessToken()
        } else {
          logout()
        }
      }, 1000)
    })

    watch(fetching, (newValue) => {
      if (newValue === false) {
        loadingInstance.close()
      }
    })

    return {
      loadingInstance,
      error,
      fetching,
    }
  },
})
</script>
