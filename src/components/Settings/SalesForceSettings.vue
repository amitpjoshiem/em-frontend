<template>
  <div class="flex py-5">
    <div class="w-10/12 text-xss text-main font-medium">Connect salesforce account</div>
    <div class="w-2/12 flex justify-between">
      <el-switch v-model="value" :loading="loading" :before-change="beforeChange" />
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, watch } from 'vue'
import { useLogoutSalesForce } from '@/api/use-logout-salesforce.js'
import { useSalesForceAuth } from '@/api/use-sales-force-auth.js'

export default {
  name: 'SalesForceSettings',
  setup() {
    const status = reactive({
      value: false,
      loading: false,
    })

    const {
      isLoading: isLoadingStatusSfAcc,
      isError: isErrorStatusSfAcc,
      data: statusSfAcc,
      refetch,
    } = useSalesForceAuth()

    const { logoutSalesForceAuth } = useLogoutSalesForce()

    const beforeChange = () => {
      status.loading = true
      if (!status.value) {
        return new Promise((resolve) => {
          window.open(statusSfAcc.value.link, '_blank')
          status.loading = false
          return resolve(true)
        })
      } else {
        return new Promise((resolve) => {
          logoutSalesForceAuth()
          status.loading = false
          return resolve(true)
        })
      }
    }

    watch(statusSfAcc, (newValue) => {
      if (newValue) {
        status.value = newValue.auth
      }
    })

    return {
      ...toRefs(status),
      beforeChange,

      isLoadingStatusSfAcc,
      isErrorStatusSfAcc,
      statusSfAcc,
      refetch,
    }
  },
}
</script>
