<script>
import { defineComponent, watch } from 'vue'
import { ElLoading } from 'element-plus'
import { onMounted } from 'vue'
import { useLogout } from '@/api/authentication/use-logout'

export default defineComponent({
  setup() {
    const { error, fetching, logout } = useLogout()

    let loadingInstance

    onMounted(() => {
      loadingInstance = ElLoading.service({
        lock: true,
        text: 'Logout',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        logout()
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
