<template>
  <div
    v-if="isShowStatus"
    class="border border-color-grey box-border rounded-md mt-1 text-xxs p-2 flex justify-between items-center"
  >
    <span class="text-red-500 font-semibold">Salesforce account not connected</span>
    <SwdButton primary small :disabled="isLoading" @click="connectSalesforce">
      <SwdSpinner v-show="isLoading" class="mr-2" />
      Connect
    </SwdButton>
  </div>
</template>

<script>
import { useFetchSalesforceStatus } from '@/api/use-fetch-salesforce-status.js'
import { createSalesforceAccount } from '@/api/vueQuery/create-salesforce-account'
import { useMutation, useQueryClient } from 'vue-query'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'InfoSalesforceStatus',
  setup() {
    const route = useRoute()
    const id = route.params.id
    const queryClient = useQueryClient()

    const { isLoading, isFetching, isError, data: salesforceStatus } = useFetchSalesforceStatus(id)

    const {
      mutateAsync: createAccount,
      isError: isErrorCreate,
      error: errorCreate,
    } = useMutation(createSalesforceAccount)

    const isShowStatus = computed(() => {
      return !isLoading.value && !isError.value && !salesforceStatus.value.data.status
    })

    const connectSalesforce = async () => {
      const res = await createAccount({ member_id: id })
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Salesforce account created successfully.',
        })
        queryClient.invalidateQueries(['salesforce/status', id])
      }
    }

    return {
      isLoading,
      isFetching,
      isError,
      salesforceStatus,
      isShowStatus,
      connectSalesforce,
      createAccount,
      isErrorCreate,
      errorCreate,
    }
  },
}
</script>
