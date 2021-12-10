<template>
  <div
    v-if="!isLoading && data.length"
    class="border border-color-grey box-border rounded-md mt-1 text-xxs p-2 flex justify-between items-center"
  >
    <span class="text-red-500 font-semibold">Salesforce account not connected</span>
    <el-button type="primary" plain size="mini">Connect</el-button>
  </div>
</template>

<script>
import { useFetchSalesforceAccount } from '@/api/use-fetch-salesforce-account.js'
import { useRoute } from 'vue-router'

export default {
  name: 'InfoSalesforceAcc',
  setup() {
    const route = useRoute()
    const id = route.params.id

    const { isLoading, isFetching, isError, data } = useFetchSalesforceAccount(id)

    return {
      isLoading,
      isFetching,
      isError,
      data,
    }
  },
}
</script>
