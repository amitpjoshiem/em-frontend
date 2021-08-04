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
</template>
<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'SalesForceSettings',
  setup() {
    const status = reactive({
      value: false,
      loading: false,
    })

    const beforeChange = () => {
      status.loading = true
      return new Promise((resolve) => {
        setTimeout(() => {
          status.loading = false
          return resolve(true)
        }, 1000)
      })
    }

    return {
      ...toRefs(status),
      beforeChange,
    }
  },
}
</script>
