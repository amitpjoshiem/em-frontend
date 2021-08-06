<template>
  <div class="pl-24 pt-14 text-main w-10/12">
    <div class="flex py-5">
      <div class="w-10/12 text-xss text-main font-medium">
        Connect salesforce account
      </div>
      <div class="w-2/12 flex justify-between">
        <el-switch
          v-model="value"
          :loading="loading"
          :before-change="beforeChange"
        />
      </div>
    </div>
  </div>
  <pre>
    {{ data }}
  </pre>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useSalesForceAuth } from '@/api/use-salesforce-auth.js'

export default {
  name: 'SalesForceSettings',
  setup() {
    const status = reactive({
      value: false,
      loading: false,
    })

    const { response, error, fetching, getSalesForceAuth } = useSalesForceAuth()

    const beforeChange = () => {
      status.loading = true
      if (!status.value) {
        return new Promise((resolve) => {
          return getSalesForceAuth().then(() => {
            window.open(response.value.link, '_blank')
            status.loading = false
            return resolve(true)
          })
        })
      }
    }

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
