<template>
  <div class="flex py-5">
    <div class="w-10/12 text-xss text-main font-medium">Connect salesforce account</div>
    <div class="w-2/12 flex justify-between">
      <el-switch v-model="value" :loading="loading" :before-change="beforeChange" />
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useSalesForceAuth } from '@/api/use-salesforce-auth.js'
import { useLogoutSalesForce } from '@/api/use-logout-salesforce.js'
import { onMounted, watch } from 'vue'

export default {
  name: 'SalesForceSettings',
  setup() {
    const status = reactive({
      value: false,
      loading: false,
    })

    const { response, error, fetching, getSalesForceAuth } = useSalesForceAuth()
    const { logoutSalesForceAuth } = useLogoutSalesForce()

    onMounted(() => {
      getSalesForceAuth()
    })

    const beforeChange = () => {
      status.loading = true
      if (!status.value) {
        return new Promise((resolve) => {
          window.open(response.value.link, '_blank')
          status.loading = false
          return resolve(true)
        })
      } else {
        return new Promise((resolve) => {
          return getSalesForceAuth().then(() => {
            logoutSalesForceAuth()
            status.loading = false
            return resolve(true)
          })
        })
      }
    }

    watch(response, (newValue) => {
      if (newValue) {
        status.value = newValue.auth
      }
    })

    return {
      ...toRefs(status),
      beforeChange,
      response,
      error,
      fetching,
      getSalesForceAuth,
    }
  },
}
</script>
